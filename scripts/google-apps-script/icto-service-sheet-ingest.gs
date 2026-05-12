  /**
  * ICTO institutional / service request — intake to Google Sheet + Drive uploads.
  *
  * Deploy: Extensions → Apps Script → paste this → Deploy → New deployment → Select type “Web app”
  *   Execute as: Me
  *   Who has access: Anyone (anonymous POST from your website’s server carries the shared secret)
  *
  * Script properties (Project Settings → Script properties → Add row):
  *   INGEST_SECRET            — Strong random string; same value as ICTO_SERVICE_SHEET_SHARED_SECRET on Netlify
  *   SPREADSHEET_ID           — Target Google Sheet ID (from sheet URL)
  *   SHEET_NAME               — Tab name (e.g. "Form Responses 1")
  *   DRIVE_FOLDER_ID          — Recommended for uploads: uploads go here; cells get clickable Drive links
  *
  * ── If nothing appears in the Sheet ──
  * 1) Website shows an error BEFORE “success”: fix that first — often reCAPTCHA (RECAPTCHA_SECRET_KEY + domain)
  *    or missing ICTO_APPS_SCRIPT_INGEST_URL / ICTO_SERVICE_SHEET_SHARED_SECRET on the server.
  * 2) Apps Script: Executions — open the failed run; read the error (Unauthorized = wrong INGEST_SECRET;
  *    Sheet tab not found = wrong SHEET_NAME; Exception on openById = wrong SPREADSHEET_ID or no access).
  * 3) After changing this file: Deploy → Manage deployments → Edit → Version “New version” → Deploy
  *    (old URLs keep old code until you redeploy).
  * 4) Added a new Form question: row 1 of the tab must include the new title; add header → entry.* in
  *    PORTAL_ENTRY_ID_BY_HEADER and the same mapping on the website (ictoFormResponseColumnTitles / entries),
  *    or rely on entryIdByColumnHeader from the portal for that title.
  */

  function assertSecret_(payload) {
    var raw = PropertiesService.getScriptProperties().getProperty('INGEST_SECRET');
    var expected = raw ? String(raw).trim() : '';
    var got =
      payload && typeof payload.secret === 'string' ? String(payload.secret).trim() : '';
    if (!expected || got !== expected) throw new Error('Unauthorized');
  }

  /**
  * Normalize header strings for tolerant matching (Spaces, slashes, typo-prone duplicates).
  */
  function normalizeHeader_(h) {
    return String(h == null ? '' : h)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/\u00a0/g, ' ');
  }

  /**
  * True when row 1 clearly looks like Google Forms “Responses” headers (not our compact legacy log).
  * We check several known Form column names because A1 can be empty/unusual while B1 is “Service Type”.
  */
  function isFormResponsesLayout_(headers) {
    if (!headers || !headers.length) return false;
    for (var i = 0; i < headers.length; i++) {
      var h = normalizeHeader_(headers[i]);
      if (!h) continue;
      /* Any one of these → treat as Google Form “Responses” row (was: exact match only; failed on minor title variants). */
      if (h === 'timestamp' || h.indexOf('timestamp') !== -1) return true;
      if (h === 'service type' || (h.indexOf('service') !== -1 && h.indexOf('type') !== -1)) return true;
      if (h === 'local record id' || h.indexOf('local record') !== -1) return true;
      if (h === 'appointment reference' || (h.indexOf('appointment') !== -1 && h.indexOf('reference') !== -1))
        return true;
    }
    return false;
  }

  function countHeaderMapKeys_(map) {
    if (!map || typeof map !== 'object') return 0;
    var n = 0;
    for (var k in map) {
      if (Object.prototype.hasOwnProperty.call(map, k)) n++;
    }
    return n;
  }

  function countPortalEntryAnswers_(payload) {
    var e = payload.entries && typeof payload.entries === 'object' ? payload.entries : {};
    var n = 0;
    for (var k in e) {
      if (Object.prototype.hasOwnProperty.call(e, k) && /^entry\.\d+$/.test(String(k).trim())) n++;
    }
    return n;
  }

  /**
   * Prefer form-layout rows whenever we have Sheet row-1 titles and portal data — legacy writes five cells only;
   * the 4th is a JSON lump that lands under “Appointment Reference”.
   */
  function shouldUseFormResponseIngest_(fh, payload) {
    if (!fh || !fh.headers || !fh.headers.length || fh.numCols < 1) return false;
    var mapN = countHeaderMapKeys_(payload.entryIdByColumnHeader);
    var entryN = countPortalEntryAnswers_(payload);
    if (mapN >= 3 && entryN >= 3) return true;
    if (isFormResponsesLayout_(fh.headers)) return true;
    return mapN >= 5 && fh.numCols >= 5;
  }

  function sanitizeEntriesForIngest_(payload) {
    var e = payload.entries && typeof payload.entries === 'object' ? payload.entries : {};
    /** @type {Record<string, unknown>} */
    var out = {};
    for (var k in e) {
      if (!Object.prototype.hasOwnProperty.call(e, k)) continue;
      if (/^entry\.\d+$/.test(String(k))) out[k] = e[k];
    }
    return out;
  }

  function payloadWithSanitizedEntries_(payload) {
    /** @type {Record<string, unknown>} */
    var clone = {};
    for (var pk in payload) {
      if (!Object.prototype.hasOwnProperty.call(payload, pk)) continue;
      if (pk !== 'entries') clone[pk] = payload[pk];
    }
    clone.entries = sanitizeEntriesForIngest_(payload);
    return clone;
  }

