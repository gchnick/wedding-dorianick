/// <reference path="../.astro/types.d.ts" />

type User = {
  id: string;
  name: string;
  confirmedGuests: number;
  maxGuests: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
};

declare namespace App {
  interface Locals {
    user?: User;
  }
}
