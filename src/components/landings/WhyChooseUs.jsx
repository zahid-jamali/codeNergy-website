"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaGlobe,
  FaComments,
  FaMicrochip,
  FaBoxOpen,
  FaAward,
} from "react-icons/fa"; // Using react-icons (Fa prefix for Font Awesome)

const reasons = [
  {
    icon: FaShieldAlt,
    title: "Trusted Company",
    desc: "Ut ut sapien nec mi tincidunt sagittis faucibus at eros. In egesta.",
    link: "Learn More >",
  },
  {
    icon: FaGlobe,
    title: "Strong Network",
    desc: "Ut ut sapien nec mi tincidunt sagittis faucibus at eros. In egesta.",
    link: "Learn More >",
  },
  {
    icon: FaComments,
    title: "Best Partner",
    desc: "Ut ut sapien nec mi tincidunt sagittis faucibus at eros. In egesta.",
    link: "Learn More >",
  },
  {
    icon: FaMicrochip,
    title: "System Provider",
    desc: "Ut ut sapien nec mi tincidunt sagittis faucibus at eros. In egesta.",
    link: "Learn More >",
  },
  {
    icon: FaBoxOpen,
    title: "Quality Products",
    desc: "Ut ut sapien nec mi tincidunt sagittis faucibus at eros. In egesta.",
    link: "Learn More >",
  },
  {
    icon: FaAward,
    title: "Certified",
    desc: "Ut ut sapien nec mi tincidunt sagittis faucibus at eros. In egesta.",
    link: "Learn More >",
  },
];

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("why-choose-us");
      if (element) {
        const rect = element.getBoundingClientRect();
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
      id="why-choose-us"
      className="relative py-16 sm:py-24 overflow-hidden m-auto md:px-12 "
      aria-labelledby="why-heading"
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
        {/* Header - Adjusted for mobile centering, desktop left-align */}
        <div className="text-center lg:text-left mb-12 lg:mb-16">
          <p className="text-red-600 text-sm sm:text-base font-semibold tracking-wider uppercase inline-flex items-center justify-center lg:justify-start">
            <span className="inline-block w-12 h-px bg-red-600 mr-3"></span>
            Why Choose Us
          </p>
          <h2
            id="why-heading"
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
          >
            <span className="text-white block sm:inline">Why Should Our </span>
            <span className="text-red-600 block sm:inline">IT Solutions</span>
          </h2>
          <p className="mt-6 max-w-3xl mx-auto lg:mx-0 text-gray-400 text-sm sm:text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            vel ornare odio, eget sagittis nisl. Nullam vulputate risus ut nisi
            mollis, et euismod augue rhoncus. Donec ut laoreet leo.
          </p>
        </div>

        {/* 80% centered grid on desktop */}
        <div className="w-full lg:w-[80%] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  className="group relative bg-gradient-to-br from-black to-red-600/60 backdrop-blur-sm border border-red-800/50 rounded-lg p-6 sm:p-8 hover:border-red-500 transition-all  shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.01 }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 40px rgba(239, 68, 68, 0.2)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10">
                    <Icon className="w-12 h-12 sm:w-14 sm:h-14 text-red-500 mb-4 sm:mb-5" />
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                      {reason.desc}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center text-red-500 font-medium text-sm sm:text-base hover:text-red-400 transition-colors group"
                    >
                      {reason.link}
                      <svg
                        className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
