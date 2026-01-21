import { useState, useEffect } from "react";

import { SigningModal } from "@/components/guestbook/SigningModal";
import { TreeVisualization } from "@/components/guestbook/TreeVisualization";
import { weddingDate, weddingDateString } from "@/constans/const";
import { Countdown } from "@/components/Countdown";
import signatureIcon from "@/assets/icons/signature-duotone.svg";
import { Anchor } from "@/components/react/Anchor";

export function GuestBookSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1 hour before wedding
  const enableSigningTime = weddingDate.getTime() - 60 * 60 * 1000;
  const [isSigningEnabled, setIsSigningEnabled] = useState(false);

  useEffect(() => {
    setIsSigningEnabled(Date.now() >= enableSigningTime);
  }, [enableSigningTime]);

  return (
    <Anchor id="guestbook">
      <section className="py-16 md:py-24 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display mb-4">
              Libro de invitados a la boda
            </h2>
            <p className="text-lg md:text-xl text-primary-accent font-semibold mb-2">
              Por favor, firma una hoja
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto">
              La hoja se depositará en el lienzo para que siempre recordemos a
              los seres queridos que nos acompañaron.
            </p>

            <div className="flex justify-center mt-8">
              {!isSigningEnabled ? (
                <div className="animate-fade-in flex flex-col items-center gap-4">
                  <p className="text-neutral-300 text-center max-w-md">
                    El libro de firmas estará disponible 1 hora antes de la
                    boda.
                  </p>
                  <Countdown
                    targetDate={new Date(enableSigningTime)}
                    onComplete={() => setIsSigningEnabled(true)}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-primary-accent text-neutral-dark font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-white transition-colors duration-300 animate-fade-in"
                >
                  <img
                    src={signatureIcon.src}
                    alt="Firmar"
                    className="w-6 h-6"
                  />
                  Firmar
                </button>
              )}
            </div>
          </div>

          <TreeVisualization />
          <div className="flex items-center justify-center pointer-events-none mt-2">
            <div className="text-center w-fit py-4 px-8 rounded-lg bg-[#4a4235]/20">
              <h3 className="text-2xl md:text-4xl font-display font-bold text-neutral-300">
                Dorianni y Nick
              </h3>
              <p className="text-sm md:text-lg text-neutral-400 tracking-wider">
                {weddingDateString}
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-8"></div>
        </div>

        <SigningModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </section>
    </Anchor>
  );
}
