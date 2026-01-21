import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";

import { Countdown } from "@/components/Countdown";
import { weddingDate } from "@/constans/const";
import { authStore } from "@/stores/auth";

type Props = {
  title?: string;
  className?: string;
}

export function HeroButtons({ title, className = "" }: Props) {
  const auth = useStore(authStore);
  const [isComplete, setIsComplete] = useState(() => {
    // Check if countdown is already complete on initial render
    return Date.now() >= weddingDate.getTime();
  });

  useEffect(() => {
    // Double-check on mount in case of time sync issues
    if (Date.now() >= weddingDate.getTime()) {
      setIsComplete(true);
    }
  }, []);

  const handleComplete = () => {
    setIsComplete(true);
  };

  // Check if user is authenticated and has PENDING status
  const showRsvpButton = auth && auth.status === "PENDING";
  // Show live stream button only for unauthenticated users
  const showLiveStreamButton = !auth;

  return (
    <div className={`flex flex-col items-center gap-8 ${className}`}>
      {!isComplete ? (
        <>
          <Countdown
            targetDate={weddingDate}
            title={title}
            onComplete={handleComplete}
            className="scale-90 md:scale-100"
          />
          {showRsvpButton && (
            <a
              href="#rsvp"
              className="font-body inline-block bg-primary-accent text-neutral-dark font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-white/80 transition-colors duration-300 animate-fade-in"
            >
              Confirmar asistencia
            </a>
          )}
          {showLiveStreamButton && (
            <a
              href="#live-stream"
              className="font-body inline-block bg-primary-accent text-neutral-dark font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-white/80 transition-colors duration-300 animate-fade-in"
            >
              Transmisión en vivo
            </a>
          )}
        </>
      ) : (
        <div className="flex flex-col sm:flex-row gap-4 items-center animate-fade-in">
          {showLiveStreamButton && (
            <a
              href="#live-stream"
              className="font-body inline-block bg-primary-accent text-neutral-dark font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-white/80 transition-colors duration-300"
            >
              Transmisión en vivo
            </a>
          )}
          <a
            href="#guestbook"
            className="font-body inline-block border-2 border-white/50 bg-white/10 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-white/20 transition-colors duration-300"
          >
            Firmar libro de invitados
          </a>
        </div>
      )}
    </div>
  );
}
