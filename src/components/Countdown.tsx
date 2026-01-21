import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date;
  title?: string;
  onComplete?: () => void;
  className?: string; // Allow external styling overrides/extensions
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (
  targetDate: Date,
  offset: number = 0,
): TimeLeft | null => {
  const now = new Date().getTime() + offset;
  const difference = +targetDate - now;

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return null;
};

export function Countdown({
  targetDate,
  title,
  onComplete,
  className = "",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [serverOffset, setServerOffset] = useState<number>(0);

  useEffect(() => {
    setIsMounted(true);
    // Initial calculation with local time
    setTimeLeft(calculateTimeLeft(targetDate, 0));

    const syncTime = async () => {
      try {
        const start = Date.now();
        const response = await fetch("/api/time");
        const data = await response.json();
        const end = Date.now();
        const latency = (end - start) / 2;

        const serverTime = data.time + latency;
        const offset = serverTime - Date.now();
        setServerOffset(offset);
      } catch (error) {
        console.error("Failed to sync time:", error);
      }
    };

    syncTime();
  }, []); // Run only once on mount

  useEffect(() => {
    // Timer effect that depends on serverOffset
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate, serverOffset);
      setTimeLeft(newTimeLeft);

      if (!newTimeLeft) {
        clearInterval(timer);
        if (onComplete) {
          onComplete();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete, serverOffset]);
  // Actually simplest is to keep offset in ref or just let state update trigger re-render
  // but let's adjust calculateTimeLeft to take an offset argument first.

  if (!isMounted || !timeLeft) {
    return null;
  }

  const timeUnits = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ];

  return (
    <div
      className={`flex flex-col items-center justify-center animate-fade-in ${className}`}
    >
      {title && (
        <h3 className="text-xl md:text-2xl font-display text-white mb-4 tracking-wide drop-shadow-md">
          {title}
        </h3>
      )}
      <div className="flex flex-wrap gap-4 justify-center">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="relative flex flex-col items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative w-24 h-24 md:w-28 md:h-28 flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden">
                <span className="text-3xl md:text-4xl font-bold font-display text-white drop-shadow-lg tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-xs md:text-sm font-light text-neutral-300 uppercase tracking-widest mt-1">
                  {unit.label}
                </span>

                {/* Decorative sheen effect */}
                <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              </div>
            </div>
            {index < timeUnits.length - 1 && (
              <span className="absolute hidden md:block text-2xl text-white/50 font-light mt-8 ml-34 mr-2">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
