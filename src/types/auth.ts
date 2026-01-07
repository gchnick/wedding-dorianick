export type JWTPayload = {
  uid: string; // UUID v4 del invitado
  name: string; // Nombre para mostrar (ej. "Familia González")
  pax: number; // Max seats allowed (Validación crítica en Backend)
  exp?: number; // Timestamp UNIX (Opcional)
  iat?: number; // Issued At
};
