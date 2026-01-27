"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PortfolioProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    setProjects([]);

    const fetchProjects = async () => {
      try {
        const url = `/api/projects?service=${params.id}`;
        console.log("URL IS HERE: ", url);
        const res = await fetch(url);
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch projects", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (!loading && projects.length === 0) {
    return null;
  }

  return (
    <section className="bg-black text-white py-20 px-6 md:px-16">
      {/* Section Heading */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-red-600">
          Our Projects
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Real-world solutions crafted with precision, performance, and purpose.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) =>
          project.service._id == params.id ? (
            <Link href={`/portfolio/${project._id}`} key={project._id}>
              <motion.div
                className="relative group rounded-2xl overflow-hidden bg-gradient-to-b from-[#111] to-[#000] border border-red-600/25 shadow-lg hover:shadow-red-600/40 transition duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                viewport={{ once: true }}
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-red-500 mb-2">
                    {project.title}
                  </h3>

                  {project.service?.title && (
                    <p className="text-xs text-red-400 mb-3 uppercase tracking-wide">
                      {project.service.title}
                    </p>
                  )}

                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                    {project.description}
                  </p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-30 transition duration-500" />
              </motion.div>
            </Link>
          ) : (
            <p key={index}>{/* {project.service._id} === {params.id} */}</p>
          )
        )}
      </div>
    </section>
  );
}
