import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

export const RESEND_FROM = "Breure Media <wachtlijst@breuremedia.com>";
export const LEAD_TO = "info@breuremedia.com";

export function getResendClient(apiKey: string): Resend {
  return new Resend(apiKey);
}

export function unsubscribeMailto(): string {
  return `mailto:${siteConfig.email}?subject=unsubscribe`;
}
