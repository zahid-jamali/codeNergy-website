"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "50+", label: "Project Completed" },
  { value: "85k", label: "Happy Customer" },
  { value: "65+", label: "Experienced Staff" },
  { value: "100+", label: "Ongoing projects" },
];

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("stats-section");
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setIsVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="stats-section"
      className="relative py-12 sm:py-16 overflow-hidden  border-t-4 border-b-4 border-red-800"
      aria-labelledby="stats-heading"
    >
      {/* Responsive circuit background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1920 400"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 200 Q 480 150, 960 200 T 1920 200"
            stroke="#ff0000"
            strokeWidth="2"
          />
          <path
            d="M0 250 Q 480 300, 960 250 T 1920 250"
            stroke="#ff0000"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle cx="960" cy="200" r="4" fill="#ff0000" opacity="0.3" />
        </svg>
      </div>

      {/* Centered inner wrapper: 80% width on desktop */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full lg:w-[80%] mx-auto">
          <h2 id="stats-heading" className="sr-only">
            Company Statistics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8 lg:gap-x-12 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px]"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <CountUp value={stat.value} isVisible={isVisible} />
                <p className="mt-3 text-base sm:text-lg lg:text-xl font-medium text-white tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// FIXED: Count-up now correctly shows "+" and "k" suffixes
function CountUp({ value, isVisible }) {
  const [display, setDisplay] = useState(value); // Start with full value (e.g., "50+") so suffix shows immediately if no animation

  useEffect(() => {
    if (!isVisible) {
      setDisplay(value); // Reset to full value when not visible
      return;
    }

    // Extract the numeric part and the suffix (e.g., "50" and "+", "85" and "k")
    const match = value.match(/^(\d+)([k+]*)$/);
    if (!match) return;

    const target = parseInt(match[1], 10); // Numeric target: 50, 85, 65, 100
    const suffix = match[2] || ""; // Suffix: "+", "k", "+" etc.

    let num = 0;
    const increment = Math.max(1, target / 60); // Avoid division by zero, smooth ~1s animation

    const timer = setInterval(() => {
      num += increment;
      if (num >= target) {
        setDisplay(`${target}${suffix}`);
        clearInterval(timer);
      } else {
        setDisplay(`${Math.floor(num)}${suffix}`);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      className={`font-bold text-white tabular-nums ${
        value.includes("k") ? "tracking-tight" : ""
      } text-4xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl`}
      aria-live="polite"
    >
      {display}
    </div>
  );
}
