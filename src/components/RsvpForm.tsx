import { useState } from "react";
import confetti from "canvas-confetti";
import { useStore } from "@nanostores/react";

import { authStore } from "@/stores/auth";

export function RsvpForm() {
  const auth = useStore(authStore);
  const [status, setStatus] = useState<"PENDING" | "ACCEPTED" | "REJECTED">(
    "PENDING"
  );
  const [loading, setLoading] = useState(false);

  const handleRsvp = async (response: "ACCEPTED" | "REJECTED") => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStatus(response);
      setLoading(false);
      if (response === "ACCEPTED") {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#40E0D0", "#98FB98", "#FFFFFF"],
        });
      }
    }, 1000);
  };

  if (!auth) {
    return (
      <div className="text-center py-12 px-4 bg-neutral-50 rounded-lg shadow-sm max-w-md mx-auto mt-8">
        <p className="font-body font-light text-neutral-mid">
          Por favor, escanea el código QR de tu invitación para confirmar
          asistencia.
        </p>
      </div>
    );
  }

  if (status === "ACCEPTED") {
    return (
      <div className="text-center py-12 px-4 bg-secondary-accent/20 rounded-lg border border-secondary-accent max-w-md mx-auto mt-8">
        <h3 className="font-display text-2xl text-neutral-dark mb-2">
          ¡Gracias por confirmar!
        </h3>
        <p className="font-body text-neutral-dark">
          Nos alegra mucho que nos acompañes, {auth.name}.
        </p>
      </div>
    );
  }

  if (status === "REJECTED") {
    return (
      <div className="text-center py-12 px-4 bg-neutral-100 rounded-lg max-w-md mx-auto mt-8">
        <h3 className="font-display text-xl text-neutral-dark mb-2">
          Entendemos
        </h3>
        <p className="font-body text-neutral-mid">
          Te extrañaremos, {auth.name}. Gracias por avisarnos.
        </p>
      </div>
    );
  }

  return (
    <div id="rsvp" className="max-w-2xl mx-auto py-16 px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-primary-accent">
        <div className="text-center mb-8">
          <span className="inline-block bg-secondary-accent/30 text-neutral-dark px-3 py-1 rounded-full text-sm font-semibold mb-4">
            RSVP
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-neutral-dark mb-2">
            Hola, {auth.name}
          </h2>
          <p className="text-neutral-mid">
            Tienes{" "}
            <span className="font-bold text-neutral-dark">
              {auth.pax} cupos
            </span>{" "}
            reservados.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:justify-center">
          <button
            onClick={() => handleRsvp("ACCEPTED")}
            disabled={loading}
            className="bg-primary-accent hover:bg-primary-accent/90 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Confirmando..." : "¡Sí, acepto!"}
          </button>

          <button
            onClick={() => handleRsvp("REJECTED")}
            disabled={loading}
            className="bg-transparent border-2 border-neutral-200 text-neutral-mid hover:border-neutral-400 hover:text-neutral-dark font-semibold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Lo siento, no podré
          </button>
        </div>
      </div>
    </div>
  );
}
