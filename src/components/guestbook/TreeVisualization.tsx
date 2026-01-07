import { LeafTooltip } from "@/components/guestbook/LeafTooltip";
import { useTreeVisualization } from "@/components/guestbook/hooks/useTreeVisualization";
import type { LeafPosition } from "@/types/guestbook";

export function TreeVisualization() {
  const {
    containerRef,
    hoveredLeaf,
    messages,
    newLeafIndex,
    tooltipPosition,
    handleLeafHover,
    handleLeafLeave,
    setTooltipPosition,
  } = useTreeVisualization();

  // Predefined positions for leaves on the tree (percentage-based for responsiveness)
  const LEAF_SLOTS: LeafPosition[] = [
    { x: 15, y: 65, rotation: -120 },
    { x: 25, y: 64, rotation: -170 },
    { x: 15, y: 60, rotation: -120 },
    { x: 75, y: 64, rotation: 100 },
    { x: 75, y: 60, rotation: 25 },
    { x: 70, y: 57, rotation: 0 },
    // TODO: Ajustar las posiciones de los mensajes
    { x: 40, y: 38, rotation: -5 },
    { x: 60, y: 40, rotation: 15 },
    { x: 35, y: 45, rotation: 20 },
    { x: 65, y: 47, rotation: -25 },
    { x: 28, y: 50, rotation: -15 },
    { x: 72, y: 52, rotation: 10 },
    { x: 43, y: 55, rotation: 5 },
    { x: 57, y: 55, rotation: -10 },
    { x: 30, y: 60, rotation: 15 },
    { x: 70, y: 62, rotation: -15 },
    { x: 50, y: 65, rotation: 0 },
    { x: 38, y: 68, rotation: 20 },
    { x: 62, y: 70, rotation: -20 },
    { x: 45, y: 73, rotation: 10 },
  ];

  const LEAF_COLORS = {
    turquoise: "#40E0D0",
    mint: "#98FB98",
    cream: "#FFFACD",
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">
      {/* Tree SVG */}
      <div className="relative w-full">
        <img
          src="/tree.svg"
          alt="Wedding Guest Book Tree"
          className="w-full h-auto pointer-events-none"
        />

        {/* Leaves */}
        {messages.slice(0, LEAF_SLOTS.length).map((message, index) => {
          const slot = LEAF_SLOTS[index];
          const isNew = index === newLeafIndex;

          return (
            <div
              key={message.id}
              className={`absolute cursor-pointer transition-all duration-300 ${
                isNew ? "animate-leaf-appear" : ""
              } hover:scale-110`}
              style={{
                left: `${slot.x}%`,
                top: `${slot.y}%`,
                transform: `translate(-50%, -50%) rotate(${slot.rotation}deg)`,
                width: "clamp(30px, 5%, 60px)",
                height: "auto",
              }}
              onMouseEnter={(e) => handleLeafHover(index, e)}
              onMouseLeave={handleLeafLeave}
              onMouseMove={(e) => {
                if (hoveredLeaf === index) {
                  setTooltipPosition({
                    x: e.clientX,
                    y: e.clientY,
                  });
                }
              }}
            >
              <svg
                viewBox="0 0 341.45 566.51"
                className="w-full h-auto drop-shadow-md"
                style={{
                  filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
                }}
              >
                <path
                  fill={
                    LEAF_COLORS[
                      message.leafColor as keyof typeof LEAF_COLORS
                    ] || LEAF_COLORS.turquoise
                  }
                  d="M128.04 414.78a638 638 0 0 0-49-1.5q-4.95 3.44-9 8-1.43.72-3 .5a19 19 0 0 1-1 6 155 155 0 0 0-20.5 67q-1.29 30.56-3 61-10.41 17.47-27.5 6.5a28 28 0 0 1-4.5-7.5q.14-57.23 20-111a1122 1122 0 0 0 16.5-43 770 770 0 0 0-18.5-29q-39.91-70.58-24-150 15.36-59.82 61.5-100.5a429 429 0 0 1 97-61 6195 6195 0 0 1 141-60q14.07-2.1 18.5 11.5a675 675 0 0 1 18 194q-3.86 70.06-44 127-65 79.47-168.5 82"
                />
              </svg>

              {/* Guest name label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xs font-medium text-neutral-dark opacity-0 hover:opacity-100 transition-opacity">
                  {message.guestName.split(" ")[0]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tooltip */}
      {hoveredLeaf !== null && messages[hoveredLeaf] && (
        <LeafTooltip
          message={messages[hoveredLeaf]}
          position={tooltipPosition}
          visible={true}
        />
      )}

      <style>{`
        @keyframes leaf-appear {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .animate-leaf-appear {
          animation: leaf-appear 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
