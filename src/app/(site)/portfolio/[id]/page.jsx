"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProjectPage() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error("Project not found");

        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error(err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-gray-400">
        Loading project...
      </div>
    );
  }

  /* ---------------- NOT FOUND ---------------- */
  if (!project) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Project Not Found
        </h1>
        <Link href="/portfolio" className="text-red-500 hover:underline">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* HERO IMAGE */}
      <div className="relative w-full h-[60vh]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* CONTENT */}
      <motion.div
        className="max-w-5xl mx-auto px-6 md:px-10 py-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Service */}
        {project.service?.title && (
          <p className="text-red-500 uppercase tracking-widest text-sm mb-3">
            {project.service.title}
          </p>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          {project.title}
        </h1>

        {/* Divider */}
        <div className="w-24 h-[2px] bg-red-600 mb-8" />

        {/* Description */}
        <p className="text-gray-300 leading-relaxed text-lg">
          {project.description}
        </p>

        {/* CTA */}
        <div className="mt-12 flex gap-4">
          <Link
            href="/contactus"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Start a Project
          </Link>

          <Link
            href="/portfolio"
            className="border border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Back to Portfolio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
