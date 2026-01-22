import { actions } from "astro:actions";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import confetti from "canvas-confetti";

import { authStore } from "@/stores/auth";

export const useRsvpForm = () => {
  const auth = useStore(authStore);
  console.log("🚀 ~ useRsvpForm ~ auth:", auth)
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"PENDING" | "ACCEPTED" | "REJECTED">(
    "PENDING"
  );

  const handleRsvp = useCallback(
    async (response: "ACCEPTED" | "REJECTED") => {
      if (!auth) return;
      setLoading(true);

      const { data, error } = await actions.guests.updateGuestStatus({
        id: auth.id,
        status: response,
      });

      if (data) {
        setStatus(response);
        if (response === "ACCEPTED") {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#40E0D0", "#98FB98", "#FFFFFF"],
          });
        }
      }

      if (error) {
        console.error(error);
        alert(
          "Ocurrió un error al actualizar tu respuesta. Inténtalo de nuevo."
        );
      }
      setLoading(false);
    },
    [auth]
  );

  useEffect(() => {
    const init = async () => {
      if (!auth) return;

      setLoading(true);
      const { data, error } = await actions.guests.getGuest({ id: auth.id });

      if (data) {
        setStatus(data.status);
      }

      if (error) {
        console.error(error);
      }
      setLoading(false);
    };

    init();
  }, [auth]);

  return { auth, loading, status, handleRsvp };
};
