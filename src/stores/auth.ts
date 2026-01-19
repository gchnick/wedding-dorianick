import { atom } from "nanostores";

export type User = {
  id: string;
  name: string;
  confirmedGuests: number;
  maxGuests: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
};

export const authStore = atom<User | null>(null);

export function initAuth() {
  // In the new architecture, the server handles auth via cookie and middleware.
  // The client store is hydrated from a global window variable or similar mechanism
  // if we need it in client components.
  // For now, we'll check for a meta tag or a global var injected by the layout.

  // Example: <meta name="user-data" content='{...}' />
  if (typeof window !== "undefined") {
    const userMeta = document.querySelector('meta[name="user-data"]');
    if (userMeta) {
      try {
        const content = userMeta.getAttribute("content");
        if (content) {
          const user = JSON.parse(content);
          authStore.set(user);
        }
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }
}
