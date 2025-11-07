"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function TeamPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch("/api/team");
        const data = await res.json();
        setTeam(data);
      } catch (err) {
        console.error("Error fetching team:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  // 🔴 Loader shown until API completes
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg tracking-wide">Loading team members...</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen py-20 px-6 md:px-16">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold ">
          Meet Our
          <span className="text-red-600"> Team</span>
        </h1>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
          The brilliant minds powering
          <span className="text-red-600"> CodeNergy </span>
          transforming ideas into cutting-edge digital realities.
        </p>
      </motion.div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {team.map((member, index) => (
          <motion.div
            key={member._id}
            className="relative group rounded-2xl bg-gradient-to-b from-[#111] to-[#000] border border-red-600/30 shadow-lg hover:shadow-red-600/40 transition duration-500 overflow-hidden"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            {/* Image Section */}
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            {/* Info Section */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-red-500 mb-1">
                {member.name}
              </h2>
              <p className="text-sm text-gray-400 mb-3">{member.designation}</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                {member.description}
              </p>
            </div>

            {/* Glow Hover Layer */}
            <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-30 transition duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Closing CTA */}
      <motion.div
        className="text-center mt-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-600">
          Passion. Innovation. CodeNergy ⚡
        </h2>
        <p className="text-gray-400 mb-6 max-w-xl mx-auto">
          Together, we’re not just writing code — we’re building the future of
          intelligent digital experiences.
        </p>
        <Link
          href="/contactus"
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition duration-300"
        >
          Join Our Team
        </Link>
      </motion.div>
    </div>
  );
}
