import type { CallToolResult } from "./types.ts";

export function isLoginRequired(result: CallToolResult): boolean {
  return result.ok === false && result.loginRequired === true;
}

/**
 * Validates that a redirect URL uses a safe protocol (http/https or relative path).
 * Prevents DOM-based XSS via javascript: or data: URIs and protocol-relative open redirects.
 */
export function isSafeRedirectUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (trimmed.startsWith("/")) {
    return !trimmed.startsWith("//") && !trimmed.includes("\\");
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function redirectToLoginIfRequired(result: CallToolResult): boolean {
  if (!isLoginRequired(result)) return false;
  const url = result.loginUrl;
  if (!url || !isSafeRedirectUrl(url)) return false;
  if (typeof window === "undefined") return false;
  window.location.assign(url.trim());
  return true;
}
