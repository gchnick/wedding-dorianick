import { useSigningModal } from "@/components/guestbook/hooks/useSigningModal";
import leafIcon from "@/assets/icons/leaf-duotone.svg";
import signatureIcon from "@/assets/icons/signature-duotone.svg";

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
};

export function SigningModal({ isOpen, onClose }: Props) {
  const {
    characterCount,
    error,
    guestName,
    handleSubmit,
    isSubmitting,
    maxCharacters,
    message,
    setGuestName,
    setMessage,
  } = useSigningModal({ onClose });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-scale-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
          aria-label="Cerrar"
        >
          ×
        </button>

        <h2 className="flex items-center text-2xl font-playfair font-bold text-neutral-dark mb-2">
          <img src={leafIcon.src} alt="Leaf" className="inline-block mr-2" />
          Firma una hoja
        </h2>
        <p className="text-sm text-neutral-mid mb-6 mt-4">
          Tu mensaje será como una hoja en nuestro árbol de recuerdos
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="guestName"
              className="block text-sm font-medium text-neutral-dark mb-1"
            >
              Tu nombre
            </label>
            <input
              type="text"
              id="guestName"
              autoComplete="off"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-transparent outline-none text-neutral-dark font-body"
              placeholder="Ej: María González"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-neutral-dark"
              >
                Tu mensaje
              </label>
              <span
                className={`text-xs ${
                  characterCount > maxCharacters
                    ? "text-red-500"
                    : "text-neutral-mid"
                }`}
              >
                {characterCount}/{maxCharacters}
              </span>
            </div>
            <textarea
              id="message"
              autoComplete="off"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-transparent outline-none resize-none text-neutral-dark font-body"
              placeholder="Escribe tus mejores deseos..."
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-neutral-mid text-neutral-dark rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-primary-accent text-neutral-dark font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-white transition-colors duration-300"
              disabled={isSubmitting}
            >
              <img src={signatureIcon.src} alt="Firmar" className="w-6 h-6" />
              {isSubmitting ? "Enviando..." : "Firmar"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes scale-up {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-up {
          animation: scale-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
