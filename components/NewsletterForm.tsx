"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import {
  englishNewsletterCopy,
  germanNewsletterCopy,
  localeFromPathname,
  type Locale,
} from "@/lib/i18n";

export interface NewsletterFormCopy {
  emailLabel: string;
  placeholder: string;
  submit: string;
  submitting: string;
  /** Optional override; when omitted, success text is derived from `book` + locale. */
  success?: string;
  invalidEmail: string;
  error: string;
  privacy: string;
  marketingConsent: string;
}

const dutchCopy: NewsletterFormCopy = {
  emailLabel: "E-mailadres",
  placeholder: "jouw@email.nl",
  submit: "HOUD MIJ OP DE HOOGTE",
  submitting: "Even geduld…",
  invalidEmail: "Voer een geldig e-mailadres in.",
  error:
    "Er ging iets mis. Probeer het later opnieuw of mail naar info@breuremedia.com.",
  privacy:
    "Je inschrijving is volledig vrijblijvend. We gebruiken je e-mailadres alleen voor berichten van Breure Media. Geen spam, en uitschrijven kan altijd.",
  marketingConsent:
    "Houd mij ook op de hoogte van de verschijningsdatum en nieuws over het boek.",
};

const copyByLocale: Record<Locale, NewsletterFormCopy> = {
  nl: dutchCopy,
  en: englishNewsletterCopy,
  de: germanNewsletterCopy,
};

const privacyLink: Record<Locale, { href: string; label: string }> = {
  nl: { href: "/privacy", label: "Privacybeleid" },
  en: { href: "/en/privacy", label: "Privacy policy" },
  de: { href: "/de/datenschutz", label: "Datenschutz" },
};

