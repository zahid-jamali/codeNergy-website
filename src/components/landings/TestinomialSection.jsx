"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

export default function TestimonialsSection(Comments) {
  const [testinomials, setTestinomials] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (Comments !== undefined) {
      setTestinomials(Comments.Comments);
    }
  }, [Comments]);

  useEffect(() => {
    // fetchTestinomials();
    const handleScroll = () => {
      const element = document.getElementById("testimonials-section");
      if (element) {
        const rect = element.getBoundingClientRect(); // ✅ FIXED HERE
        if (rect.top < window.innerHeight * 0.8) {
          setIsVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="testimonials-section"
      className="relative py-16 sm:py-24 overflow-hidden "
      aria-labelledby="testimonials-heading"
    >
      {/* Subtle circuit background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1920 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 400 Q 480 300, 960 400 T 1920 400"
            stroke="#ff0000"
            strokeWidth="2"
          />
          <path
            d="M0 500 Q 480 600, 960 500 T 1920 500"
            stroke="#ff0000"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle cx="960" cy="400" r="6" fill="#ff0000" opacity="0.3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-red-600 text-sm sm:text-base font-semibold tracking-wider uppercase inline-flex items-center justify-center">
            <span className="inline-block w-12 h-px bg-red-600 mr-3"></span>
            Client Feedback
          </p>
          <h2
            id="testimonials-heading"
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
          >
            <span className="text-white">What Our </span>
            <span className="text-red-600">Clients Say</span>
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
            Hear from our satisfied partners who have experienced the difference
            with our IT solutions.
          </p>
        </div>

        {/* 80% centered wrapper */}
        <div className="w-full lg:w-[90%] mx-auto">
          <TestimonialCarousel
            testimonials={testinomials}
            isVisible={isVisible}
          />
        </div>
      </div>
    </section>
  );
}

// Fixed infinite carousel with pure CSS animation (no Framer Motion conflicts)
function TestimonialCarousel({ testimonials, isVisible }) {
  const [hovered, setHovered] = useState(false);
  const duplicated = [...testimonials, ...testimonials]; // For seamless loop

  return (
    <div
      className="overflow-hidden"
      //   onMouseEnter={() => setHovered(true)}
      //   onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex gap-8"
        style={{
          animation: hovered
            ? "none"
            : `scroll ${30 + testimonials.length * 2}s linear infinite`,
        }}
      >
        {duplicated.map((t, index) => (
          <div
            key={`${t.name}-${index}`}
            className="shrink-0 w-full sm:w-80 lg:w-96"
          >
            <motion.div
              className="h-full bg-linear-to-br from-red-800/40 to-red-900/40 backdrop-blur-sm border border-red-800/50 rounded-lg p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isVisible
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{
                duration: 0.6,
                delay: (index % testimonials.length) * 0.1,
              }}
            >
              <FaQuoteLeft className="w-10 h-10 text-red-500 mb-4 opacity-70" />
              <p className="text-white text-base sm:text-lg leading-relaxed mb-6 italic">
                "{t.comment}"
              </p>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < t.rating ? "text-red-500" : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <div>
                <p className="text-white font-bold text-lg">{t.name}</p>
                <p className="text-gray-400 text-sm">{t.role}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Scoped CSS keyframes */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
