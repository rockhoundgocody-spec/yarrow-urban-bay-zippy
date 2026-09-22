/** Sanitizes redirect URLs to prevent open redirects and script execution (XSS). */
export function sanitizeRedirectUrl(url: unknown, fallback = "/"): string {
  if (typeof url !== "string") return fallback;
  const trimmed = url.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.includes("\\")) {
    return fallback;
  }
  try {
    const resolved = new URL(trimmed, "https://preview.invalid");
    return resolved.origin === "https://preview.invalid" ? trimmed : fallback;
  } catch {
    return fallback;
  }
}
