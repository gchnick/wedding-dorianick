export type LeafColor = "turquoise" | "mint" | "cream";

export type GuestbookMessage = {
  id: string;
  guestName: string;
  message: string;
  leafColor: LeafColor;
  createdAt: string;
};

export type CreateGuestbookMessageInput = {
  guestName: string;
  message: string;
};

export type LeafPosition = {
  x: number;
  y: number;
  rotation: number;
};
