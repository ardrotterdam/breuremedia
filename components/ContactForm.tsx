"use client";

import { usePathname } from "next/navigation";
import { useId, useState, type FormEvent } from "react";

export type ContactSubjectValue =
  | "pers"
  | "samenwerking"
  | "lezersvraag"
  | "overig";

export interface ContactSubjectOption {
  value: ContactSubjectValue;
  label: string;
}

export interface ContactFormProps {
  language: "NL" | "EN" | "DE";
  nameLabel: string;
  emailLabel: string;
  subjectLabel: string;
  messageLabel: string;
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
  privacy: string;
  subjects: ContactSubjectOption[];
}

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 2000;
const COUNTER_THRESHOLD = 1800;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactForm({
  language,
  nameLabel,
  emailLabel,
  subjectLabel,
  messageLabel,
  submitLabel,
  successMessage,
  errorMessage,
  privacy,
  subjects,
}: ContactFormProps) {
  const pathname = usePathname() ?? "/";
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [messageLength, setMessageLength] = useState(0);
  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();
  const statusId = useId();
  const counterId = useId();

  const submitted = status === "success";
  const isSubmitting = status === "submitting";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitted || isSubmitting) {
      return;
    }

    const form = e.currentTarget;
    const nameField = form.elements.namedItem("name");
    const emailField = form.elements.namedItem("email");
    const subjectField = form.elements.namedItem("subject");
    const messageField = form.elements.namedItem("message");
    const botcheckField = form.elements.namedItem("botcheck");

    if (
      !(nameField instanceof HTMLInputElement) ||
      !(emailField instanceof HTMLInputElement) ||
      !(subjectField instanceof HTMLSelectElement) ||
      !(messageField instanceof HTMLTextAreaElement)
    ) {
      console.error("[contact] A required field is missing from the form.");
      setStatus("error");
      return;
    }

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const subject = subjectField.value;
    const message = messageField.value.trim();
    const botcheck =
      botcheckField instanceof HTMLInputElement && botcheckField.checked;
    const pageUrl =
      typeof window !== "undefined" ? window.location.href : pathname;

    if (!name || name.length > MAX_NAME_LENGTH) {
      setStatus("error");
      nameField.focus();
      return;
    }

    if (!email || email.length > MAX_EMAIL_LENGTH || !isValidEmail(email)) {
      setStatus("error");
      emailField.focus();
      return;
    }

    if (!subject) {
      setStatus("error");
      subjectField.focus();
      return;
    }

    if (
      message.length < MIN_MESSAGE_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      setStatus("error");
      messageField.focus();
      return;
    }

    if (botcheck) {
      setStatus("success");
      form.reset();
      setMessageLength(0);
      return;
    }

    setStatus("submitting");

    const payload = {
      name,
      email,
      subject,
      message,
      language,
      page_url: pageUrl,
      botcheck,
    };

    try {
      const response = await fetch("/api/contact", {
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
        data = raw
          ? (JSON.parse(raw) as { success?: boolean; message?: string })
          : null;
      } catch (parseError) {
        console.error("[contact] Response was not valid JSON:", {
          status: response.status,
          statusText: response.statusText,
          contentType: response.headers.get("content-type"),
          body: raw.slice(0, 500),
          error: parseError,
        });
        setStatus("error");
        return;
      }

      if (response.ok && data?.success === true) {
        setStatus("success");
        form.reset();
        setMessageLength(0);
        return;
      }

      console.error("[contact] Submission rejected:", {
        status: response.status,
        statusText: response.statusText,
        data,
      });
      setStatus("error");
    } catch (error) {
      console.error("[contact] Network or unexpected submit error:", { error });
      setStatus("error");
    }
  }

  const showCounter = messageLength > COUNTER_THRESHOLD;
  const statusText =
    status === "success"
      ? successMessage
      : status === "error"
        ? errorMessage
        : "";

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
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
      {submitted ? null : (
        <>
          <div className="form-field">
            <label htmlFor={nameId}>{nameLabel}</label>
            <input
              type="text"
              id={nameId}
              name="name"
              required
              maxLength={MAX_NAME_LENGTH}
              autoComplete="name"
              aria-invalid={status === "error" || undefined}
            />
          </div>
          <div className="form-field">
            <label htmlFor={emailId}>{emailLabel}</label>
            <input
              type="email"
              id={emailId}
              name="email"
              required
              maxLength={MAX_EMAIL_LENGTH}
              autoComplete="email"
              aria-invalid={status === "error" || undefined}
            />
          </div>
          <div className="form-field">
            <label htmlFor={subjectId}>{subjectLabel}</label>
            <select
              id={subjectId}
              name="subject"
              required
              defaultValue=""
              aria-invalid={status === "error" || undefined}
            >
              <option value="" disabled>
                {subjectLabel}
              </option>
              {subjects.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor={messageId}>{messageLabel}</label>
            <textarea
              id={messageId}
              name="message"
              required
              minLength={MIN_MESSAGE_LENGTH}
              maxLength={MAX_MESSAGE_LENGTH}
              rows={8}
              aria-invalid={status === "error" || undefined}
              aria-describedby={showCounter ? counterId : undefined}
              onChange={(event) => setMessageLength(event.target.value.length)}
            />
            {showCounter ? (
              <p
                id={counterId}
                className="contact-form-counter"
                aria-live="polite"
              >
                {messageLength} / {MAX_MESSAGE_LENGTH}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn btn-submit btn-shine"
            disabled={isSubmitting}
          >
            {submitLabel}
          </button>
        </>
      )}
      <p
        id={statusId}
        className={`form-message${statusText ? ` ${status === "success" ? "success" : status === "error" ? "error" : ""}` : ""}`}
        role="status"
        aria-live="polite"
      >
        {statusText}
      </p>
      {submitted ? null : <p className="form-privacy">{privacy}</p>}
    </form>
  );
}
