import { atom } from "nanostores";

export type JWTPayload = {
  uid: string; // UUID v4 del invitado
  name: string; // Nombre para mostrar (ej. "Familia González")
  pax: number; // Max seats allowed
  exp?: number; // Timestamp UNIX
  iat?: number; // Issued At
};

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
      // Basic decoding to verify structure (Signature verification happens on backend)
      const parts = tokenFromUrl.split(".");
      if (parts.length !== 3) {
        console.error(
          "Invalid token structure. Expected 3 parts, got",
          parts.length
        );
        // Don't return here, maybe it's a legacy token or just malformed, but let's try to handle or ignore
      }

      // The payload is the second part
      const base64Url = parts[1] || tokenFromUrl.split(".")[1];
      if (!base64Url) throw new Error("No payload found");

      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const payload: JWTPayload = JSON.parse(jsonPayload);
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
        const parts = storedToken.split(".");
        const base64Url = parts[1];
        if (!base64Url) throw new Error("No payload found in stored token");

        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          window
            .atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        const payload: JWTPayload = JSON.parse(jsonPayload);
        authStore.set(payload);
      } catch (e) {
        console.error("Invalid stored token", e);
        sessionStorage.removeItem(storageKey);
      }
    }
  }
}
