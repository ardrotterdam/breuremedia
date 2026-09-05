import type { Resend } from "resend";

const PROPERTY_KEYS = [
  "language",
  "source",
  "lead_magnet",
  "chapter_requested",
  "marketing_intent",
  "marketing_consent",
  "marketing_signup_at",
] as const;

export interface UpsertContactInput {
  email: string;
  /**
   * Explicit waitlist/newsletter signup (`unsubscribed: false`).
   * Not a double-opt-in confirmation. Chapter 1 never sets this.
   */
  confirmMarketing: boolean;
  /** Stored interest flag; not a marketing subscription by itself. */
  marketingIntent: boolean;
  language: string;
  source: string;
  leadMagnet: string;
  chapterRequested: boolean;
}

let propertiesReady = false;

async function ensureContactProperties(resend: Resend): Promise<void> {
  if (propertiesReady) {
    return;
  }

  const listed = await resend.contactProperties.list();
  if (listed.error) {
    console.error("[contacts] Could not list contact properties:", listed.error);
    return;
  }

  const existing = new Set(
    (listed.data?.data ?? []).map((property) => property.key)
  );

  for (const key of PROPERTY_KEYS) {
    if (existing.has(key)) {
      continue;
    }

    const created = await resend.contactProperties.create({
      key,
      type: "string",
      fallbackValue: null,
    });

    if (created.error) {
      console.error("[contacts] Could not create contact property:", {
        key,
        error: created.error,
      });
    }
  }

  propertiesReady = true;
}

type StoredProperties = {
  language: string;
  source: string;
  lead_magnet: string;
  chapter_requested: string;
  marketing_intent: string;
  marketing_consent?: string;
  marketing_signup_at?: string;
};

type ExistingConsentState = {
  signupAt?: string;
  consent?: string;
  intent?: string;
};

function readStringProperty(
  properties:
    | Record<
        string,
        { type: "string"; value: string } | { type: "number"; value: number }
      >
    | undefined,
  key: string
): string | undefined {
  const raw = properties?.[key];
  if (!raw || raw.type !== "string") {
    return undefined;
  }
  const value = raw.value.trim();
  return value.length > 0 ? value : undefined;
}

function contactProperties(
  input: UpsertContactInput,
  existing?: ExistingConsentState
): StoredProperties {
  const existingConsentTrue = existing?.consent === "true";
  const existingIntentTrue = existing?.intent === "true";
  const properties: StoredProperties = {
    language: input.language.toLowerCase(),
    source: input.source,
    lead_magnet: input.leadMagnet,
    chapter_requested: input.chapterRequested ? "true" : "false",
    marketing_intent:
      (input.marketingIntent || existingIntentTrue) ? "true" : "false",
  };

  if (input.confirmMarketing || existingConsentTrue) {
    properties.marketing_consent = "true";
  } else if (existing?.consent === "false") {
    properties.marketing_consent = "false";
  } else if (!existing) {
    properties.marketing_consent = "false";
  }

  if (input.confirmMarketing) {
    properties.marketing_signup_at =
      existing?.signupAt ?? new Date().toISOString();
  } else if (existing?.signupAt) {
    properties.marketing_signup_at = existing.signupAt;
  }

  return properties;
}

/**
 * Store the visitor in Resend Contacts.
 * `unsubscribed: false` means they used the waitlist/newsletter form.
 * Chapter-only contacts stay `unsubscribed: true`.
 * An existing subscriber is never opted out by a later request without consent.
 * Historical contacts without `marketing_consent` stay unknown; this request
 * does not backfill them as consented or declined.
 */
export async function upsertContact(
  resend: Resend,
  input: UpsertContactInput
): Promise<{
  stored: boolean;
  existing: boolean;
  marketingSignupAt?: string;
}> {
  await ensureContactProperties(resend);

  const createdProperties = contactProperties(input);
  const created = await resend.contacts.create({
    email: input.email,
    unsubscribed: !input.confirmMarketing,
    properties: createdProperties,
  });

  if (!created.error) {
    return {
      stored: true,
      existing: false,
      marketingSignupAt: createdProperties.marketing_signup_at,
    };
  }

  const existing = await resend.contacts.get({ email: input.email });

  if (existing.data) {
    const unsubscribed = input.confirmMarketing
      ? false
      : existing.data.unsubscribed;
    const existingState: ExistingConsentState = {
      signupAt: readStringProperty(
        existing.data.properties,
        "marketing_signup_at"
      ),
      consent: readStringProperty(existing.data.properties, "marketing_consent"),
      intent: readStringProperty(existing.data.properties, "marketing_intent"),
    };
    const updatedProperties = contactProperties(input, existingState);

    const updated = await resend.contacts.update({
      email: input.email,
      unsubscribed,
      properties: updatedProperties,
    });

    if (updated.error) {
      console.error("[contacts] Update failed:", {
        error: updated.error,
        email: input.email,
      });
      return { stored: false, existing: true };
    }

    return {
      stored: true,
      existing: true,
      marketingSignupAt: updatedProperties.marketing_signup_at,
    };
  }

  const retryProperties = contactProperties(input);
  const retry = await resend.contacts.create({
    email: input.email,
    unsubscribed: !input.confirmMarketing,
    properties: retryProperties,
  });

  if (retry.error) {
    console.error("[contacts] Create failed:", {
      error: created.error,
      retryError: retry.error,
      email: input.email,
    });
    return { stored: false, existing: false };
  }

  return {
    stored: true,
    existing: false,
    marketingSignupAt: retryProperties.marketing_signup_at,
  };
}
