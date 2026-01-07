import { atom } from "nanostores";
import type { GuestbookMessage } from "@/types/guestbook";

export const $guestbookMessages = atom<GuestbookMessage[]>([]);

export function addMessage(message: GuestbookMessage) {
  $guestbookMessages.set([...$guestbookMessages.get(), message]);
}

export function setMessages(messages: GuestbookMessage[]) {
  $guestbookMessages.set(messages);
}
