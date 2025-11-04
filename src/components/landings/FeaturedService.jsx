"use client";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

export default function FeaturedService() {
  const featuresLeft = [
    "IT Management",
    "System Integration",
    "Experience Design",
  ];

  const featuresRight = [
    "Servers & Storage",
    "Network & Access Point",
    "Data Security",
  ];

  return (
    <section className="bg-[#111111] text-white py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden shadow-lg"
        >
          <Image
            src="/images/featured-service.jpg" // Replace with your actual image path
            alt="Featured Service"
            width={700}
            height={500}
            className="rounded-xl object-cover w-full h-full"
          />
        </motion.div>

        {/* Right Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div>
            <p className="text-red-500 uppercase tracking-widest font-semibold mb-2 relative inline-block">
              <span className="absolute -left-8 top-1/2 w-6 h-[2px] bg-red-500 -translate-y-1/2"></span>
              WHAT WE DO
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Product Featured <span className="text-red-500">Service</span>
            </h2>
          </div>

          <p className="text-gray-400 max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            vel ornare odio, eget sagittis nisl. Nullam vulputate risus ut nisi
            mollis, et euismod augue rhoncus. Donec ut laoreet leo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 pt-4">
            {/* Left column features */}
            <ul className="space-y-3">
              {featuresLeft.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <FaCheckCircle className="text-red-500 text-xl" />
                  <span className="text-gray-200">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Right column features */}
            <ul className="space-y-3">
              {featuresRight.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <FaCheckCircle className="text-red-500 text-xl" />
                  <span className="text-gray-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
