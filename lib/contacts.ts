import type { Resend } from "resend";

const PROPERTY_KEYS = [
  "language",
  "source",
  "lead_magnet",
  "chapter_requested",
  "marketing_intent",
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
  marketing_signup_at?: string;
};

function readExistingSignupAt(
  properties:
    | Record<
        string,
        { type: "string"; value: string } | { type: "number"; value: number }
      >
    | undefined
): string | undefined {
  const raw = properties?.marketing_signup_at;
  if (!raw || raw.type !== "string") {
    return undefined;
  }
  const value = raw.value.trim();
  return value.length > 0 ? value : undefined;
}

function contactProperties(
  input: UpsertContactInput,
  existingSignupAt?: string
): StoredProperties {
  const properties: StoredProperties = {
    language: input.language.toLowerCase(),
    source: input.source,
    lead_magnet: input.leadMagnet,
    chapter_requested: input.chapterRequested ? "true" : "false",
    marketing_intent: input.marketingIntent ? "true" : "false",
  };

  // Waitlist/newsletter signup time only. Not a double-opt-in confirmation.
  if (input.confirmMarketing) {
    properties.marketing_signup_at =
      existingSignupAt ?? new Date().toISOString();
  }

  return properties;
}

/**
 * Store the visitor in Resend Contacts.
 * `unsubscribed: false` means they used the waitlist/newsletter form.
 * Chapter-only contacts stay `unsubscribed: true`.
 * An existing subscriber is never opted out by a later chapter-only request.
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
    const existingSignupAt = readExistingSignupAt(existing.data.properties);
    const updatedProperties = contactProperties(input, existingSignupAt);

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
