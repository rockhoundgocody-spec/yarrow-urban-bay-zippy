import type { CallToolResult } from "./types.ts";

export function isLoginRequired(result: CallToolResult): boolean {
  return result.ok === false && result.loginRequired === true;
}

export function redirectToLoginIfRequired(result: CallToolResult): boolean {
  if (!isLoginRequired(result)) return false;
  const url = result.loginUrl;
  if (!url) return false;
  if (typeof window === "undefined") return false;

  // Security: Validate protocol to prevent DOM XSS via javascript: or data: URIs
  try {
    const parsed = new URL(url, window.location.origin);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }
    window.location.assign(parsed.href);
    return true;
  } catch {
    return false;
  }
}
