import { SignJWT, jwtVerify } from "jose";

export type GuestPayload = {
  id: string;
  name: string;
  confirmedGuests: number;
  maxGuests: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
};

const JWT_SECRET = import.meta.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

// Convert secret string to Uint8Array for jose
const secretKey = new TextEncoder().encode(JWT_SECRET);

/**
 * Creates a signed JWT token for a guest
 * @param guest Guest data to encode in the token
 * @returns Signed JWT string
 */
export async function createGuestToken(guest: GuestPayload): Promise<string> {
  const token = await new SignJWT({
    id: guest.id,
    name: guest.name,
    confirmedGuests: guest.confirmedGuests,
    maxGuests: guest.maxGuests,
    status: guest.status,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d") // 30 days
    .sign(secretKey);

  return token;
}

/**
 * Verifies a JWT token and extracts guest data
 * @param token JWT string to verify
 * @returns Guest payload if valid, null if invalid or expired
 */
export async function verifyGuestToken(
  token: string
): Promise<GuestPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);

    // Validate payload structure
    if (
      typeof payload.id === "string" &&
      typeof payload.name === "string" &&
      typeof payload.confirmedGuests === "number" &&
      typeof payload.maxGuests === "number" &&
      typeof payload.status === "string" &&
      (payload.status === "PENDING" ||
        payload.status === "ACCEPTED" ||
        payload.status === "REJECTED")
    ) {
      return {
        id: payload.id,
        name: payload.name,
        confirmedGuests: payload.confirmedGuests,
        maxGuests: payload.maxGuests,
        status: payload.status,
      };
    }

    return null;
  } catch (error) {
    // Token invalid, expired, or malformed
    console.error("JWT verification failed:", error);
    return null;
  }
}