/** Portal's fixed Google Sheet column order (A..W). Keep in sync with the live tab headers. */
var PORTAL_EXPECTED_HEADERS = [
  'Timestamp',
  'Service Type',
  'Local record ID',
  'Appointment Reference',
  'Requester Information',
  'Date',
  'Requesting Person',
  'Institutional / Official Email',
  'Collgeof/Office',
  'Location/Work Location',
  'Valid ID (Front)',
  'Valid ID (Back)',
  'Certificate of Registration (COR)',
  'Hardware and Technical Assistance',
  'Specific  (Hardware)',
  'Software Installation',
  'Specific (Software)',
  'Other Services',
  'Liability Disclaimer',
  'ApproveHandwritten',
  'Remarks / Additional Details (Optional)',
  'e-signature',
  'Capture at',
  'Printed Name',
];

/** Guaranteed header -> entry.* mapping for ICTO portal columns. */
var PORTAL_ENTRY_ID_BY_HEADER = {
  'Service Type': 'entry.1331424977',
  'Local record ID': 'entry.828831792',
  'Appointment Reference': 'entry.975653240',
  'Requester Information': 'entry.1249583395',
  'Date': 'entry.467064022',
  'Requesting Person': 'entry.1006588440',
  'Institutional / Official Email': 'entry.1568275743',
  'Collgeof/Office': 'entry.417872517',
  'Location/Work Location': 'entry.1245989223',
  'Valid ID (Front)': 'entry.1206927332',
  'Valid ID (Back)': 'entry.1249099390',
  'Certificate of Registration (COR)': 'entry.449553907',
  'Hardware and Technical Assistance': 'entry.1740815378',
  'Specific  (Hardware)': 'entry.745277336',
  'Specific (Hardware)': 'entry.745277336',
  'Software Installation': 'entry.1567012588',
  'Specific (Software)': 'entry.83656928',
  'Other Services': 'entry.2091070010',
  'Liability Disclaimer': 'entry.1619525607',
  'ApproveHandwritten': 'entry.1382839950',
  'Remarks / Additional Details (Optional)': 'entry.1556705629',
  'e-signature': 'entry.1605280317',
  'Capture at': 'entry.1393461297',
  'Printed Name': 'entry.244210367',
};

