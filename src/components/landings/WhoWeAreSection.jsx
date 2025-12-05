"use client";
import { motion } from "framer-motion";

export default function WhoWeAreSection() {
  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15),transparent_70%)]" />

      <div className=" mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT — TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:px-10 mb-12"
          >
            {/* Subheading */}
            <h3 className="relative inline-block text-red-500 uppercase tracking-widest mb-2 pl-8">
              <span className="absolute left-0 top-1/2 w-6 h-[2px] bg-red-500 -translate-y-1/2"></span>
              Who We Are
            </h3>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              We Build <span className="text-red-500">Digital Futures</span>{" "}
              with Experience
            </h2>

            {/* Paragraph */}
            <p className="text-gray-400 mt-4">
              At <span className="text-red-500 font-semibold">codeNergy</span>,
              our strength lies in a team shaped by years of experience across
              software development, digital marketing, BPO operations, and
              technical support — giving us a deep, practical understanding of
              how modern businesses evolve and succeed.
            </p>
          </motion.div>

          {/* RIGHT — IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-left lg:justify-end"
          >
            <img
              src="/images/services-hero.png"
              alt="Who We Are"
              className="rounded-2xl shadow-xl w-full pr-12"
            />
          </motion.div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 md:px-10">
          {[
            {
              title: "Our Vision",
              desc: "To be a trusted global partner known for innovation, reliability, and technology that helps businesses grow smarter and stronger.",
            },
            {
              title: "Our Mission",
              desc: "To turn ideas into real impact by delivering practical, efficient, and result-oriented solutions across software, marketing, operations, and support.",
            },
            {
              title: "Our Approach",
              desc: "A blend of experience, creativity, and execution — enabling us to understand, build, and elevate digital solutions that truly move businesses forward.",
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
