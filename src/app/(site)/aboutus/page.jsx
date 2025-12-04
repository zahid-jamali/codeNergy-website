"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function NextGenAboutUs() {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Background Glow Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-black to-black"></div>
      <div className="absolute top-1/3 left-1/2 w-[700px] h-[700px] bg-red-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto text-center px-6 pt-16 pb-10">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-red-500 uppercase font-semibold tracking-widest mb-4"
        >
          About Us
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-6"
        >
          Who <span className="text-red-500">We Are</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl"
        >
          At <span className="text-red-500 font-semibold">CodeNergy</span>, we
          are a team of passionate innovators, designers, and developers
          committed to building state-of-the-art software solutions that empower
          businesses worldwide. From startups to enterprises, we deliver
          impactful technology experiences that drive growth, efficiency, and
          success.
        </motion.p>
      </div>

      {/* CEO Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: CEO Message */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6 md:px-8"
        >
          <h3 className="text-3xl font-semibold text-red-500">CEO’s Message</h3>
          <p className="text-gray-300 leading-relaxed">
            At <span className="text-red-500">CodeNergy </span>, we believe in
            combining experience, innovation, and execution to create solutions
            that truly empower businesses. With more than one half-decade spent
            in the IT industry — across traditional technology and modern
            digital services — our team has faced challenges, solved problems,
            and delivered results that matter. Our mission is simple: to make
            technology work for you. Whether it’s software development, digital
            marketing, BPO services, or technical support, we focus on providing
            solutions that are practical, efficient, and impactful. At
            CodeNergy, we don’t just build projects — we build partnerships. I
            invite you to connect with us, share your vision, and let’s turn
            ideas into results that drive your business forward.
          </p>
          <p className="text-red-500 font-semibold">— Aadil Khan, CEO</p>
        </motion.div>

        {/* Right Column: Animated Professional Design */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full h-96 sm:h-[500px] lg:h-[600px] flex items-center justify-center"
        >
          {/* Animated Background Circle */}
          <motion.div
            className="absolute w-72 h-72 rounded-full bg-red-600/20"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "loop" }}
          ></motion.div>

          <motion.div
            className="absolute w-56 h-56 rounded-full bg-red-500/10"
            animate={{ scale: [1, 1.15, 1], rotate: [0, -30, 0] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "loop" }}
          ></motion.div>

          {/* Central Professional Icon */}
          <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-black/40 shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Mission & Vision Section */}
      <div className="relative z-10 md:px-16 max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h3 className="text-3xl font-semibold text-red-500">Our Mission</h3>
          <p className="text-gray-300 leading-relaxed">
            To empower businesses with technology, creativity, and innovation by
            delivering solutions that are practical, efficient, and
            results-driven. We aim to turn ideas into real impact — through
            software that works, marketing that converts, BPO that performs, and
            support that never stops.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <h3 className="text-3xl font-semibold text-red-500">Our Vision</h3>
          <p className="text-gray-300 leading-relaxed">
            To be recognized as a leading technology and digital solutions
            partner globally — a company known for innovation, reliability, and
            relentless execution, helping organizations grow smarter, faster,
            and stronger in the digital age.
          </p>
        </motion.div>
      </div>

      {/* Our Values Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 grid grid-cols-1 sm:grid-cols-3 gap-12">
        {[
          {
            title: "Innovation",
            desc: "We embrace creativity and forward-thinking solutions, pushing boundaries to deliver remarkable outcomes.",
          },
          {
            title: "Integrity",
            desc: "We operate with transparency, honesty, and ethical practices in all client interactions.",
          },
          {
            title: "Excellence",
            desc: "We strive for the highest quality, ensuring every project reflects our commitment to perfection.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="bg-white/5 rounded-3xl border border-gray-700 p-8 backdrop-blur-xl shadow-lg shadow-red-600/20 text-center"
          >
            <h4 className="text-2xl font-semibold text-red-500 mb-4">
              {item.title}
            </h4>
            <p className="text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
