import { actions } from "astro:actions";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";

import { $guestbookMessages, setMessages } from "@/stores/guestbookStore";
import type { GuestbookMessage } from "@/types/guestbook";

export const useTreeVisualization = () => {
  const messages = useStore($guestbookMessages);
  const [hoveredLeaf, setHoveredLeaf] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [newLeafIndex, setNewLeafIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMessages = async () => {
      // Only load if empty, or perhaps force refresh?
      // Given it's a guest book, we usually want the latest but let's stick to the current logic
      // but feeding the store.
      try {
        const { data } = await actions.guestbook.getGuestbookMessages();
        const messages = data?.messages || ([] as GuestbookMessage[]);
        setMessages(messages);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    if (messages.length === 0) {
      loadMessages();
    }
  }, []);

  const handleLeafHover = useCallback(
    (index: number, event: React.MouseEvent) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setHoveredLeaf(index);
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    },
    [],
  );

  const handleLeafLeave = useCallback(() => {
    setHoveredLeaf(null);
  }, []);

  useEffect(() => {
    if (newLeafIndex !== null) {
      const timer = setTimeout(() => {
        setNewLeafIndex(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [newLeafIndex]);

  return {
    containerRef,
    hoveredLeaf,
    messages,
    newLeafIndex,
    tooltipPosition,
    handleLeafHover,
    handleLeafLeave,
    setTooltipPosition,
  };
};
