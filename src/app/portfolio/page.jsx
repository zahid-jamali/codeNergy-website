"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "AI-Powered Chat Assistant",
    description:
      "An intelligent chatbot system integrating LangChain and GPT models to handle real-time queries for customers.",
    image: "/portfolio/ai-chat.png",
    tech: ["Next.js", "LangChain", "OpenAI API"],
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    description:
      "A powerful e-commerce admin panel with analytics, sales tracking, and dynamic inventory management.",
    image: "/portfolio/ecommerce-dashboard.png",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 3,
    title: "Digital City Portal",
    description:
      "Comprehensive city portal providing healthcare, education, and transport info — designed for Nawabshah.",
    image: "/portfolio/digital-city.png",
    tech: ["React", "Express", "MongoDB", "Flutter"],
  },
  {
    id: 4,
    title: "Smart Attendance System",
    description:
      "Location-based attendance tracking system for companies using geolocation and real-time reporting.",
    image: "/portfolio/attendance.png",
    tech: ["MERN Stack", "Leaflet", "Railway", "Netlify"],
  },
];

export default function PortfolioPage() {
  return (
    <div className="bg-black text-white min-h-screen py-20 px-6 md:px-16">
      {/* HEADER SECTION */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-red-600 tracking-tight">
          Our Portfolio
        </h1>
        <p className="text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
          A showcase of innovation, intelligence, and design — where CodeNergy
          transforms ideas into digital excellence.
        </p>
      </motion.div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="relative group rounded-2xl overflow-hidden bg-gradient-to-b from-[#111] to-[#000] border border-red-600/30 shadow-lg hover:shadow-red-600/40 transition duration-500 backdrop-blur-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Project Image */}
            <div className="relative h-56 md:h-64 w-full overflow-hidden">
              <Image
                src={"/images/slider3.jpg"}
                alt={project.title}
                fill
                className="object-cover transform group-hover:scale-110 transition duration-700"
              />
            </div>

            {/* Project Info */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-red-500 mb-3">
                {project.title}
              </h2>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs bg-red-600/20 border border-red-500/50 text-red-300 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-30 transition duration-500" />
          </motion.div>
        ))}
      </div>

      {/* CTA SECTION */}
      <motion.div
        className="text-center mt-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Let’s Build Your Next Big Thing 🚀
        </h2>
        <p className="text-gray-400 mb-6">
          Whether it’s web, mobile, or AI — CodeNergy is ready to energize your
          next idea.
        </p>
        <Link
          href="/contactus"
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition duration-300"
        >
          Get in Touch
        </Link>
      </motion.div>
    </div>
  );
}
