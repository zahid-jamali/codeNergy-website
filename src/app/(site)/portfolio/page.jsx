"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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

      {/* LOADING */}
      {loading && <Loading />}

      {/* EMPTY STATE */}
      {!loading && projects.length === 0 && (
        <p className="text-center text-gray-400">No projects available yet.</p>
      )}

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            className="relative group rounded-2xl overflow-hidden bg-gradient-to-b from-[#111] to-[#000] border border-red-600/30 shadow-lg hover:shadow-red-600/40 transition duration-500 backdrop-blur-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <Link href={`/portfolio/${project._id}`}>
              {/* Project Image */}
              <div className="relative h-56 md:h-64 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-red-500 mb-2">
                  {project.title}
                </h2>

                {/* Service title */}
                <p className="text-sm text-red-400 mb-3">
                  {project.service?.title}
                </p>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-4">
                  {project.description}
                </p>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-30 transition duration-500" />
            </Link>
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
