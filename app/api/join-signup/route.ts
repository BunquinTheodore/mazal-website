import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const REASON_MIN = 1;
const REASON_MAX = 3;
const NOTIFY_EMAIL = 'gnclub.contactus@gmail.com';

/**
 * Handler for the Mazal Exclusive step of the /join funnel.
 *
 * Validates the payload server-side, rejects spam via the honeypot field,
 * and emails the submission (including the deposit-proof screenshot as a
 * real attachment) to the team via Resend. If RESEND_API_KEY is a
 * placeholder/unset, the email send is skipped and the response says so
 * instead of falsely claiming delivery — nothing is faked.
 */
export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid form submission.' }, { status: 400 });
  }

  const honeypot = String(formData.get('company') || '').trim();
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const fullName = String(formData.get('fullName') || '').trim();
  const lbankUid = String(formData.get('lbankUid') || '').trim();
  const reasons = formData.getAll('reasons').map((v) => String(v).trim()).filter(Boolean);
  const goals = formData.getAll('goals').map((v) => String(v).trim()).filter(Boolean);
  const proof = formData.get('proof');

  const errors: Record<string, string> = {};

  if (!fullName) errors.fullName = 'Full name is required.';
  if (!lbankUid) {
    errors.lbankUid = 'LBank UID is required.';
  } else if (!/^[0-9]+$/.test(lbankUid)) {
    errors.lbankUid = 'LBank UID must contain numbers only.';
  }
  if (reasons.length < REASON_MIN || reasons.length > REASON_MAX) {
    errors.reasons = `Choose ${REASON_MIN} to ${REASON_MAX} reasons.`;
  }
  if (goals.length < REASON_MIN || goals.length > REASON_MAX) {
    errors.goals = `Choose ${REASON_MIN} to ${REASON_MAX} goals.`;
  }

  let proofFile: File | null = null;
  if (!(proof instanceof File) || proof.size === 0) {
    errors.proof = 'Proof of your $50 deposit is required.';
  } else {
    if (!ALLOWED_TYPES.includes(proof.type)) {
      errors.proof = 'Only JPG or PNG images are accepted.';
    } else if (proof.size > MAX_FILE_BYTES) {
      errors.proof = 'File must be 10MB or smaller.';
    } else {
      proofFile = proof;
    }
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: 'Validation failed.', errors }, { status: 400 });
  }

  console.log('[join-signup] new Mazal Exclusive submission', {
    fullName,
    lbankUid,
    reasons,
    goals,
    referralCode: 'LBANKSEA',
    proof: proofFile ? { name: proofFile.name, type: proofFile.type, size: proofFile.size } : null,
    receivedAt: new Date().toISOString(),
  });

  const apiKey = process.env.RESEND_API_KEY;
  let emailSent = false;

  if (apiKey && proofFile) {
    try {
      const resend = new Resend(apiKey);
      const proofBuffer = Buffer.from(await proofFile.arrayBuffer());

      const html = `
        <div style="font-family:Arial,sans-serif;color:#0b0f1a;font-size:15px;line-height:1.6">
          <h2 style="margin:0 0 16px">New Mazal Exclusive submission</h2>
          <p style="margin:4px 0"><strong>Name:</strong> ${escapeHtml(fullName)}</p>
          <p style="margin:4px 0"><strong>LBank UID:</strong> ${escapeHtml(lbankUid)}</p>
          <p style="margin:4px 0"><strong>Referral code:</strong> LBANKSEA</p>
          <p style="margin:12px 0 4px"><strong>Reasons to learn trading:</strong></p>
          <ul style="margin:0 0 12px">${reasons.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>
          <p style="margin:12px 0 4px"><strong>Goals:</strong></p>
          <ul style="margin:0 0 12px">${goals.map((g) => `<li>${escapeHtml(g)}</li>`).join('')}</ul>
          <p style="margin:16px 0 0;color:#5a6b82;font-size:13px">Deposit proof screenshot attached. Received ${new Date().toISOString()}.</p>
        </div>
      `;

      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM || 'onboarding@resend.dev',
        to: NOTIFY_EMAIL,
        subject: `New Mazal Exclusive submission - ${fullName}`,
        html,
        attachments: [
          {
            filename: proofFile.name || 'deposit-proof.jpg',
            content: proofBuffer,
          },
        ],
      });
      if (error) {
        console.error('[join-signup] Resend API returned an error', error);
      } else {
        emailSent = true;
      }
    } catch (err) {
      console.error('[join-signup] Resend send failed', err);
    }
  }

  return NextResponse.json({ ok: true, emailSent });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