function mergedEntryMap_(explicitMap) {
  var out = {};
  for (var k in PORTAL_ENTRY_ID_BY_HEADER) {
    if (Object.prototype.hasOwnProperty.call(PORTAL_ENTRY_ID_BY_HEADER, k))
      out[k] = PORTAL_ENTRY_ID_BY_HEADER[k];
  }
  if (explicitMap && typeof explicitMap === 'object') {
    for (var ek in explicitMap) {
      if (Object.prototype.hasOwnProperty.call(explicitMap, ek)) out[ek] = explicitMap[ek];
    }
  }
  return out;
}

  /** Scan at least this many columns on row 1 — Google Form + extra columns (~23); too small → under-read → legacy JSON in column D. */
  var MIN_FORM_HEADER_SCAN_COLS = 48;

  /**
   * Read row 1 with a wide sweep. `getLastColumn()` often ends before the rightmost question when only row 1 has titles.
   */
  function readFormHeadersRow_(sh) {
    var last = sh.getLastColumn();
    var scanWidth = Math.min(
      512,
      Math.max(MIN_FORM_HEADER_SCAN_COLS, last + 8, sh.getMaxColumns())
    );
    if (scanWidth < 1) return { headers: [], numCols: 0 };
    var rowVals = sh.getRange(1, 1, 1, scanWidth).getValues()[0];
    var numCols = 0;
    for (var j = rowVals.length - 1; j >= 0; j--) {
      var cell = rowVals[j];
      if (cell !== '' && cell != null && String(cell).trim() !== '') {
        numCols = j + 1;
        break;
      }
    }
    if (numCols < 1) return { headers: [], numCols: 0 };
    return { headers: rowVals.slice(0, numCols), numCols: numCols };
  }

  /**
  * If relay ever sends { "entry.123": "Question title" }, normalize to { "Question title": "entry.123" }.
  */
  function forwardEntryHeaderMap_(map) {
    if (!map || typeof map !== 'object') return {};
    var keys = Object.keys(map);
    if (!keys.length) return /** @type {Record<string, string>} */ ({});
    var entryLike = 0;
    for (var i = 0; i < keys.length; i++) {
      if (/^entry\.\d+$/.test(String(keys[i]).trim())) entryLike++;
    }
    if (entryLike > 0 && entryLike / keys.length >= 0.5) {
      var inv = {};
      for (var j = 0; j < keys.length; j++) {
        var eid = String(keys[j]).trim();
        if (!/^entry\.\d+$/.test(eid)) continue;
        var lab = map[eid];
        if (lab == null) continue;
        inv[String(lab).trim()] = eid;
      }
      return inv;
    }
    return /** @type {Record<string, string>} */ (map);
  }

  function headerSignature_(h) {
    return normalizeHeader_(h).replace(/[^a-z0-9]+/g, '');
  }

  /**
  * Map Sheet row-1 label → entry.* id. Never returns a user-facing cell value (only ids for entries lookup).
  */
  function resolveEntryIdForHeader_(title, explicitMap) {
    if (!title) return '';
    var map = forwardEntryHeaderMap_(explicitMap);
    if (!map || typeof map !== 'object') return '';

    var t = String(title).trim();
    var v0 = map[t];
    if (v0 && String(v0).trim()) return String(v0).trim();

    var tn = normalizeHeader_(t);
    var k;
    for (k in map) {
      if (!Object.prototype.hasOwnProperty.call(map, k)) continue;
      if (normalizeHeader_(k) === tn) return String(map[k]).trim();
    }

    var sig = headerSignature_(t);
    if (sig) {
      for (k in map) {
        if (!Object.prototype.hasOwnProperty.call(map, k)) continue;
        if (headerSignature_(k) === sig) return String(map[k]).trim();
      }
    }

    var compact = tn.replace(/\s+/g, '');
    if (/^entry\.\d+$/.test(compact)) return compact;

    return '';
  }

  /**
  * Upload files to Drive and group URLs by Form `entry.*` field id.
  */
  function uploadFilesAndUrlsByEntry_(folderId, files) {
    /** @type {Record<string, string[]>} */
    var byEntry = {};

    if (!folderId || !files || !files.length) return byEntry;

    try {
      var folder = DriveApp.getFolderById(folderId.trim());
      for (var i = 0; i < files.length; i++) {
        var f = files[i];
        if (
          !f ||
          typeof f.filename !== 'string' ||
          typeof f.dataBase64 !== 'string' ||
          !f.dataBase64.length
        )
          continue;
        var entryField = typeof f.entry === 'string' ? f.entry.trim() : '';
        if (!entryField) continue;
        var mime = f.mimeType || 'application/octet-stream';
        var bytes = Utilities.base64Decode(f.dataBase64);
        var blob = Utilities.newBlob(bytes, mime, f.filename || 'attachment-' + (i + 1));
        var file = folder.createFile(blob);
        var url = file.getUrl();
        if (!byEntry[entryField]) byEntry[entryField] = [];
        byEntry[entryField].push(url);
      }
    } catch (e) {
      byEntry['_error'] = ['Drive error: ' + String(e.message || e)];
    }
    return byEntry;
  }

  function entryTextValue_(entries, entryId) {
    if (!entryId || !entries || typeof entries !== 'object') return '';
    var v = entries[entryId];
    if (v == null) return '';
    if (Array.isArray(v)) {
      return v
        .map(function (x) {
          return x == null ? '' : String(x);
        })
        .filter(function (s) {
          return s !== '';
        })
        .join(', ');
    }
    if (typeof v === 'object') return '';
    return String(v);
  }

  function appendFormResponseRow_(sh, payload, urlsByEntry, headers) {
    if (!headers || !headers.length) throw new Error('Sheet has no header row');

    /* forwardEntryHeaderMap_ applied inside resolveEntryIdForHeader_ */
    var map =
      payload.entryIdByColumnHeader && typeof payload.entryIdByColumnHeader === 'object'
        ? payload.entryIdByColumnHeader
        : {};
    map = mergedEntryMap_(map);

    var entries = payload.entries && typeof payload.entries === 'object' ? payload.entries : {};
    var submittedAt =
      typeof payload.submittedAt === 'string' && payload.submittedAt.trim()
        ? payload.submittedAt.trim()
        : new Date().toISOString();
    var submissionId =
      typeof payload.submissionId === 'string' ? payload.submissionId.trim() : '';

    /** @type {string[]} */
    var row = [];
    for (var c = 0; c < headers.length; c++) {
      var headerRaw = headers[c];
      var headerStr = headerRaw == null ? '' : String(headerRaw).trim();
      var hn = normalizeHeader_(headerStr);

      var cell = '';
      if (hn === 'timestamp') {
        cell = submittedAt;
      } else if (hn === 'local record id') {
        cell = submissionId;
      } else {
        var entryId = resolveEntryIdForHeader_(headerStr, map);
        if (entryId && urlsByEntry && urlsByEntry[entryId] && urlsByEntry[entryId].length) {
          cell = urlsByEntry[entryId].join('\n');
        } else if (entryId) {
          cell = entryTextValue_(entries, entryId);
        }
      }
      row.push(cell);
    }

    sh.appendRow(row);
  }

  function appendLegacyIngestRow_(sh, payload, linksJoined) {
    var entriesJson =
      typeof payload.entries === 'object' ? JSON.stringify(payload.entries) : '{}';

    sh.appendRow([
      payload.submittedAt || new Date().toISOString(),
      payload.appointmentReference || '',
      payload.submissionId || '',
      entriesJson,
      linksJoined,
    ]);
  }

