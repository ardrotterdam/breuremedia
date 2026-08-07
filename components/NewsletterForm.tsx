"use client";

import { useId, useState, type FormEvent } from "react";

export interface NewsletterFormCopy {
  emailLabel: string;
  placeholder: string;
  submit: string;
  submitting: string;
  success: string;
  invalidEmail: string;
  error: string;
  privacy: string;
  /** Subject line sent to Web3Forms. */
  subject: string;
}

const dutchCopy: NewsletterFormCopy = {
  emailLabel: "E-mailadres",
  placeholder: "jouw@email.nl",
  submit: "HOUD MIJ OP DE HOOGTE",
  submitting: "Even geduld…",
  success:
    "Bedankt voor je inschrijving! Je staat nu op de wachtlijst. Zodra er nieuws is over Schaduwen over Domburg, hoor je als eerste van ons.",
  invalidEmail: "Voer een geldig e-mailadres in.",
  error:
    "Er ging iets mis. Probeer het later opnieuw of mail naar info@breuremedia.com.",
  privacy:
    "Je inschrijving is volledig vrijblijvend. We gebruiken je e-mailadres alleen voor berichten van Breure Media. Geen spam, en uitschrijven kan altijd.",
  subject: "Nieuwe intekening — Schaduwen over Domburg",
};

type NewsletterFormProps = {
  /** Herkomst van de inschrijving, wordt meegestuurd naar Web3Forms. */
  source?: string;
  /** Compacte variant voor gebruik binnen tekstkolommen. */
  compact?: boolean;
  /** Overschrijf losse teksten (bijv. Engels op /en-pagina's). */
  copy?: Partial<NewsletterFormCopy>;
};

export function NewsletterForm({
  source,
  compact = false,
  copy,
}: NewsletterFormProps) {
  const t: NewsletterFormCopy = { ...dutchCopy, ...copy };
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

    if (!email || !isValidEmail(email)) {
      setMessage(t.invalidEmail);
      setStatus("error");
      emailInput.focus();
      return;
    }

    if (botcheckInput.checked) {
      setMessage(t.success);
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
          subject: t.subject,
          from_name: "Breure Media website",
          source: source ?? "website",
          botcheck: botcheckInput.checked,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(t.success);
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
