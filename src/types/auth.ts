export type JWTPayload = {
  id: string; // Guest ID (5 chars, NanoID)
  name: string; // Nombre para mostrar (ej. "Familia González")
  confirmedGuests: number; // Número de invitados confirmados
  maxGuests: number; // Max seats allowed (Validación crítica en Backend)
  status: "PENDING" | "ACCEPTED" | "REJECTED"; // Estado de la invitación
  exp?: number; // Timestamp UNIX (Opcional, manejado por jose)
  iat?: number; // Issued At (manejado por jose)
};
