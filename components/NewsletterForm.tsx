"use client";

import { usePathname } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { localeFromPathname } from "@/lib/i18n";

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
  /** Optional override for the Web3Forms subject line. */
  subject?: string;
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
};

type NewsletterFormProps = {
  /** Herkomst van de inschrijving, wordt meegestuurd naar Web3Forms. */
  source?: string;
  /** Boektitel voor metadata; standaard "Algemeen". */
  book?: string;
  /** Compacte variant voor gebruik binnen tekstkolommen. */
  compact?: boolean;
  /** Overschrijf losse teksten (bijv. Engels op /en-pagina's). */
  copy?: Partial<NewsletterFormCopy>;
};

function isGeneralBook(book: string): boolean {
  const normalized = book.trim().toLowerCase();
  return (
    normalized === "" ||
    normalized === "algemeen" ||
    normalized === "general"
  );
}

function buildSuccessMessage(book: string, language: "NL" | "EN"): string {
  if (isGeneralBook(book)) {
    return language === "EN"
      ? "Thank you for subscribing! As soon as there is news about new books and releases from Breure Media, you'll be the first to know."
      : "Bedankt voor je inschrijving! Zodra er nieuws is over nieuwe boeken en publicaties van Breure Media, hoor je als eerste van ons.";
  }

  return language === "EN"
    ? `Thank you for subscribing! You're on the list. As soon as there is news about ${book}, you'll be the first to know.`
    : `Bedankt voor je inschrijving! Je staat nu op de wachtlijst. Zodra er nieuws is over ${book}, hoor je als eerste van ons.`;
}

function buildSubject(book: string, language: "NL" | "EN"): string {
  if (language === "EN") {
    return `New sign-up: ${book} (EN)`;
  }
  return `Nieuwe inschrijving: ${book} (NL)`;
}

export function NewsletterForm({
  source,
  book = "Algemeen",
  compact = false,
  copy,
}: NewsletterFormProps) {
  const t: NewsletterFormCopy = { ...dutchCopy, ...copy };
  const pathname = usePathname() ?? "/";
  const locale = localeFromPathname(pathname);
  const language = locale === "en" ? "EN" : "NL";
  const successMessage = t.success ?? buildSuccessMessage(book, language);
  const subject = t.subject ?? buildSubject(book, language);

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "info" | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailId = useId();
  const messageId = useId();

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const botcheckInput = form.elements.namedItem(
      "botcheck"
    ) as HTMLInputElement;
    const email = emailInput.value.trim();
    const pageUrl =
      typeof window !== "undefined" ? window.location.href : pathname;

    if (!email || !isValidEmail(email)) {
      setMessage(t.invalidEmail);
      setStatus("error");
      emailInput.focus();
      return;
    }

    if (botcheckInput.checked) {
      setMessage(successMessage);
      setStatus("success");
      form.reset();
      return;
    }

    setMessage(t.submitting);
    setStatus("info");
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "da837bfb-4e7b-41fd-8184-0ca43bea55d5",
          email,
          subject,
          from_name: "Breure Media website",
          book,
          language,
          page_url: pageUrl,
          source: source ?? "website",
          botcheck: botcheckInput.checked,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(successMessage);
        setStatus("success");
        form.reset();
      } else {
        setMessage(t.error);
        setStatus("error");
      }
    } catch {
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
      <input type="hidden" name="subject" value={subject} />
      <input type="hidden" name="book" value={book} />
      <input type="hidden" name="language" value={language} />
      <input type="hidden" name="page_url" value={pathname} />
      <input
        type="checkbox"
        name="botcheck"
        className="visually-hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
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
      <p
        id={messageId}
        className={`form-message${status ? ` ${status}` : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
      <p className="form-privacy">{t.privacy}</p>
    </form>
  );
}
