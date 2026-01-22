import { Anchor } from "@/components/react/Anchor";
import { useRsvpForm } from "@/hooks/useRsvpForm";

export function RsvpForm() {
  const { auth, status, loading, handleRsvp } = useRsvpForm();

  if (!auth) {
    return (
      <Anchor id="rsvp">
        <div className="text-center py-12 px-4 bg-neutral-50 rounded-lg shadow-sm max-w-md mx-auto my-8">
          <p className="font-body font-light text-neutral-mid">
            Por favor, escanea el código QR de tu invitación para confirmar
            asistencia.
          </p>
        </div>
      </Anchor>
    );
  }

  if (status === "ACCEPTED") {
    return (
      <Anchor id="rsvp">
        <div
          className="max-w-2xl mx-auto py-16 px-4"
          aria-labelledby="rsvp-title"
        >
          <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-primary-accent text-center">
            <div className="py-4">
              <h3 className="font-display text-3xl md:text-4xl text-neutral-dark mb-4">
                ¡Gracias por confirmar!
              </h3>
              <p className="font-body text-lg text-neutral-dark">
                Nos alegra mucho que nos acompañes, {auth.name}.
              </p>
            </div>
            <button
              onClick={() => handleRsvp("REJECTED")}
              disabled={loading}
              className="mt-6 text-sm text-neutral-400 hover:text-neutral-600 underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Cambiar respuesta a no asistiré"
            >
              {loading ? "Actualizando..." : "¿Cambió tu situación? Actualiza tu respuesta"}
            </button>
          </div>
        </div>
      </Anchor>
    );
  }

  if (status === "REJECTED") {
    return (
      <Anchor id="rsvp">
        <div
          className="max-w-2xl mx-auto py-16 px-4"
          aria-labelledby="rsvp-title"
        >
          <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-neutral-300 text-center">
            <div className="py-4">
              <h3 className="font-display text-3xl md:text-4xl text-neutral-dark mb-4">
                Entendemos
              </h3>
              <p className="font-body text-lg text-neutral-mid">
                Te extrañaremos, {auth.name}. Gracias por avisarnos.
              </p>
            </div>
            <button
              onClick={() => handleRsvp("ACCEPTED")}
              disabled={loading}
              className="mt-6 text-sm text-neutral-400 hover:text-neutral-600 underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Cambiar respuesta a sí asistiré"
            >
              {loading ? "Actualizando..." : "¿Cambió tu situación? Actualiza tu respuesta"}
            </button>
          </div>
        </div>
      </Anchor>
    );
  }

  return (
    <Anchor id="rsvp">
      <div
        id="rsvp"
        className="max-w-2xl mx-auto py-16 px-4"
        aria-labelledby="rsvp-title"
      >
        <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-primary-accent">
          <div className="text-center mb-8">
            <span className="inline-block bg-secondary-accent/30 text-neutral-dark px-3 py-1 rounded-full text-sm font-semibold mb-4">
              RSVP
            </span>
            <h2
              id="rsvp-title"
              className="font-display text-3xl md:text-4xl text-neutral-dark mb-2"
            >
              Hola, {auth.name}
            </h2>
            <p className="text-neutral-mid">
              Tienes{" "}
              <span className="font-bold text-neutral-dark">
                {auth.maxGuests} cupos
              </span>{" "}
              reservados.
            </p>
          </div>

          <div
            className="flex flex-col gap-4 md:flex-row md:justify-center"
            aria-live="polite"
          >
            <button
              onClick={() => handleRsvp("ACCEPTED")}
              disabled={loading}
              aria-busy={loading}
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
    </Anchor>
  );
}
