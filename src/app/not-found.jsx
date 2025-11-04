"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2, scale: [1, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-[600px] h-[600px] bg-red-600 rounded-full blur-[180px] -z-10"
      />

      {/* 404 Text */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[10rem] font-extrabold text-red-600 tracking-widest"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        Oops! Page Not Found
      </motion.h2>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-gray-400 max-w-md text-center mb-8"
      >
        The page you’re looking for might have been moved, deleted, or never
        existed. Don’t worry — let’s get you back on track.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Link
          href="/"
          className="bg-red-600 hover:bg-red-700 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-red-600/50"
        >
          Go Back Home
        </Link>
      </motion.div>

      {/* Floating Glitch Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-10 text-sm text-gray-500 tracking-widest"
      >
        CODE<span className="text-red-600">NERGY</span>
      </motion.div>
    </div>
  );
}
