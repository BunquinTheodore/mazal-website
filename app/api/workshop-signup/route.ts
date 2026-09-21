import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const NOTIFY_EMAIL = 'gnclub.contactus@gmail.com';

const WORKSHOP_LABELS: Record<string, string> = {
  beginner: 'Beginner workshop (/workshop)',
  live: 'Live workshop (/live)',
};

/**
 * Handler for the workshop sign-up form, shared by /workshop (beginner) and
 * /live via the `workshopType` field.
 *
 * Validates the payload server-side, rejects spam via the honeypot field,
 * and emails the submission (including the deposit-proof screenshot as a
 * real attachment) to the team via Resend, mirroring the pattern already
 * used by app/api/join-signup/route.ts. There is still no durable
 * database/storage backend in this repo (see PLAN.md "open items"), so the
 * proof screenshot is delivered as an email attachment rather than a stored
 * link -- it stays under the 10MB cap enforced below, well within Resend's
 * attachment limits. If RESEND_API_KEY is a placeholder/unset, the email
 * send is skipped and the response says so instead of falsely claiming
 * delivery -- nothing is faked.
 */
export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid form submission.' }, { status: 400 });
  }

  // Honeypot: real users never see or fill this field. Any bot that fills
  // every field on the form trips it, and we silently reject.
  const honeypot = String(formData.get('company') || '').trim();
  if (honeypot) {
    // Respond as if successful so the bot doesn't learn the honeypot worked,
    // but do not process or log the submission as real.
    return NextResponse.json({ ok: true });
  }

  const workshopType = String(formData.get('workshopType') || '').trim();
  const fullName = String(formData.get('fullName') || '').trim();
  const lbankUid = String(formData.get('lbankUid') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const proof = formData.get('proof');

  const errors: Record<string, string> = {};

  if (workshopType !== 'beginner' && workshopType !== 'live') {
    errors.workshopType = 'Unknown workshop type.';
  }
  if (!fullName) errors.fullName = 'Full name is required.';
  if (!lbankUid) {
    errors.lbankUid = 'LBank UID is required.';
  } else if (!/^[0-9]+$/.test(lbankUid)) {
    errors.lbankUid = 'LBank UID must contain numbers only.';
  }
  if (!message) errors.message = 'A message is required.';

  let proofFile: File | null = null;
  if (!(proof instanceof File) || proof.size === 0) {
    errors.proof = 'Proof of deposit is required.';
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

  console.log('[workshop-signup] new submission', {
    workshopType,
    fullName,
    lbankUid,
    messageLength: message.length,
    proof: proofFile ? { name: proofFile.name, type: proofFile.type, size: proofFile.size } : null,
    receivedAt: new Date().toISOString(),
  });

  const apiKey = process.env.RESEND_API_KEY;
  let emailSent = false;

  if (apiKey && proofFile) {
    try {
      const resend = new Resend(apiKey);
      const proofBuffer = Buffer.from(await proofFile.arrayBuffer());
      const workshopLabel = WORKSHOP_LABELS[workshopType] || workshopType;

      const html = `
        <div style="font-family:Arial,sans-serif;color:#0b0f1a;font-size:15px;line-height:1.6">
          <h2 style="margin:0 0 16px">New workshop sign-up - ${escapeHtml(workshopLabel)}</h2>
          <p style="margin:4px 0"><strong>Name:</strong> ${escapeHtml(fullName)}</p>
          <p style="margin:4px 0"><strong>LBank UID:</strong> ${escapeHtml(lbankUid)}</p>
          <p style="margin:12px 0 4px"><strong>Message:</strong></p>
          <p style="margin:0 0 12px;white-space:pre-wrap">${escapeHtml(message)}</p>
          <p style="margin:16px 0 0;color:#5a6b82;font-size:13px">Deposit proof screenshot attached. Received ${new Date().toISOString()}.</p>
        </div>
      `;

      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM || 'onboarding@resend.dev',
        to: NOTIFY_EMAIL,
        subject: `New workshop sign-up - ${workshopLabel} - ${fullName}`,
        html,
        attachments: [
          {
            filename: proofFile.name || 'deposit-proof.jpg',
            content: proofBuffer,
          },
        ],
      });
      if (error) {
        console.error('[workshop-signup] Resend API returned an error', error);
      } else {
        emailSent = true;
      }
    } catch (err) {
      console.error('[workshop-signup] Resend send failed', err);
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
