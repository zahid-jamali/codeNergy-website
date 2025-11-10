"use client";
import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaProjectDiagram,
  FaThLarge,
  FaShieldAlt,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaFileAlt className="text-5xl text-red-500 mb-4" />,
    title: "Consultation",
    text: "Our experts analyze your business requirements to provide tailored IT strategies that drive growth and efficiency.",
  },
  {
    id: 2,
    icon: <FaProjectDiagram className="text-5xl text-red-500 mb-4" />,
    title: "Design",
    text: "We create innovative system architectures and UX designs that enhance user experience and operational effectiveness.",
  },
  {
    id: 3,
    icon: <FaThLarge className="text-5xl text-red-500 mb-4" />,
    title: "Application",
    text: "From web apps to enterprise solutions, we develop high-performance applications that scale with your business needs.",
  },
  {
    id: 4,
    icon: <FaShieldAlt className="text-5xl text-red-500 mb-4" />,
    title: "Maintenance",
    text: "We provide proactive system maintenance and security updates to ensure your IT infrastructure remains reliable and secure.",
  },
];

export default function ServiceCards() {
  return (
    <section className="bg-[#121212] py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((srv) => (
          <motion.div
            key={srv.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative group p-8 border border-red-800 bg-[#1a1a1a] text-white 
                       hover:bg-gradient-to-b hover:from-black hover:to-red-900 
                       transition-all duration-500 ease-out rounded-xl cursor-pointer"
          >
            {srv.icon}
            <h3 className="text-2xl font-bold mb-3">{srv.title}</h3>
            <p className="text-gray-400">{srv.text}</p>

            {/* Red glow effect on hover */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-red-600 transition-all duration-500"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
