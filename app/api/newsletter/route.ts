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

export async function POST(request: Request) {
  let payload: NewsletterPayload;

  try {
    payload = (await request.json()) as NewsletterPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const email = payload.email?.trim() ?? "";
  const book = (payload.book ?? "Algemeen").trim() || "Algemeen";
  const language = normalizeLanguage(payload.language);
  const pageUrl = payload.page_url?.trim() || siteConfig.url;
  const source = payload.source?.trim() || "website";

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { success: false, message: "Invalid email address." },
      { status: 400 }
    );
  }

  // Honeypot: pretend success without forwarding or emailing.
  if (payload.botcheck) {
    return NextResponse.json({ success: true });
  }

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!accessKey) {
    console.error("[newsletter] Missing NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY");
    return NextResponse.json(
      { success: false, message: "Server configuration error." },
      { status: 500 }
    );
  }

  // 1) Always persist the lead in Web3Forms first (source of truth).
  try {
    const web3Response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        email,
        subject: buildDashboardSubject(book, language),
        from_name: "Breure Media website",
        book,
        language,
        page_url: pageUrl,
        source,
      }),
    });

    const web3Data = (await web3Response.json()) as {
      success?: boolean;
      message?: string;
    };

    if (!web3Response.ok || !web3Data.success) {
      console.error("[newsletter] Web3Forms submit failed:", {
        status: web3Response.status,
        data: web3Data,
      });
      return NextResponse.json(
        { success: false, message: "Failed to store subscription." },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("[newsletter] Web3Forms request error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to store subscription." },
      { status: 502 }
    );
  }

  // 2) Confirmation email via Resend — best-effort; never undo a stored lead.
  if (!resendApiKey) {
    console.error(
      "[newsletter] Missing RESEND_API_KEY — lead stored in Web3Forms; skipping confirmation email."
    );
    return NextResponse.json({ success: true });
  }

  const confirmation = buildConfirmation(book, language);
  const resend = new Resend(resendApiKey);

  try {
    const { error } = await resend.emails.send({
      // Temporary: Resend onboarding sender until custom domain DNS is verified.
      from: "Breure Media <onboarding@resend.dev>",
      to: email,
      subject: confirmation.subject,
      html: buildConfirmationHtml(confirmation.body, language),
      text: confirmation.body,
    });

    if (error) {
      console.error("[newsletter] Resend send failed:", error);
      // Lead is already in Web3Forms; still report success to the visitor.
    }
  } catch (error) {
    console.error("[newsletter] Resend request error:", error);
  }

  return NextResponse.json({ success: true });
}
