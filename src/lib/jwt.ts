import { jwtVerify, SignJWT } from "jose";

import type { JWTPayload } from "@/types/auth";

const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET);

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as JWTPayload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

export async function signToken(payload: JWTPayload) {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    //.setExpirationTime('2h') // Optional
    .sign(secret);
  return jwt;
}
