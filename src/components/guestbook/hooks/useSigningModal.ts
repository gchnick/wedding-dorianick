import { actions } from "astro:actions";
import { useState } from "react";

import { addMessage } from "@/stores/guestbookStore";

type Props = {
  onClose: VoidFunction;
};

export const useSigningModal = ({ onClose }: Props) => {
  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const characterCount = message.length;
  const maxCharacters = 140;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!guestName.trim()) {
      setError("Por favor ingrese su nombre");
      return;
    }

    if (!message.trim()) {
      setError("Por favor ingrese un mensaje");
      return;
    }

    if (message.length > maxCharacters) {
      setError(`El mensaje no puede exceder ${maxCharacters} caracteres`);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await actions.guestbook.addGuestbookMessage({
        guestName: guestName.trim(),
        message: message.trim(),
      });

      if (data) {
        addMessage(data.message);
        setGuestName("");
        setMessage("");
        // Close modal after a short delay to show success
        setTimeout(() => {
          onClose();
        }, 500);
      }
    } catch (err) {
      console.error("Error submitting message:", err);
      setError(
        "Hubo un error al enviar tu mensaje. Por favor intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    guestName,
    message,
    isSubmitting,
    error,
    characterCount,
    maxCharacters,
    handleSubmit,
    setGuestName,
    setMessage,
  };
};
