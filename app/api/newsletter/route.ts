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

async function readJsonSafe(
  response: Response
): Promise<{ data: Record<string, unknown> | null; raw: string }> {
  const raw = await response.text();
  if (!raw.trim()) {
    return { data: null, raw };
  }
  try {
    return { data: JSON.parse(raw) as Record<string, unknown>, raw };
  } catch {
    return { data: null, raw };
  }
}

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

    // Honeypot: pretend success without forwarding or emailing.
    if (payload.botcheck) {
      console.info("[newsletter] Honeypot triggered; skipping forward.");
      return jsonOk();
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!accessKey) {
      console.error("[newsletter] Missing NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY");
      return jsonFail("Server configuration error.", 500);
    }

    const web3Body = {
      access_key: accessKey,
      subject: buildDashboardSubject(book, language),
      from_name: "Breure Media website",
      name: "Newsletter subscriber",
      email,
      message: [
        `New newsletter sign-up`,
        `Email: ${email}`,
        `Book: ${book}`,
        `Language: ${language}`,
        `Page: ${pageUrl}`,
        `Source: ${source}`,
      ].join("\n"),
      book,
      language,
      page_url: pageUrl,
      source,
    };

    // 1) Always persist the lead in Web3Forms first (source of truth).
    try {
      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(web3Body),
      });

      const { data: web3Data, raw: web3Raw } = await readJsonSafe(web3Response);
      const web3Success = web3Response.ok && web3Data?.success === true;

      if (!web3Success) {
        console.error("[newsletter] Web3Forms submit failed:", {
          status: web3Response.status,
          statusText: web3Response.statusText,
          data: web3Data,
          raw: web3Raw.slice(0, 500),
          email,
          book,
          language,
          source,
          page_url: pageUrl,
        });
        return jsonFail("Failed to store subscription.", 500);
      }
    } catch (error) {
      console.error("[newsletter] Web3Forms request error:", {
        error,
        email,
        book,
        language,
        source,
        page_url: pageUrl,
      });
      return jsonFail("Failed to store subscription.", 500);
    }

    // 2) Confirmation email via Resend — best-effort; never undo a stored lead.
    if (!resendApiKey) {
      console.error(
        "[newsletter] Missing RESEND_API_KEY — lead stored in Web3Forms; skipping confirmation email."
      );
      return jsonOk();
    }

    const confirmation = buildConfirmation(book, language);

    try {
      const resend = new Resend(resendApiKey);
      const { error } = await resend.emails.send({
        // Temporary: Resend onboarding sender until custom domain DNS is verified.
        from: "Breure Media <onboarding@resend.dev>",
        to: email,
        subject: confirmation.subject,
        html: buildConfirmationHtml(confirmation.body, language),
        text: confirmation.body,
      });

      if (error) {
        console.error("[newsletter] Resend send failed:", {
          error,
          email,
          book,
          language,
        });
        // Lead is already in Web3Forms; still report success to the visitor.
      }
    } catch (error) {
      console.error("[newsletter] Resend request error:", {
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
