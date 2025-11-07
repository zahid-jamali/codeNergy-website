"use client";
import { motion } from "framer-motion";

export default function WhoWeAreSection() {
  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15),transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* Subheading */}
          <h3 className="relative inline-block text-red-500 uppercase tracking-widest mb-2 pl-8">
            <span className="absolute left-0 top-1/2 w-6 h-[2px] bg-red-500 -translate-y-1/2"></span>
            Who We Are
          </h3>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            We Build <span className="text-red-500">Digital Dreams</span> That
            Inspire
          </h2>

          {/* Paragraph */}
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            At <span className="text-red-500 font-semibold">codeNergy</span>, we
            blend creativity and technology to craft experiences that drive
            success and innovation.
          </p>
        </motion.div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Vision",
              desc: "To become a global leader in delivering innovative and scalable digital solutions that empower businesses.",
            },
            {
              title: "Our Mission",
              desc: "We aim to provide seamless technology experiences that simplify life, enhance productivity, and boost growth.",
            },
            {
              title: "Our Approach",
              desc: "We focus on client-first strategies, continuous learning, and cutting-edge tools to deliver excellence.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="bg-[#111] border border-red-600/40 p-8 rounded-2xl shadow-lg hover:shadow-red-500/30 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-red-500 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
