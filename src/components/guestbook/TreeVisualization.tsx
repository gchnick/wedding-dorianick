import { useMemo } from "react";
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

  // Generate positions for 200 leaves distributed in the tree canopy
  const LEAF_SLOTS: LeafPosition[] = useMemo(() => {
    const slots: LeafPosition[] = [];
    // Seeded random for consistent result
    let seed = 123;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    // Define canopy clusters (ellipses)
    // x, y: center percentage
    // rx, ry: radius percentage
    const clusters = [
      { x: 25, y: 25, rx: 18, ry: 15 }, // Top Left cluster
      { x: 15, y: 50, rx: 18, ry: 14 }, // Bottom Left cluster
      { x: 80, y: 30, rx: 20, ry: 15 }, // Top Right cluster
      { x: 80, y: 50, rx: 20, ry: 14 }, // Bottom Right cluster
      { x: 50, y: 20, rx: 25, ry: 15 }, // Top cluster
    ];

    for (let i = 0; i < 200; i++) {
      // Pick a random cluster
      const cluster = clusters[Math.floor(random() * clusters.length)];

      // Random point within ellipse using polar coordinates
      const angle = random() * Math.PI * 2;
      // Square root of random for uniform distribution within circle/ellipse
      const r = Math.sqrt(random());

      const x = cluster.x + r * Math.cos(angle) * cluster.rx;
      const y = cluster.y + r * Math.sin(angle) * cluster.ry;

      // Random rotation
      const rotation = -30 + random() * 60; // -30 to 30 degrees variation

      slots.push({
        x: Math.max(5, Math.min(95, x)), // Clamp to 5-95%
        y: Math.max(5, Math.min(95, y)),
        rotation,
      });
    }
    return slots;
  }, []);

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
