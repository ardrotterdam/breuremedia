import { NextResponse } from "next/server";
import { getChapter1 } from "@/data/chapter-1";
import { getAllBooks } from "@/data/books";
import { chapter1Url } from "@/lib/chapter-1";
import { upsertContact } from "@/lib/contacts";
import {
  getResendClient,
  LEAD_TO,
  RESEND_FROM,
  unsubscribeMailto,
} from "@/lib/email";
import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

type Language = "NL" | "EN" | "DE";
type LeadMagnet = "chapter-1" | "authors-waitlist";

const ALLOWED_LANGUAGES = new Set<string>(["NL", "EN", "DE"]);
const MAX_EMAIL_LENGTH = 254;
const MAX_SOURCE_LENGTH = 120;
const MAX_PAGE_URL_LENGTH = 500;
const MAX_BOOK_LENGTH = 120;

const GENERAL_BOOK_TITLES: Record<Language, string> = {
  NL: "Algemeen",
  EN: "General",
  DE: "Allgemein",
};

function isGeneralBook(book: string): boolean {
  const normalized = book.trim().toLowerCase();
  return (
    normalized === "" ||
    normalized === "algemeen" ||
    normalized === "general" ||
    normalized === "allgemein"
  );
}

/**
 * Accepts only NL/EN/DE (any case). Missing or unsupported values are rejected.
 */
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

