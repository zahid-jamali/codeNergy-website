"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaDollarSign, FaArrowRight } from "react-icons/fa"; // react-icons for $ and arrow

export default function PricingTeaser() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("pricing-teaser");
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
      id="pricing-teaser"
      className="relative py-16 sm:py-24 overflow-hidden md:px-12 "
      aria-labelledby="pricing-heading"
    >
      {/* Subtle circuit background for theme consistency */}
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
        <div className="text-left mb-12 lg:mb-16">
          <p className="text-red-600 text-sm sm:text-base font-semibold tracking-wider uppercase inline-flex items-center justify-center">
            <span className="inline-block w-12 h-px bg-red-600 mr-3"></span>
            Affordable Pricing
          </p>
          <h2
            id="pricing-heading"
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
          >
            <span className="text-white">Flexible Plans </span>
            <span className="text-red-600">Starting Low</span>
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-center text-gray-400 text-sm sm:text-base leading-relaxed">
            We offer competitive pricing tailored to your needs. No hidden fees,
            just transparent value.
          </p>
        </div>

        {/* 80% centered two-column layout */}
        <div className="w-full lg:w-[80%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text content + CTA */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h3 className="text-3xl text-left sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Plans That Scale <span className="text-red-600">With You</span>
              </h3>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                Whether you're a startup or an enterprise, our IT solutions
                start from just{" "}
                <span className="text-red-500 font-bold">$100</span>. Choose
                from basic to premium packages designed for reliability and
                growth.
              </p>
              <ul className="space-y-4 mb-10 text-left max-w-md mx-auto lg:mx-0">
                <li className="flex items-center text-white">
                  <FaArrowRight className="w-5 h-5 text-red-500 mr-3" />
                  Customizable features
                </li>
                <li className="flex items-center text-white">
                  <FaArrowRight className="w-5 h-5 text-red-500 mr-3" />
                  24/7 expert support
                </li>
                <li className="flex items-center text-white">
                  <FaArrowRight className="w-5 h-5 text-red-500 mr-3" />
                  Scalable infrastructure
                </li>
              </ul>
              <Link
                href="/pricing"
                className="inline-flex items-center bg-red-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-red-500 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
              >
                View Full Pricing
                <FaArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Right: Starting price card */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="relative bg-gradient-to-br from-red-800/40 to-red-900/40 backdrop-blur-sm border border-red-800/50 rounded-2xl p-10 sm:p-12 max-w-sm w-full shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 text-center">
                  <FaDollarSign className="w-16 h-16 sm:w-20 sm:h-20 text-red-500 mx-auto mb-6" />
                  <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
                    Starting From
                  </p>
                  <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white">
                    $100
                  </div>
                  {/* <p className="text-gray-300 text-lg mt-4"></p> */}
                  <p className="text-gray-400 text-sm mt-6">
                    Unlock premium IT solutions at an unbeatable entry price.
                    Scale as you grow.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
