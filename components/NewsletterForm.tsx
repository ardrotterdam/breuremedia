"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "info" | "">("");

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const email = emailInput.value.trim();

    if (!email || !isValidEmail(email)) {
      setMessage("Voer een geldig e-mailadres in.");
      setStatus("error");
      emailInput.focus();
      return;
    }

    setMessage(
      "De nieuwsbrief is nog niet actief. Uw e-mailadres is niet opgeslagen."
    );
    setStatus("info");
    form.reset();
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="email" className="visually-hidden">
          E-mailadres
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="jouw@email.nl"
          required
          autoComplete="email"
        />
        <button type="submit" className="btn btn-secondary">
          Inschrijven
        </button>
      </div>
      <p
        className={`form-message${status ? ` ${status}` : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
      <p className="form-privacy">
        De nieuwsbrief is nog niet actief. Er worden momenteel geen
        e-mailadressen opgeslagen.
      </p>
    </form>
  );
}
