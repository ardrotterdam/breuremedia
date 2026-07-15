"use client";

import { useId, useState, type FormEvent } from "react";

type NewsletterFormProps = {
  /** Herkomst van de inschrijving, wordt meegestuurd naar Web3Forms. */
  source?: string;
  /** Compacte variant voor gebruik binnen tekstkolommen. */
  compact?: boolean;
};

export function NewsletterForm({ source, compact = false }: NewsletterFormProps) {
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
      setMessage("Voer een geldig e-mailadres in.");
      setStatus("error");
      emailInput.focus();
      return;
    }

    if (botcheckInput.checked) {
      setMessage("Dank u. U ontvangt bericht zodra het boek verschijnt.");
      setStatus("success");
      form.reset();
      return;
    }

    setMessage("Even geduld…");
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
          subject: "Nieuwe intekening — Schaduwen over Domburg",
          from_name: "Breure Media website",
          source: source ?? "website",
          botcheck: botcheckInput.checked,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("Dank u. U ontvangt bericht zodra het boek verschijnt.");
        setStatus("success");
        form.reset();
      } else {
        setMessage(
          "Er ging iets mis. Probeer het later opnieuw of mail naar info@breuremedia.com."
        );
        setStatus("error");
      }
    } catch {
      setMessage(
        "Er ging iets mis. Probeer het later opnieuw of mail naar info@breuremedia.com."
      );
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
          E-mailadres
        </label>
        <input
          type="email"
          id={emailId}
          name="email"
          placeholder="jouw@email.nl"
          required
          autoComplete="email"
          aria-invalid={status === "error" || undefined}
          aria-describedby={messageId}
        />
        <button
          type="submit"
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          Ontvang bericht zodra het boek verschijnt
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
      <p className="form-privacy">
        Uw e-mailadres wordt uitsluitend gebruikt voor berichten over
        publicaties van Breure Media. Geen spam, uitschrijven kan altijd.
      </p>
    </form>
  );
}
