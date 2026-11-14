/**
 * MAZAL waitlist webhook. Bound to the "MAZAL Waitlist (DO NOT DELETE)" Google Sheet.
 *
 * Setup (once):
 * 1. Open the sheet, Extensions > Apps Script, paste this file, save.
 * 2. Project Settings > Script Properties > add SECRET = a long random string
 *    (the same value goes in the site's SHEETS_WEBHOOK_SECRET env var).
 * 3. Deploy > New deployment > type Web app > Execute as: Me > Who has access: Anyone > Deploy.
 *    Copy the web app URL into the site's SHEETS_WEBHOOK_URL env var.
 *
 * Columns: A signed up (UTC), B email, C source, D welcome email sent, E status.
 */
var SHEET_NAME = 'Waitlist';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var data = JSON.parse(e.postData.contents);
    var secret = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (!secret || data.secret !== secret) return reply({ ok: false, error: 'forbidden' });

    var email = String(data.email || '').trim().toLowerCase();
    if (!email) return reply({ ok: false, error: 'email required' });

    var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
    var row = findRow(sheet, email);

    if (data.action === 'add') {
      if (row) return reply({ ok: true, duplicate: true });
      sheet.appendRow([new Date().toISOString(), email, String(data.source || ''), 'pending', 'subscribed']);
      return reply({ ok: true, duplicate: false });
    }
    if (!row) return reply({ ok: false, error: 'not found' });
    if (data.action === 'mark') {
      sheet.getRange(row, 4).setValue(data.emailed ? 'yes' : 'no');
      return reply({ ok: true });
    }
    if (data.action === 'unsubscribe') {
      sheet.getRange(row, 5).setValue('unsubscribed');
      return reply({ ok: true });
    }
    return reply({ ok: false, error: 'unknown action' });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function findRow(sheet, email) {
  var last = sheet.getLastRow();
  if (last < 2) return 0;
  var emails = sheet.getRange(2, 2, last - 1, 1).getValues();
  for (var i = 0; i < emails.length; i++) {
    if (String(emails[i][0]).toLowerCase() === email) return i + 2;
  }
  return 0;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
