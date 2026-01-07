import { atom } from "nanostores";
import { decodeJwt } from "jose";

import type { JWTPayload } from "@/types/auth";

export const authStore = atom<JWTPayload | null>(null);

export function initAuth() {
  if (typeof window === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get("token");
  const storageKey = "auth_token";

  // 1. Detect & Extract
  if (tokenFromUrl) {
    console.log("Token found in URL:", tokenFromUrl);
    try {
      // Use jose to decode the token
      const payload = decodeJwt(tokenFromUrl) as JWTPayload;
      console.log("Payload parsed:", payload);

      // 2. Store
      sessionStorage.setItem(storageKey, tokenFromUrl);
      authStore.set(payload);

      // 3. Wipe (Security)
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      console.log("URL wiped");
    } catch (e) {
      console.error("Invalid token format", e);
    }
  } else {
    // 4. Check Storage
    const storedToken = sessionStorage.getItem(storageKey);
    if (storedToken) {
      try {
        const payload = decodeJwt(storedToken) as JWTPayload;
        authStore.set(payload);
      } catch (e) {
        console.error("Invalid stored token", e);
        sessionStorage.removeItem(storageKey);
      }
    }
  }
}