type NewsletterFormProps = {
  /** Origin of the signup, sent with the request. */
  source?: string;
  /** Book title for metadata; default "Algemeen". */
  book?: string;
  /** Compact variant for text columns. */
  compact?: boolean;
  /** Override individual strings (e.g. English on /en pages). */
  copy?: Partial<NewsletterFormCopy>;
  /** When set, the API treats this as a lead magnet rather than a newsletter signup. */
  leadMagnet?: "chapter-1" | "authors-waitlist";
  /** Show an optional checkbox for future book/news emails. */
  showMarketingConsent?: boolean;
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

function buildSuccessMessage(book: string, locale: Locale): string {
  if (isGeneralBook(book)) {
    if (locale === "en") {
      return "Thank you for subscribing! As soon as there is news about new books and releases from Breure Media, you'll be the first to know.";
    }
    if (locale === "de") {
      return "Danke für Ihre Anmeldung. Sobald es Neuigkeiten zu Büchern und Veröffentlichungen von Breure Media gibt, hören Sie zuerst von uns.";
    }
    return "Bedankt voor je inschrijving! Zodra er nieuws is over nieuwe boeken en publicaties van Breure Media, hoor je als eerste van ons.";
  }

  if (locale === "en") {
    return `Thank you for subscribing! You're on the list. As soon as there is news about ${book}, you'll be the first to know.`;
  }
  if (locale === "de") {
    return `Danke für Ihre Anmeldung. Sie stehen auf der Liste. Sobald es Neuigkeiten zu ${book} gibt, hören Sie zuerst von uns.`;
  }
  return `Bedankt voor je inschrijving! Je staat nu op de wachtlijst. Zodra er nieuws is over ${book}, hoor je als eerste van ons.`;
}

export function NewsletterForm({
  source,
  book = "Algemeen",
  compact = false,
  copy,
  leadMagnet,
  showMarketingConsent = false,
}: NewsletterFormProps) {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPathname(pathname);
  const t: NewsletterFormCopy = { ...copyByLocale[locale], ...copy };
  const language = locale.toUpperCase();
  const successMessage = t.success ?? buildSuccessMessage(book, locale);

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "info" | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailId = useId();
  const messageId = useId();
  const consentId = useId();

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const submitted = status === "success";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitted || isSubmitting) {
      return;
    }
    const form = e.currentTarget;
    const emailField = form.elements.namedItem("email");
    const botcheckField = form.elements.namedItem("botcheck");
    const consentField = form.elements.namedItem("marketingConsent");

    if (!(emailField instanceof HTMLInputElement)) {
      console.error("[newsletter] Email input is missing from the form.");
      setMessage(t.error);
      setStatus("error");
      return;
    }

    const email = emailField.value.trim();
    const botcheck =
      botcheckField instanceof HTMLInputElement && botcheckField.checked;
    const marketingConsent = showMarketingConsent
      ? consentField instanceof HTMLInputElement && consentField.checked
      : !leadMagnet;
    const pageUrl =
      typeof window !== "undefined" ? window.location.href : pathname;

    if (!email || !isValidEmail(email)) {
      setMessage(t.invalidEmail);
      setStatus("error");
      emailField.focus();
      return;
    }

    if (botcheck) {
      setMessage(successMessage);
      setStatus("success");
      form.reset();
      return;
    }

    setMessage(t.submitting);
    setStatus("info");
    setIsSubmitting(true);

    const payload = {
      email,
      book,
      language,
      page_url: pageUrl,
      source: source ?? "website",
      botcheck,
      leadMagnet,
      marketingConsent,
    };

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const raw = await response.text();
      let data: { success?: boolean; message?: string } | null = null;

      try {
        data = raw ? (JSON.parse(raw) as { success?: boolean; message?: string }) : null;
      } catch (parseError) {
        console.error("[newsletter] Response was not valid JSON:", {
          status: response.status,
          statusText: response.statusText,
          contentType: response.headers.get("content-type"),
          body: raw.slice(0, 500),
          error: parseError,
          payload,
        });
        setMessage(t.error);
        setStatus("error");
        return;
      }

      if (response.ok && data?.success === true) {
        setMessage(successMessage);
        setStatus("success");
        form.reset();
        return;
      }

      console.error("[newsletter] Submission rejected:", {
        status: response.status,
        statusText: response.statusText,
        data,
        payload,
      });
      setMessage(t.error);
      setStatus("error");
    } catch (error) {
      console.error("[newsletter] Network or unexpected submit error:", {
        error,
        payload,
      });
      setMessage(t.error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className={`newsletter-form${compact ? " newsletter-form--compact" : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <input type="hidden" name="book" value={book} />
      <input type="hidden" name="language" value={language} />
      <input type="hidden" name="page_url" value={pathname} />
      {leadMagnet ? <input type="hidden" name="leadMagnet" value={leadMagnet} /> : null}
      <input
        type="checkbox"
        name="botcheck"
        className="visually-hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      {submitted ? null : (
        <>
          <div className="form-group">
            <label htmlFor={emailId} className="visually-hidden">
              {t.emailLabel}
            </label>
            <input
              type="email"
              id={emailId}
              name="email"
              placeholder={t.placeholder}
              required
              autoComplete="email"
              aria-invalid={status === "error" || undefined}
              aria-describedby={messageId}
            />
            <button
              type="submit"
              className="btn btn-submit btn-shine"
              disabled={isSubmitting}
            >
              {t.submit}
            </button>
          </div>
          {showMarketingConsent ? (
            <label className="form-consent" htmlFor={consentId}>
              <input
                type="checkbox"
                id={consentId}
                name="marketingConsent"
                value="true"
              />
              <span>{t.marketingConsent}</span>
            </label>
          ) : null}
        </>
      )}
      <p
        id={messageId}
        className={`form-message${status ? ` ${status}` : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
      <p className="form-privacy">
        {t.privacy}{" "}
        <Link href={privacyLink[locale].href}>
          {privacyLink[locale].label}
        </Link>
      </p>
    </form>
  );
}
