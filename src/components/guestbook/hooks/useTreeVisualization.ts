import { actions } from "astro:actions";
import { useCallback, useEffect, useRef, useState } from "react";

import type { GuestbookMessage } from "@/types/guestbook";

type Props = {
  initialMessages?: GuestbookMessage[];
};

export const useTreeVisualization = ({ initialMessages = [] }: Props) => {
  const [messages, setMessages] = useState<GuestbookMessage[]>(initialMessages);
  const [hoveredLeaf, setHoveredLeaf] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [newLeafIndex, setNewLeafIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const { data } = await actions.guestbook.getGuestbookMessages();
        const messages = data?.messages || ([] as GuestbookMessage[]);
        setMessages(messages);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    loadMessages();
  }, []);

  const handleLeafHover = useCallback(
    (index: number, event: React.MouseEvent) => {
      setHoveredLeaf(index);
      setTooltipPosition({
        x: event.clientX,
        y: event.clientY,
      });
    },
    []
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
