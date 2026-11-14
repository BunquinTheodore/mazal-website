import { SITE } from '@/lib/site';

const LIME = '#C2F032';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const WELCOME_SUBJECT = "You're on the list. MAZAL waitlist";

export function welcomeText(unsubscribeUrl: string): string {
  return [
    "You're on the list.",
    '',
    'You are on the MAZAL waitlist, and you will hear from us first when we open.',
    '',
    'We will keep your inbox quiet until then. The next email from us is the opening.',
    '',
    'ONE STEP WHILE YOU WAIT',
    `Join the MAZAL Discord. It is where we open first, and where the people who got here early are: ${SITE.discord}`,
    '',
    'P.S. Reply to this email and tell us what made you sign up. We read the replies.',
    '',
    "it's more fun in mazal!",
    'Powered by GN Ventures | @joinmazal',
    '',
    `You are getting this email because you joined the MAZAL waitlist. Unsubscribe: ${unsubscribeUrl}`,
  ].join('\n');
}

/** Table based, inline styled HTML so it renders in Gmail, Outlook and Apple Mail. */
export function welcomeHtml(unsubscribeUrl: string, businessAddress?: string): string {
  const address = businessAddress ? ` &nbsp;|&nbsp; ${esc(businessAddress)}` : '';
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>${esc(WELCOME_SUBJECT)}</title></head>
<body style="margin:0;padding:0;background:#02020a;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">You are on the MAZAL waitlist. You will hear from us first when we open.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#02020a;"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="560" cellspacing="0" cellpadding="0" style="width:100%;max-width:560px;background:#070611;border:1px solid #1b1a2b;border-radius:20px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#d8d8ea;">
<tr><td style="height:4px;line-height:4px;font-size:0;background:linear-gradient(90deg,#ff8fd0,#b18cff,#6cc4ff,#8cf0e0);">&nbsp;</td></tr>
<tr><td style="padding:32px 32px 8px 32px;">
<div style="font-size:22px;font-weight:700;letter-spacing:6px;color:${LIME};">MAZAL</div>
<h1 style="margin:28px 0 20px 0;font-size:36px;line-height:1.15;color:#ffffff;font-weight:700;">You're on the list.</h1>
<p style="margin:0 0 16px 0;font-size:16px;line-height:1.55;color:#d8d8ea;">You are on the MAZAL waitlist, and you will hear from us first when we open.</p>
<p style="margin:0 0 28px 0;font-size:16px;line-height:1.55;color:#d8d8ea;">We will keep your inbox quiet until then. The next email from us is the opening.</p>
<div style="font-size:13px;font-weight:700;letter-spacing:2px;color:${LIME};margin:0 0 10px 0;">ONE STEP WHILE YOU WAIT</div>
<p style="margin:0 0 22px 0;font-size:16px;line-height:1.55;color:#d8d8ea;">Join the MAZAL Discord. It is where we open first, and where the people who got here early are.</p>
<table role="presentation" cellspacing="0" cellpadding="0"><tr><td style="background:${LIME};border-radius:999px;"><a href="${esc(SITE.discord)}" style="display:inline-block;padding:15px 30px;font-size:16px;font-weight:700;color:#05060a;text-decoration:none;">Join the MAZAL Discord</a></td></tr></table>
<p style="margin:26px 0 24px 0;font-size:16px;line-height:1.55;color:#d8d8ea;">P.S. Reply to this email and tell us what made you sign up. We read the replies.</p>
<div style="border-top:1px solid #1b1a2b;padding-top:20px;">
<div style="font-size:15px;font-weight:700;color:#ffffff;margin-bottom:6px;">it's more fun in mazal!</div>
<div style="font-size:14px;color:#a9a9c0;">Powered by <span style="color:${LIME};font-weight:700;">GN Ventures</span> &nbsp;|&nbsp; @joinmazal</div>
<p style="margin:18px 0 28px 0;font-size:12px;line-height:1.5;color:#8c8ca6;">You are getting this email because you joined the MAZAL waitlist.<br><a href="${esc(unsubscribeUrl)}" style="color:#d8d8ea;text-decoration:underline;">Unsubscribe</a>${address}</p>
</div>
</td></tr></table>
</td></tr></table></body></html>`;
}