function toLocale(language: Language): Locale {
  if (language === "EN") return "en";
  if (language === "DE") return "de";
  return "nl";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizeMeta(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }
  return value.replace(/[\u0000\r\n]+/g, " ").trim().slice(0, maxLength);
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

function isExplicitMarketingConsent(value: unknown): boolean {
  return value === true;
}

const ALLOWED_LEAD_MAGNETS = new Set<LeadMagnet>([
  "chapter-1",
  "authors-waitlist",
]);

function parseLeadMagnet(
  value: unknown
): { ok: true; leadMagnet: LeadMagnet | "" } | { ok: false } {
  if (value === undefined || value === null || value === "") {
    return { ok: true, leadMagnet: "" };
  }
  if (typeof value === "string" && ALLOWED_LEAD_MAGNETS.has(value as LeadMagnet)) {
    return { ok: true, leadMagnet: value as LeadMagnet };
  }
  return { ok: false };
}

function allowedBookTitles(): Set<string> {
  const titles = new Set<string>(Object.values(GENERAL_BOOK_TITLES));
  for (const book of getAllBooks()) {
    titles.add(book.title);
    if (book.en?.title) {
      titles.add(book.en.title);
    }
    if (book.de?.title) {
      titles.add(book.de.title);
    }
  }
  return titles;
}

function trustedBookTitle(
  raw: unknown,
  language: Language,
  chapterRequested: boolean
): string {
  if (chapterRequested) {
    return getChapter1(toLocale(language)).bookTitle;
  }
  const candidate = sanitizeMeta(raw, MAX_BOOK_LENGTH);
  if (candidate && allowedBookTitles().has(candidate)) {
    return candidate;
  }
  return GENERAL_BOOK_TITLES[language];
}

function buildWaitlistConfirmation(book: string, language: Language) {
  const bookTitle = book.trim() || "Algemeen";
  const general = isGeneralBook(bookTitle);

  if (language === "EN") {
    if (general) {
      return {
        subject: "Subscription confirmation: Breure Media",
        body: "Thank you for subscribing! As soon as there is news about new books from Breure Media, you'll be the first to hear from us.",
      };
    }
    return {
      subject: `Confirmation: ${bookTitle}`,
      body: `Thank you for subscribing. We're glad you're interested in ${bookTitle}! As soon as there is news about the release date and the exclusive preview, you'll be the first to hear from us.`,
    };
  }

  if (language === "DE") {
    if (general) {
      return {
        subject: "Bestätigung Ihrer Anmeldung bei Breure Media",
        body: "Vielen Dank für Ihre Anmeldung. Sobald es Neuigkeiten zu neuen Büchern von Breure Media gibt, hören Sie zuerst von uns.",
      };
    }
    return {
      subject: `Bestätigung: ${bookTitle}`,
      body: `Vielen Dank für Ihre Anmeldung. Schön, dass ${bookTitle} Sie interessiert. Sobald es Neuigkeiten zum Erscheinungstermin und zur Vorveröffentlichung gibt, hören Sie zuerst von uns.`,
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
    body: `Hartelijk dank voor je inschrijving. Leuk dat je belangstelling hebt voor ${bookTitle}! Zodra er nieuws is over de verschijningsdatum en de exclusieve voorpublicatie, hoor je als eerste van ons.`,
  };
}

function buildAuthorsWaitlistConfirmation(language: Language) {
  if (language === "EN") {
    return {
      subject: "You are on the list",
      body: "Thank you. I have noted your email address for Breure Media for authors. As soon as the label opens to other thriller authors, I will let you know. I will not send you anything else.",
      text: "Thank you. I have noted your email address for Breure Media for authors. As soon as the label opens to other thriller authors, I will let you know. I will not send you anything else. Kind regards, Ard Breure",
      signOff: "Kind regards,<br />Ard Breure",
    };
  }

  if (language === "DE") {
    return {
      subject: "Sie stehen auf der Liste",
      body: "Vielen Dank. Ich habe Ihre E-Mail-Adresse für Breure Media für Autoren notiert. Sobald sich das Label für andere Thrillerautoren öffnet, melde ich mich. Etwas anderes schicke ich Ihnen nicht.",
      text: "Vielen Dank. Ich habe Ihre E-Mail-Adresse für Breure Media für Autoren notiert. Sobald sich das Label für andere Thrillerautoren öffnet, melde ich mich. Etwas anderes schicke ich Ihnen nicht. Mit freundlichen Grüßen, Ard Breure",
      signOff: "Mit freundlichen Grüßen,<br />Ard Breure",
    };
  }

  return {
    subject: "Je staat op de lijst",
    body: "Dank je. Ik heb je e-mailadres genoteerd voor Breure Media voor auteurs. Zodra het label opengaat voor andere thrillerauteurs, laat ik het je weten. Verder stuur ik je niets.",
    text: "Dank je. Ik heb je e-mailadres genoteerd voor Breure Media voor auteurs. Zodra het label opengaat voor andere thrillerauteurs, laat ik het je weten. Verder stuur ik je niets. Met vriendelijke groet, Ard Breure",
    signOff: "Met vriendelijke groet,<br />Ard Breure",
  };
}

function buildChapterConfirmation(book: string, language: Language, url: string) {
  if (language === "EN") {
    return {
      subject: `Your first chapter of ${book}`,
      body: `Thank you for your interest in ${book}. You can read the first chapter here:`,
      cta: "Read chapter 1",
      url,
    };
  }

  if (language === "DE") {
    return {
      subject: `Ihr erstes Kapitel von ${book}`,
      body: `Vielen Dank für Ihr Interesse an ${book}. Das erste Kapitel lesen Sie hier:`,
      cta: "Kapitel 1 lesen",
      url,
    };
  }

  return {
    subject: `Je eerste hoofdstuk van ${book}`,
    body: `Hartelijk dank voor je belangstelling voor ${book}. Het eerste hoofdstuk lees je hier:`,
    cta: "Lees hoofdstuk 1",
    url,
  };
}

function wrapEmailHtml(options: {
  language: Language;
  bodyHtml: string;
  signOff?: string;
}): string {
  const greeting =
    options.language === "EN"
      ? "Hello,"
      : options.language === "DE"
        ? "Guten Tag,"
        : "Hallo,";
  const signOff =
    options.signOff ??
    (options.language === "EN"
      ? "Kind regards,<br />Breure Media"
      : options.language === "DE"
        ? "Mit freundlichen Grüßen,<br />Breure Media"
        : "Met vriendelijke groet,<br />Breure Media");
  const htmlLang =
    options.language === "EN" ? "en" : options.language === "DE" ? "de" : "nl";

  return `<!DOCTYPE html>
<html lang="${htmlLang}">
  <body style="margin:0;padding:0;background:#f7f4ef;font-family:Georgia,'Times New Roman',serif;color:#1a1a1a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4ef;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;padding:36px 32px;">
            <tr>
              <td>
                <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#6b6358;">Breure Media</p>
                <p style="margin:0 0 20px;font-size:18px;line-height:1.5;">${greeting}</p>
                ${options.bodyHtml}
                <p style="margin:24px 0 0;font-size:16px;line-height:1.65;">${signOff}</p>
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
  leadMagnet: string;
  marketingIntent: boolean;
  confirmMarketing: boolean;
  marketingConsent: "true" | "false";
  marketingSignupAt?: string;
  chapterRequested: boolean;
}): string {
  const kind =
    fields.leadMagnet === "chapter-1"
      ? "New Chapter 1 request"
      : fields.leadMagnet === "authors-waitlist"
        ? "New authors waitlist"
        : fields.confirmMarketing
          ? "New newsletter sign-up"
          : "Form without marketing consent";

  return [
    kind,
    `Email: ${fields.email}`,
    `Book: ${fields.book}`,
    `Language: ${fields.language}`,
    `Page: ${fields.pageUrl}`,
    `Source: ${fields.source}`,
    `Lead magnet: ${fields.leadMagnet || "none"}`,
    `Chapter requested: ${fields.chapterRequested ? "yes" : "no"}`,
    `Marketing intent: ${fields.marketingIntent ? "yes" : "no"}`,
    `Waitlist/newsletter signup: ${fields.confirmMarketing ? "yes" : "no"}`,
    `marketing_consent: ${fields.marketingConsent}`,
    `marketing_signup_at: ${fields.marketingSignupAt ?? "n/a"}`,
  ].join("\n");
}

function buildDashboardSubject(
  book: string,
  language: Language,
  leadMagnet: LeadMagnet | "",
  confirmMarketing: boolean
): string {
  if (leadMagnet === "authors-waitlist") {
    if (language === "EN") {
      return "New authors waitlist (EN)";
    }
    if (language === "DE") {
      return "New authors waitlist (DE)";
    }
    return "Nieuwe auteurswachtlijst (NL)";
  }

  if (leadMagnet === "chapter-1") {
    if (language === "EN") {
      return `New Chapter 1: ${book} (EN)`;
    }
    if (language === "DE") {
      return `New Chapter 1: ${book} (DE)`;
    }
    return `Nieuw hoofdstuk 1: ${book} (NL)`;
  }

  if (!confirmMarketing) {
    if (language === "EN") {
      return `Form without marketing consent: ${book} (EN)`;
    }
    if (language === "DE") {
      return `Form without marketing consent: ${book} (DE)`;
    }
    return `Formulier zonder marketingtoestemming: ${book} (NL)`;
  }

  if (language === "EN") {
    return `New sign-up: ${book} (EN)`;
  }
  if (language === "DE") {
    return `New sign-up: ${book} (DE)`;
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

export async function POST(request: Request) {
  try {
    let rawBody: unknown;

    try {
      rawBody = await request.json();
    } catch (error) {
      console.error("[newsletter] Invalid JSON body:", error);
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
      console.info("[newsletter] Honeypot triggered; skipping send.");
      return jsonOk();
    }

    const email =
      typeof payload.email === "string" ? payload.email.trim() : "";
    const language = normalizeLanguage(payload.language);
    if (!language) {
      return jsonFail("Invalid request.", 400);
    }
    const locale = toLocale(language);
    const magnet = parseLeadMagnet(payload.leadMagnet);

    if (!magnet.ok) {
      return jsonFail("Invalid request.", 400);
    }

    const leadMagnet = magnet.leadMagnet;
    const chapterRequested = leadMagnet === "chapter-1";
    const authorsWaitlist = leadMagnet === "authors-waitlist";
    const explicitMarketingConsent = isExplicitMarketingConsent(
      payload.marketingConsent
    );
    const marketingContextAllowed = !chapterRequested && !authorsWaitlist;
    const confirmMarketing =
      marketingContextAllowed && explicitMarketingConsent;
    const marketingIntent = confirmMarketing;
    const book = trustedBookTitle(payload.book, language, chapterRequested);
    const pageUrl =
      sanitizeMeta(payload.page_url, MAX_PAGE_URL_LENGTH) || siteConfig.url;
    const source = sanitizeMeta(payload.source, MAX_SOURCE_LENGTH) || "website";

    if (
      !email ||
      email.length > MAX_EMAIL_LENGTH ||
      !isValidEmail(email)
    ) {
      console.error("[newsletter] Invalid email:", { email, book, source });
      return jsonFail("Invalid email address.", 400);
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("[newsletter] Missing RESEND_API_KEY");
      return jsonFail("Server configuration error.", 500);
    }

    const resend = getResendClient(resendApiKey);

    let marketingSignupAt: string | undefined;

    try {
      const stored = await upsertContact(resend, {
        email,
        confirmMarketing,
        marketingIntent,
        language: locale,
        source,
        leadMagnet,
        chapterRequested,
      });
      marketingSignupAt = stored.marketingSignupAt;

      if (!stored.stored) {
        console.error("[newsletter] Contact was not stored:", {
          email,
          source,
          chapterRequested,
          marketingIntent,
          confirmMarketing,
        });
      }
    } catch (error) {
      console.error("[newsletter] Contact upsert error:", { error, email });
    }

    const leadText = buildLeadNotificationText({
      email,
      book,
      language,
      pageUrl,
      source,
      leadMagnet,
      marketingIntent,
      confirmMarketing,
      marketingConsent: confirmMarketing ? "true" : "false",
      marketingSignupAt,
      chapterRequested,
    });

    try {
      const leadResult = await resend.emails.send({
        from: RESEND_FROM,
        to: LEAD_TO,
        replyTo: email,
        subject: buildDashboardSubject(
          book,
          language,
          leadMagnet,
          confirmMarketing
        ),
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
        if (confirmMarketing) {
          return jsonFail("Failed to send subscription notification.", 500);
        }
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
      if (confirmMarketing) {
        return jsonFail("Failed to send subscription notification.", 500);
      }
    }

    const sendVisitorEmail =
      chapterRequested || authorsWaitlist || confirmMarketing;

    if (sendVisitorEmail) {
      const readingUrl = chapter1Url(locale);
      let subject: string;
      let textBody: string;
      let bodyHtml: string;
      let signOff: string | undefined;

      if (chapterRequested) {
        const chapterMail = buildChapterConfirmation(book, language, readingUrl);
        subject = chapterMail.subject;
        textBody = `${chapterMail.body}\n${readingUrl}`;
        bodyHtml = `<p style="margin:0 0 24px;font-size:16px;line-height:1.65;">${escapeHtml(chapterMail.body)}</p>
                <p style="margin:0 0 24px;">
                  <a href="${escapeHtml(readingUrl)}" style="display:inline-block;padding:12px 20px;background:#1a1a1a;color:#f7f4ef;text-decoration:none;font-size:15px;letter-spacing:0.04em;">${escapeHtml(chapterMail.cta)}</a>
                </p>
                <p style="margin:0;font-size:14px;line-height:1.65;color:#6b6358;">${escapeHtml(readingUrl)}</p>`;
      } else if (authorsWaitlist) {
        const authorsMail = buildAuthorsWaitlistConfirmation(language);
        subject = authorsMail.subject;
        textBody = authorsMail.text;
        bodyHtml = `<p style="margin:0 0 24px;font-size:16px;line-height:1.65;">${escapeHtml(authorsMail.body)}</p>`;
        signOff = authorsMail.signOff;
      } else {
        const waitlistMail = buildWaitlistConfirmation(book, language);
        subject = waitlistMail.subject;
        textBody = waitlistMail.body;
        bodyHtml = `<p style="margin:0 0 24px;font-size:16px;line-height:1.65;">${escapeHtml(waitlistMail.body)}</p>`;
      }

      try {
        const confirmationResult = await resend.emails.send({
          from: RESEND_FROM,
          to: email,
          subject,
          html: wrapEmailHtml({ language, bodyHtml, signOff }),
          text: textBody,
          ...(confirmMarketing && {
            headers: {
              "List-Unsubscribe": `<${unsubscribeMailto()}>`,
            },
          }),
        });

        if (confirmationResult.error) {
          console.error("[newsletter] Confirmation email failed:", {
            error: confirmationResult.error,
            email,
            book,
            language,
            chapterRequested,
            authorsWaitlist,
            confirmMarketing,
          });
          if (chapterRequested) {
            return jsonFail("Failed to send the chapter email.", 500);
          }
          if (authorsWaitlist) {
            return jsonFail("Failed to send the confirmation email.", 500);
          }
        }
      } catch (error) {
        console.error("[newsletter] Confirmation email request error:", {
          error,
          email,
          book,
          language,
          chapterRequested,
          authorsWaitlist,
          confirmMarketing,
        });
        if (chapterRequested) {
          return jsonFail("Failed to send the chapter email.", 500);
        }
        if (authorsWaitlist) {
          return jsonFail("Failed to send the confirmation email.", 500);
        }
      }
    }

    return jsonOk();
  } catch (error) {
    console.error("[newsletter] Unhandled error:", error);
    return jsonFail("Internal server error.", 500);
  }
}
