import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

type Language = "NL" | "EN";

interface NewsletterPayload {
  email: string;
  book?: string;
  language?: string;
  page_url?: string;
  source?: string;
  botcheck?: boolean;
}

function isGeneralBook(book: string): boolean {
  const normalized = book.trim().toLowerCase();
  return (
    normalized === "" ||
    normalized === "algemeen" ||
    normalized === "general"
  );
}

function normalizeLanguage(value: string | undefined): Language {
  return value?.toUpperCase() === "EN" ? "EN" : "NL";
}

function buildConfirmation(book: string, language: Language) {
  const bookTitle = book.trim() || "Algemeen";
  const general = isGeneralBook(bookTitle);

  if (language === "EN") {
    if (general) {
      return {
        subject: "Subscription confirmation — Breure Media",
        body: "Thank you for subscribing! As soon as there is news about new books from Breure Media, you'll be the first to hear from us.",
      };
    }
    return {
      subject: `Confirmation: ${bookTitle}`,
      body: `Thank you for subscribing — we're glad you're interested in ${bookTitle}! As soon as there is news about the release date and the exclusive preview, you'll be the first to hear from us.`,
    };
  }

  if (general) {
    return {
      subject: "Bevestiging inschrijving Breure Media",
      body: "Hartelijk dank voor je inschrijving! Zodra er nieuws is over nieuwe boeken van Breure Media, hoor je als eerste van ons.",
    };
  }

  return {
    subject: `Bevestiging: ${bookTitle}`,
    body: `Hartelijk dank voor je inschrijving — leuk dat je belangstelling hebt voor ${bookTitle}! Zodra er nieuws is over de verschijningsdatum en de exclusieve voorpublicatie, hoor je als eerste van ons.`,
  };
}

function buildConfirmationHtml(body: string, language: Language): string {
  const greeting = language === "EN" ? "Hello," : "Hallo,";
  const signOff =
    language === "EN"
      ? "Kind regards,<br />Breure Media"
      : "Met vriendelijke groet,<br />Breure Media";

  return `<!DOCTYPE html>
<html lang="${language === "EN" ? "en" : "nl"}">
  <body style="margin:0;padding:0;background:#f7f4ef;font-family:Georgia,'Times New Roman',serif;color:#1a1a1a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4ef;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;padding:36px 32px;">
            <tr>
              <td>
                <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#6b6358;">Breure Media</p>
                <p style="margin:0 0 20px;font-size:18px;line-height:1.5;">${greeting}</p>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.65;">${body}</p>
                <p style="margin:0;font-size:16px;line-height:1.65;">${signOff}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildLeadNotificationText(fields: {
  email: string;
  book: string;
  language: Language;
  pageUrl: string;
  source: string;
}): string {
  return [
    "New newsletter sign-up",
    `Email: ${fields.email}`,
    `Book: ${fields.book}`,
    `Language: ${fields.language}`,
    `Page: ${fields.pageUrl}`,
    `Source: ${fields.source}`,
  ].join("\n");
}

function buildDashboardSubject(book: string, language: Language): string {
  if (language === "EN") {
    return `New sign-up: ${book} (EN)`;
  }
  return `Nieuwe inschrijving: ${book} (NL)`;
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

function jsonFail(message: string, status: 400 | 500) {
  return NextResponse.json(
    { success: false, message } satisfies ApiFailure,
    { status }
  );
}

const RESEND_FROM = "Breure Media <onboarding@resend.dev>";
const LEAD_TO = "ardrotterdam@gmail.com";

export async function POST(request: Request) {
  try {
    let payload: NewsletterPayload;

    try {
      payload = (await request.json()) as NewsletterPayload;
    } catch (error) {
      console.error("[newsletter] Invalid JSON body:", error);
      return jsonFail("Invalid JSON body.", 400);
    }

    const email = payload.email?.trim() ?? "";
    const book = (payload.book ?? "Algemeen").trim() || "Algemeen";
    const language = normalizeLanguage(payload.language);
    const pageUrl = payload.page_url?.trim() || siteConfig.url;
    const source = payload.source?.trim() || "website";

    if (!email || !isValidEmail(email)) {
      console.error("[newsletter] Invalid email:", { email, book, source });
      return jsonFail("Invalid email address.", 400);
    }

    // Honeypot: pretend success without emailing.
    if (payload.botcheck) {
      console.info("[newsletter] Honeypot triggered; skipping send.");
      return jsonOk();
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("[newsletter] Missing RESEND_API_KEY");
      return jsonFail("Server configuration error.", 500);
    }

    const resend = new Resend(resendApiKey);
    const confirmation = buildConfirmation(book, language);
    const leadText = buildLeadNotificationText({
      email,
      book,
      language,
      pageUrl,
      source,
    });

    try {
      const leadResult = await resend.emails.send({
        from: RESEND_FROM,
        to: LEAD_TO,
        replyTo: email,
        subject: buildDashboardSubject(book, language),
        text: leadText,
      });

      if (leadResult.error) {
        console.error("[newsletter] Lead notification failed:", {
          error: leadResult.error,
          email,
          book,
          language,
          source,
          page_url: pageUrl,
        });
        return jsonFail("Failed to send subscription notification.", 500);
      }
    } catch (error) {
      console.error("[newsletter] Lead notification request error:", {
        error,
        email,
        book,
        language,
        source,
        page_url: pageUrl,
      });
      return jsonFail("Failed to send subscription notification.", 500);
    }

    // Confirmation is best-effort: lead already captured, so always succeed to the client.
    try {
      const confirmationResult = await resend.emails.send({
        // Temporary: Resend onboarding sender until custom domain DNS is verified.
        from: RESEND_FROM,
        to: email,
        subject: confirmation.subject,
        html: buildConfirmationHtml(confirmation.body, language),
        text: confirmation.body,
      });

      if (confirmationResult.error) {
        console.error("[newsletter] Confirmation email failed:", {
          error: confirmationResult.error,
          email,
          book,
          language,
        });
      }
    } catch (error) {
      console.error("[newsletter] Confirmation email request error:", {
        error,
        email,
        book,
        language,
      });
    }

    return jsonOk();
  } catch (error) {
    console.error("[newsletter] Unhandled error:", error);
    return jsonFail("Internal server error.", 500);
  }
}
