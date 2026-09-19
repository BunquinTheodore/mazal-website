import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

/**
 * Placeholder handler for the workshop sign-up form.
 *
 * There is no backend/storage integration wired up in this repo yet (see
 * PLAN.md "open items" for the three options being considered: Google Sheet
 * via Apps Script, Formspree/Tally, or Supabase). This route validates the
 * payload server-side, rejects spam via the honeypot field, and logs
 * metadata about the submission so it is visible in server logs during
 * development/testing. It deliberately does NOT claim to persist the
 * submission anywhere durable, and it does NOT store the uploaded file.
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

  let proofMeta: { name: string; type: string; size: number } | null = null;
  if (!(proof instanceof File) || proof.size === 0) {
    errors.proof = 'Proof of deposit is required.';
  } else {
    if (!ALLOWED_TYPES.includes(proof.type)) {
      errors.proof = 'Only JPG or PNG images are accepted.';
    } else if (proof.size > MAX_FILE_BYTES) {
      errors.proof = 'File must be 10MB or smaller.';
    } else {
      proofMeta = { name: proof.name, type: proof.type, size: proof.size };
    }
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: 'Validation failed.', errors }, { status: 400 });
  }

  // No real storage/integration exists yet. Log metadata only (never the
  // file bytes) so submissions are at least visible during development.
  console.log('[workshop-signup] new submission', {
    workshopType,
    fullName,
    lbankUid,
    messageLength: message.length,
    proof: proofMeta,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
