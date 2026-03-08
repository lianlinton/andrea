import type { NextApiRequest, NextApiResponse } from "next";

/* Use published-to-web execution ID (from pubhtml link) - export URL returns 400 */
const SHEET_PUB_ID = process.env.GOOGLE_SHEET_PUB_ID ?? "2PACX-1vQszej-em2kGA83WNWbNwvpiCTE2if63-ffcVDBaVpoMtT6FLqBSv9OPm2u_7YIaep_ZQShFgNpEa8P";
const CSV_URL = `https://docs.google.com/spreadsheets/d/e/${SHEET_PUB_ID}/pub?output=csv`;

/** Parse CSV with proper handling of quoted fields (commas, newlines, escaped quotes) */
function parseCSV(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (!inQuotes) {
      if (c === ",") {
        currentRow.push(current.trim());
        current = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        currentRow.push(current.trim());
        current = "";
        rows.push(currentRow);
        currentRow = [];
      } else if (c !== "\r") {
        current += c;
      }
    } else {
      current += c;
    }
  }
  currentRow.push(current.trim());
  rows.push(currentRow);

  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.replace(/^"|"$/g, "").trim());
  return rows.slice(1).map((values) => {
    const row: Record<string, string> = {};
    headers.forEach((h, j) => {
      row[h] = (values[j] ?? "").replace(/^"|"$/g, "").replace(/""/g, '"').trim();
    });
    return row;
  });
}

/** Convert Google Drive link to embeddable thumbnail URL (works in img tags) */
function toEmbeddableUrl(raw: string): string | null {
  const s = raw.trim();
  if (!s || s.length < 10) return null;
  let fileId: string | null = null;
  const driveFileMatch = s.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  const driveOpenMatch = s.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  const driveUcMatch = s.match(/drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/);
  const driveThumbMatch = s.match(/drive\.google\.com\/thumbnail\?.*id=([a-zA-Z0-9_-]+)/);
  const lh3Match = s.match(/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch) fileId = driveFileMatch[1];
  else if (driveOpenMatch) fileId = driveOpenMatch[1];
  else if (driveUcMatch) fileId = driveUcMatch[1];
  else if (driveThumbMatch) {
    fileId = driveThumbMatch[1];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }
  else if (lh3Match) return s;
  if (fileId) return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  if (/^https?:\/\//i.test(s)) return s;
  return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(CSV_URL, {
      headers: { "User-Agent": "AndreaBirthday/1.0" },
      cache: "no-store",
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Sheet fetch failed: ${response.status}`);
    }

    const text = await response.text();
    if (text.includes("Sign in") || text.includes("DOCTYPE")) {
      return res.status(503).json({
        error: "Sheet is not publicly accessible. Set share to 'Anyone with the link can view'.",
      });
    }

    const rows = parseCSV(text);
    const messages: { text: string; author: string }[] = [];
    const ins: Record<string, number> = {};
    const outs: Record<string, number> = {};

    const firstRow = rows[0] ?? {};
    const keys = Object.keys(firstRow).map((k) => k.trim());
    const getVal = (row: Record<string, string>, key: string) => {
      const k = Object.keys(row).find((x) => x.trim() === key) ?? key;
      return (row[k] ?? "").trim();
    };
    const nameKey = keys.find((k) => /^name$/i.test(k)) ?? keys[1] ?? "";
    const msgKey = keys.find((k) => /birthday message|message for andrea/i.test(k)) ?? keys[2] ?? "";
    const inKey = keys.find((k) => /trait.*survive|one andrea trait/i.test(k) || /^in:/i.test(k)) ?? null;
    const outKey = keys.find((k) => /habit.*retire|one andrea habit/i.test(k) || /^out:/i.test(k)) ?? null;
    const usedKeys = new Set([nameKey, msgKey, inKey, outKey].filter(Boolean));
    const quoteKeyPattern = /andrea\s*['']?s?\s*(quote|said|says)|things andrea said|favorite (andrea )?quote|andrea-ism|quote from andrea|^quotes?\s*\d*$|^quote\s*\d*$|^quote$|quote|said/i;
    let quoteKeys = keys.filter((k) => !usedKeys.has(k) && quoteKeyPattern.test(k));
    if (quoteKeys.length === 0) {
      quoteKeys = keys.filter((k) => !usedKeys.has(k) && /quote|andrea.*said|said.*andrea|andrea.*say/i.test(k));
    }
    if (quoteKeys.length === 0) {
      quoteKeys = keys.filter((k) => !usedKeys.has(k));
    }

    const photoKeyPattern = /photo|image|picture|img|url|link|drive|attachment/i;
    const photoKeys = keys.filter(
      (k) => !usedKeys.has(k) && (photoKeyPattern.test(k) || /^photo\s*\d*$|^image\s*\d*$/i.test(k))
    );

    const quotesSet = new Set<string>();
    const photosSet = new Set<string>();

    function extractPhotoUrls(val: string): string[] {
      if (!val?.trim()) return [];
      const parts = val.split(/[,;|\n]/).map((p) => p.trim()).filter(Boolean);
      const out: string[] = [];
      for (const p of parts) {
        const url = toEmbeddableUrl(p);
        if (url) out.push(url);
      }
      return out;
    }

    for (const row of rows) {
      const name = getVal(row, nameKey);
      const msg = getVal(row, msgKey);
      const inVal = inKey ? getVal(row, inKey) : "";
      const outVal = outKey ? getVal(row, outKey) : "";

      if (msg) {
        messages.push({ text: msg, author: name || "Anonymous" });
      }
      if (inVal) {
        ins[inVal] = (ins[inVal] ?? 0) + 1;
      }
      if (outVal) {
        outs[outVal] = (outs[outVal] ?? 0) + 1;
      }
      for (const qk of quoteKeys) {
        const quoteVal = getVal(row, qk);
        if (quoteVal) quotesSet.add(quoteVal);
      }
      for (const pk of photoKeys) {
        const val = getVal(row, pk);
        for (const url of extractPhotoUrls(val)) {
          photosSet.add(url);
        }
      }
    }

    const quotes = Array.from(quotesSet);
    const photos = Array.from(photosSet);

    res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate=30");
    res.status(200).json({
      messages,
      ins: Object.keys(ins).length > 0 ? ins : null,
      outs: Object.keys(outs).length > 0 ? outs : null,
      quotes: quotes.length > 0 ? quotes : null,
      photos: photos.length > 0 ? photos : null,
    });
  } catch (err) {
    console.error("Sheet API error:", err);
    res.status(500).json({
      error: err instanceof Error ? err.message : "Failed to fetch sheet",
    });
  }
}
