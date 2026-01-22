import { useState } from "react";

import { Countdown } from "@/components/Countdown";

type Props = {
  credentialsAvailableDate: Date | number | string;
  initialAreCredentialsAvailable: boolean;
};

export function LiveStreamCredentials({
  credentialsAvailableDate,
  initialAreCredentialsAvailable,
}: Props) {
  // Asegurar que credentialsAvailableDate sea un objeto Date
  const targetDate = new Date(credentialsAvailableDate);
  const [areCredentialsAvailable, setAreCredentialsAvailable] = useState(
    initialAreCredentialsAvailable,
  );

  if (areCredentialsAvailable) {
    return (
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <a
          href="https://jworg.zoom.us/j/82173062672?pwd=ZQOlZj4M41HYraQ8cvO9rJVOVNuPBq.1"
          className="inline-block bg-primary-accent text-neutral-dark font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-white transition-colors duration-300 transform hover:-translate-y-1"
        >
          Unirse a la Transmisión
        </a>

        <div className="mt-4 text-sm text-neutral-400">
          <p>
            ID de reunión:{" "}
            <span className="text-white font-mono">821 7306 2672</span>
          </p>
          <p>
            Código de acceso:{" "}
            <span className="text-white font-mono">256875</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <Countdown
        targetDate={targetDate}
        onComplete={() => setAreCredentialsAvailable(true)}
      />
    </div>
  );
}
