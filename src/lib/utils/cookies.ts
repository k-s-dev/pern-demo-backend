import { parseSetCookie } from "cookie";

export function extractCookiefromSetCookies(
  setCookies: string[],
  name: string,
): string | null | undefined {
  setCookies.forEach((setCookie) => {
    const cookie = parseSetCookie(setCookie);
    if (cookie.name === name) {
      return cookie.value;
    }
  });

  return null;
}
