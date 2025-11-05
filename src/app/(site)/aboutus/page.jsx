"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Aboutus = () => {
  return (
    <section className="bg-black text-white">
      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-red-600 uppercase font-semibold tracking-widest mb-4"
        >
          About Us
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold"
        >
          <span className="text-white">Who </span>
          <span className="text-red-600">We Are</span>
        </motion.h2>
      </div>

      {/* CEO Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* CEO Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Image
            src="/images/ceo.png"
            alt="CEO"
            width={500}
            height={500}
            className="rounded-2xl shadow-lg shadow-red-600/40 object-cover"
          />
        </motion.div>

        {/* CEO Message */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-3xl font-semibold text-red-500">CEO’s Message</h3>
          <p className="text-gray-300 leading-relaxed">
            At <span className="text-red-500 font-semibold">codeNergy</span>,
            our mission is to build reliable, modern, and innovative software
            that helps businesses grow and achieve their goals.
          </p>
          <p className="text-gray-400">
            We believe in creativity, collaboration, and a commitment to
            excellence. Every project we undertake reflects our passion for
            technology and our promise to deliver the best possible results.
          </p>
          <p className="text-red-500 font-semibold">— Aadil khan, CEO</p>
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-6 order-2 lg:order-1"
        >
          <h3 className="text-3xl font-semibold text-red-500">Our Team</h3>
          <p className="text-gray-300 leading-relaxed">
            Our passionate team of developers, designers, and innovators works
            together to bring powerful digital solutions to life. We value
            learning, teamwork, and creativity — and we push boundaries to make
            technology work smarter for everyone.
          </p>
          <p className="text-gray-400">
            From web development to mobile apps and AI-based solutions, our team
            ensures every line of code moves your vision closer to success.
          </p>
        </motion.div>

        {/* Team Image */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center order-1 lg:order-2"
        >
          <Image
            src="/images/team.jpg"
            alt="Our Team"
            width={500}
            height={500}
            className="rounded-2xl shadow-lg shadow-red-600/40 object-cover"
          />
        </motion.div>
      </div>

      {/* Footer Quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center py-12 border-t border-red-600/30"
      >
        <p className="text-gray-400 italic">
          “Coming together is a beginning, staying together is progress, and
          working together is success.”
        </p>
      </motion.div>
    </section>
  );
};

export default Aboutus;
