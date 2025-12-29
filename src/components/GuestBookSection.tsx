import { useState } from "react";

import { SigningModal } from "@/components/guestbook/SigningModal";
import { TreeVisualization } from "@/components/guestbook/TreeVisualization";
import { weddingDateString } from "@/constans/const";
import signatureIcon from "@/assets/icons/signature-duotone.svg";
import type { GuestbookMessage } from "@/types/guestbook";

export function GuestBookSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);

  const handleMessageAdded = (newMessage: GuestbookMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <section
      className="py-16 md:py-24 bg-neutral-900 text-white"
      id="guestbook"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display mb-4">
            Libro de invitados a la boda
          </h2>
          <p className="text-lg md:text-xl text-primary-accent font-semibold mb-2">
            Por favor, firma una hoja
          </p>
          <p className="text-lg mb-12 max-w-2xl mx-auto">
            La hoja se depositará en el lienzo para que siempre recordemos a los
            seres queridos que nos acompañaron.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-primary-accent text-neutral-dark font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-white transition-colors duration-300"
          >
            <img src={signatureIcon.src} alt="Firmar" className="w-6 h-6" />
            Firmar
          </button>
        </div>

        <TreeVisualization initialMessages={messages} />
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
        onMessageAdded={handleMessageAdded}
      />
    </section>
  );
}
