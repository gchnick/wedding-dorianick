import type { GuestbookMessage } from "@/types/guestbook";

type Props = {
  message: GuestbookMessage;
  position: { x: number; y: number };
  visible: boolean;
};

export function LeafTooltip({ message, position, visible }: Props) {
  if (!visible) return null;

  return (
    <div
      className="absolute z-50 bg-white rounded-lg shadow-lg p-4 max-w-xs pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -100%) translateY(-10px)",
      }}
    >
      <div className="text-sm font-medium text-neutral-dark mb-1">
        {message.guestName}
      </div>
      <div className="text-sm text-neutral-mid">{message.message}</div>

      {/* Tooltip arrow */}
      <div
        className="absolute w-3 h-3 bg-white transform rotate-45"
        style={{
          left: "50%",
          bottom: "-6px",
          marginLeft: "-6px",
        }}
      />
    </div>
  );
}
