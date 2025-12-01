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
      <div className="relative z-10 max-w-6xl mx-auto text-center px-6 py-32">
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Image
            src="/images/ceo.png"
            alt="CEO"
            width={500}
            height={500}
            className="rounded-3xl  object-cover w-full max-w-sm"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6 md:px-8"
        >
          <h3 className="text-3xl font-semibold text-red-500">CEO’s Message</h3>
          <p className="text-gray-300 leading-relaxed">
            “Our mission at{" "}
            <span className="text-red-500 font-semibold">CodeNergy</span> is to
            create software that not only works flawlessly but inspires growth
            and innovation. Every line of code we write reflects our dedication,
            creativity, and commitment to excellence.”
          </p>
          <p className="text-gray-400 leading-relaxed">
            From designing elegant web applications to implementing complex
            AI-driven solutions, our work is guided by the philosophy of pushing
            technological boundaries while delivering tangible business results.
          </p>
          <p className="text-gray-400 leading-relaxed">
            We focus on innovation, quality, and collaboration. Our team
            partners with clients to understand their vision and turn it into
            scalable, cutting-edge solutions that drive real-world impact.
          </p>
          <p className="text-red-500 font-semibold">— Aadil Khan, CEO</p>
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
            To empower businesses with reliable, modern, and innovative software
            solutions that unlock growth and efficiency. We aim to bridge the
            gap between creativity and technology, delivering results that
            exceed expectations.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Our mission extends beyond coding — we strive to create meaningful
            experiences for users, building software that solves problems and
            drives real impact.
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
            To be a globally recognized software solutions company known for
            innovation, quality, and customer-centric design. We envision a
            world where technology enhances every aspect of business operations
            and human experience.
          </p>
          <p className="text-gray-400 leading-relaxed">
            We continually evolve, embracing new technologies and methodologies
            to deliver solutions that are not only advanced but sustainable,
            secure, and future-ready.
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

      {/* Footer Quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20 px-6 border-t border-white/10"
      >
        <p className="text-gray-300 italic max-w-3xl mx-auto text-lg leading-relaxed">
          “Coming together is a beginning. Staying together is progress. Working
          together is success. At{" "}
          <span className="text-red-500 font-semibold">CodeNergy</span>, this is
          more than a quote — it’s who we are.”
        </p>
      </motion.div>
    </section>
  );
}