/**
 * Last-resort structured write for portal payloads when row-1 detection fails.
 * Writes one value per expected column (instead of legacy 5-cell JSON/log row).
 */
function appendExpectedPortalRow_(sh, payload, urlsByEntry) {
  var p2 = {};
  for (var k in payload) {
    if (Object.prototype.hasOwnProperty.call(payload, k)) p2[k] = payload[k];
  }
  p2.entryIdByColumnHeader = mergedEntryMap_(payload.entryIdByColumnHeader);
  appendFormResponseRow_(sh, p2, urlsByEntry, PORTAL_EXPECTED_HEADERS);
}

function hasHeaderNamed_(headers, expected) {
  if (!headers || !headers.length || !expected) return false;
  var en = normalizeHeader_(expected);
  for (var i = 0; i < headers.length; i++) {
    if (normalizeHeader_(headers[i]) === en) return true;
  }
  return false;
}

function looksLikePortalResponsesHeaderRow_(fh) {
  if (!fh || !fh.headers || !fh.headers.length) return false;
  if (!hasHeaderNamed_(fh.headers, 'Service Type')) return false;
  if (!hasHeaderNamed_(fh.headers, 'Appointment Reference')) return false;
  if (!hasHeaderNamed_(fh.headers, 'Requester Information')) return false;
  return true;
}

  function ingestRow_(payload) {
    var id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    var tab = PropertiesService.getScriptProperties().getProperty('SHEET_NAME');
    if (!id || !tab) throw new Error('Missing SPREADSHEET_ID or SHEET_NAME');

    var folderId =
      PropertiesService.getScriptProperties().getProperty('DRIVE_FOLDER_ID') || '';

    var files = payload.files || [];
    var urlsByEntry = uploadFilesAndUrlsByEntry_(folderId, files);

    /** @type {string[]} */
    var flatLinks = [];
    for (var ek in urlsByEntry) {
      if (Object.prototype.hasOwnProperty.call(urlsByEntry, ek) && ek !== '_error') {
        var arr = urlsByEntry[ek];
        for (var j = 0; j < arr.length; j++) flatLinks.push(arr[j]);
      }
    }
    if (urlsByEntry['_error'] && urlsByEntry['_error'].length)
      flatLinks.push(urlsByEntry['_error'][0]);
    var linksJoined = flatLinks.join('|');

    var ss = SpreadsheetApp.openById(String(id).trim());
    var sh = ss.getSheetByName(String(tab).trim());
    if (!sh) throw new Error('Sheet tab not found: ' + tab);

    var safePayload = payloadWithSanitizedEntries_(payload);
  var _mapN0 = countHeaderMapKeys_(safePayload.entryIdByColumnHeader);
  var _entryN0 = countPortalEntryAnswers_(safePayload);
  var fh = readFormHeadersRow_(sh);
  /* Portal payload path: always write using fixed expected columns A..W (one value per header). */
  if (_mapN0 >= 3 && _entryN0 >= 3) {
    /* Prefer live row-1 headers to avoid column shift when the sheet tab has customized order. */
    if (looksLikePortalResponsesHeaderRow_(fh)) {
      appendFormResponseRow_(sh, safePayload, urlsByEntry, fh.headers);
      return;
    }
    appendExpectedPortalRow_(sh, safePayload, urlsByEntry);
    return;
  }

    if (!shouldUseFormResponseIngest_(fh, safePayload)) {
      appendLegacyIngestRow_(sh, safePayload, linksJoined);
      return;
    }

    appendFormResponseRow_(sh, safePayload, urlsByEntry, fh.headers);
  }

  function doPost(e) {
    try {
      if (!e || !e.postData || !e.postData.contents) {
        return ContentService.createTextOutput(
          JSON.stringify({
            ok: false,
            error: 'Empty body',
            ts: new Date().toISOString(),
          })
        ).setMimeType(ContentService.MimeType.JSON);
      }

      var payload = JSON.parse(e.postData.contents);
      assertSecret_(payload);
      ingestRow_(payload);
      return ContentService.createTextOutput(
        JSON.stringify({
          ok: true,
          ts: new Date().toISOString(),
        })
      ).setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService.createTextOutput(
        JSON.stringify({
          ok: false,
          error: String(err.message || err),
          ts: new Date().toISOString(),
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }

  function doGet() {
    return ContentService.createTextOutput(
      'ICTO service sheet ingest POST endpoint is ready.'
    );
  }
