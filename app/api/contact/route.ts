import { NextResponse } from "next/server";
import { getResendClient, LEAD_TO, RESEND_FROM } from "@/lib/email";
import { siteConfig } from "@/lib/site";

type Language = "NL" | "EN" | "DE";
type ContactSubject = "pers" | "samenwerking" | "lezersvraag" | "overig";

const ALLOWED_LANGUAGES = new Set<string>(["NL", "EN", "DE"]);
const ALLOWED_SUBJECTS = new Set<ContactSubject>([
  "pers",
  "samenwerking",
  "lezersvraag",
  "overig",
]);

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_PAGE_URL_LENGTH = 500;

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

/**
 * In-memory rate limit. Not reliable across multiple instances or
 * serverless cold starts; enough for a low-volume contact form.
 */
const submissionsByIp = new Map<string, number[]>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const stamps = (submissionsByIp.get(ip) ?? []).filter(
    (stamp) => stamp > windowStart
  );
  if (stamps.length >= RATE_LIMIT_MAX) {
    submissionsByIp.set(ip, stamps);
    return true;
  }
  stamps.push(now);
  submissionsByIp.set(ip, stamps);
  return false;
}

function normalizeLanguage(value: unknown): Language | null {
  if (typeof value !== "string") {
    return null;
  }
  const upper = value.trim().toUpperCase();
  if (ALLOWED_LANGUAGES.has(upper)) {
    return upper as Language;
  }
  return null;
}

function parseSubject(value: unknown): ContactSubject | null {
  if (typeof value === "string" && ALLOWED_SUBJECTS.has(value as ContactSubject)) {
    return value as ContactSubject;
  }
  return null;
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizeLine(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }
  return stripHtml(value)
    .replace(/[\u0000\r\n]+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizeMessage(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }
  return stripHtml(value)
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

function isHoneypotTriggered(value: unknown): boolean {
  if (value === true || value === 1) {
    return true;
  }
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return (
      normalized !== "" &&
      normalized !== "false" &&
      normalized !== "0" &&
      normalized !== "off"
    );
  }
  return false;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type ApiSuccess = { success: true };
type ApiFailure = { success: false; message: string };

function jsonOk() {
  return NextResponse.json({ success: true } satisfies ApiSuccess, {
    status: 200,
  });
}

function jsonFail(message: string, status: 400 | 429 | 500) {
  return NextResponse.json(
    { success: false, message } satisfies ApiFailure,
    { status }
  );
}

function buildNotificationText(fields: {
  name: string;
  email: string;
  subject: ContactSubject;
  message: string;
  language: Language;
  pageUrl: string;
}): string {
  return [
    "New contact form message",
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Subject: ${fields.subject}`,
    `Language: ${fields.language}`,
    `Page: ${fields.pageUrl}`,
    "",
    "Message:",
    fields.message,
  ].join("\n");
}

function buildNotificationHtml(fields: {
  name: string;
  email: string;
  subject: ContactSubject;
  message: string;
  language: Language;
  pageUrl: string;
}): string {
  return `<!DOCTYPE html>
<html lang="nl">
  <body style="margin:0;padding:0;background:#f7f4ef;font-family:Georgia,'Times New Roman',serif;color:#1a1a1a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4ef;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;padding:36px 32px;">
            <tr>
              <td>
                <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#6b6358;">Breure Media</p>
                <p style="margin:0 0 20px;font-size:18px;line-height:1.5;">New contact form message</p>
                <p style="margin:0 0 8px;font-size:16px;line-height:1.65;"><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
                <p style="margin:0 0 8px;font-size:16px;line-height:1.65;"><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
                <p style="margin:0 0 8px;font-size:16px;line-height:1.65;"><strong>Subject:</strong> ${escapeHtml(fields.subject)}</p>
                <p style="margin:0 0 8px;font-size:16px;line-height:1.65;"><strong>Language:</strong> ${escapeHtml(fields.language)}</p>
                <p style="margin:0 0 20px;font-size:16px;line-height:1.65;"><strong>Page:</strong> ${escapeHtml(fields.pageUrl)}</p>
                <p style="margin:0 0 8px;font-size:16px;line-height:1.65;"><strong>Message:</strong></p>
                <p style="margin:0;font-size:16px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(fields.message)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  try {
    let rawBody: unknown;

    try {
      rawBody = await request.json();
    } catch (error) {
      console.error("[contact] Invalid JSON body:", error);
      return jsonFail("Invalid JSON body.", 400);
    }

    if (
      rawBody === null ||
      typeof rawBody !== "object" ||
      Array.isArray(rawBody)
    ) {
      return jsonFail("Invalid JSON body.", 400);
    }

    const payload = rawBody as Record<string, unknown>;

    if (isHoneypotTriggered(payload.botcheck)) {
      console.info("[contact] Honeypot triggered; skipping send.");
      return jsonOk();
    }

    const language = normalizeLanguage(payload.language);
    const subject = parseSubject(payload.subject);
    const name = sanitizeLine(payload.name, MAX_NAME_LENGTH);
    const email = sanitizeLine(payload.email, MAX_EMAIL_LENGTH);
    const message = sanitizeMessage(payload.message);
    const pageUrl =
      sanitizeLine(payload.page_url, MAX_PAGE_URL_LENGTH) || siteConfig.url;

    if (!language || !subject) {
      return jsonFail("Invalid request.", 400);
    }

    if (!name) {
      return jsonFail("Invalid request.", 400);
    }

    if (!email || email.length > MAX_EMAIL_LENGTH || !isValidEmail(email)) {
      console.error("[contact] Invalid email:", { email });
      return jsonFail("Invalid email address.", 400);
    }

    if (message.length < MIN_MESSAGE_LENGTH) {
      return jsonFail("Invalid request.", 400);
    }

    if (isRateLimited(clientIp(request))) {
      console.info("[contact] Rate limit reached.");
      return jsonFail("Too many requests.", 429);
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("[contact] Missing RESEND_API_KEY");
      return jsonFail("Server configuration error.", 500);
    }

    const resend = getResendClient(resendApiKey);
    const fields = { name, email, subject, message, language, pageUrl };

    try {
      const result = await resend.emails.send({
        from: RESEND_FROM,
        to: LEAD_TO,
        replyTo: email,
        subject: `Contact via ${pageUrl}`,
        text: buildNotificationText(fields),
        html: buildNotificationHtml(fields),
      });

      if (result.error) {
        console.error("[contact] Notification failed:", {
          error: result.error,
          email,
          page_url: pageUrl,
        });
        return jsonFail("Failed to send the message.", 500);
      }
    } catch (error) {
      console.error("[contact] Notification request error:", {
        error,
        email,
        page_url: pageUrl,
      });
      return jsonFail("Failed to send the message.", 500);
    }

    return jsonOk();
  } catch (error) {
    console.error("[contact] Unhandled error:", error);
    return jsonFail("Internal server error.", 500);
  }
}
