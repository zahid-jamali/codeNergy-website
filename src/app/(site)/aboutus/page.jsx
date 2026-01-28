"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/components/Loading";

/* =====================
   Shared Motion Settings
===================== */
const ease = [0.16, 1, 0.3, 1];

export default function NextGenAboutUs() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMember, setActiveMember] = useState(null);

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

  if (loading) return <Loading />;

  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-black to-black pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 w-[650px] h-[650px] bg-red-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse pointer-events-none" />

      {/* ================= HERO ================= */}
      <div className="relative z-10 max-w-6xl mx-auto text-center px-6 pt-16 pb-10">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="text-5xl md:text-6xl font-extrabold mb-6"
        >
          Who <span className="text-red-500">We Are</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl"
        >
          At <span className="text-red-500 font-semibold">CodeNergy</span>, we
          are a team of passionate innovators, designers, and developers
          committed to building state-of-the-art software solutions that empower
          businesses worldwide. From startups to enterprises, we deliver
          impactful technology experiences that drive growth, efficiency, and
          success.
        </motion.p>
      </div>

      {/* ================= CEO ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease }}
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-6 md:px-8"
        >
          <h3 className="text-3xl font-semibold text-red-500">CEO’s Message</h3>
          <p className="text-gray-300 leading-relaxed">
            At <span className="text-red-500">CodeNergy </span>, we believe in
            combining experience, innovation, and execution to create solutions
            that truly empower businesses. With more than one half-decade spent
            in the IT industry — across traditional technology and modern
            digital services — our team has faced challenges, solved problems,
            and delivered results that matter. Our mission is simple: to make
            technology work for you. Whether it’s software development, digital
            marketing, BPO services, or technical support, we focus on providing
            solutions that are practical, efficient, and impactful. At
            CodeNergy, we don’t just build projects — we build partnerships. I
            invite you to connect with us, share your vision, and let’s turn
            ideas into results that drive your business forward.
          </p>
          <p className="text-red-500 font-semibold">— Adil Ali, CEO</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease }}
          viewport={{ once: true, amount: 0.4 }}
          className="flex justify-center"
        >
          <img
            src="/images/ceo.png"
            className="w-[95%] lg:w-8/12 rounded-xl shadow-lg shadow-red-600/20"
          />
        </motion.div>
      </div>

      {/* ================= MISSION / VISION ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease }}
            viewport={{ once: true, amount: 0.4 }}
            className="space-y-6 border border-red-600/40 p-8 rounded-2xl bg-white/5 hover:shadow-red-500/30 transition"
          >
            {i === 0 ? (
              <>
                <h3 className="text-3xl font-semibold text-red-500">
                  Our Mission
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  To empower businesses with technology, creativity, and
                  innovation by delivering solutions that are practical,
                  efficient, and results-driven. We aim to turn ideas into real
                  impact — through software that works, marketing that converts,
                  BPO that performs, and support that never stops.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-3xl font-semibold text-red-500">
                  Our Vision
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  To be recognized as a leading technology and digital solutions
                  partner globally — a company known for innovation,
                  reliability, and relentless execution, helping organizations
                  grow smarter, faster, and stronger in the digital age.
                </p>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* ================= TEAM ================= */}
      <div className="bg-black text-white py-20 px-6 md:px-16">
        {/* <motion.div
          initial={{ opacity: 0, y: -32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          viewport={{ once: true }}
          className="text-center mb-16 relative z-50"
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
        </motion.div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: Math.min(index * 0.1, 0.4),
                ease,
              }}
              viewport={{ once: true, amount: 0.2 }}
              onClick={() => setActiveMember(member)}
              className="relative group rounded-2xl bg-gradient-to-b from-[#111] to-[#000] border border-red-600/30 overflow-hidden hover:shadow-red-600/40 transition"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-red-500 mb-1">
                  {member.name}
                </h2>
                <p className="text-sm text-gray-400 mb-3">
                  {member.designation} <br />
                  <span className="text-zinc-500 text-xs mt-2">
                    {member.contact}
                  </span>
                </p>
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {member.description}
                </p>

                <span className="text-red-500 text-xs mt-3 inline-block opacity-70 group-hover:opacity-100 transition">
                  Click to read more →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease }}
          viewport={{ once: true }}
          className="text-center mt-24 relative"
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
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Join Our Team
          </Link>
        </motion.div>
      </div>

      {/* ================= VALUES ================= */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 grid grid-cols-1 sm:grid-cols-3 gap-12">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white/5 rounded-3xl border border-gray-700 p-8 backdrop-blur-xl shadow-lg shadow-red-600/20 text-center"
          >
            {i === 0 && (
              <>
                <h4 className="text-2xl font-semibold text-red-500 mb-4">
                  Innovation
                </h4>
                <p className="text-gray-300">
                  We embrace creativity and forward-thinking solutions, pushing
                  boundaries to deliver remarkable outcomes.
                </p>
              </>
            )}
            {i === 1 && (
              <>
                <h4 className="text-2xl font-semibold text-red-500 mb-4">
                  Integrity
                </h4>
                <p className="text-gray-300">
                  We operate with transparency, honesty, and ethical practices
                  in all client interactions.
                </p>
              </>
            )}
            {i === 2 && (
              <>
                <h4 className="text-2xl font-semibold text-red-500 mb-4">
                  Excellence
                </h4>
                <p className="text-gray-300">
                  We strive for the highest quality, ensuring every project
                  reflects our commitment to perfection.
                </p>
              </>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-lg px-4"
            onClick={() => setActiveMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-b from-[#111] to-[#000] border border-red-600/30 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveMember(null)}
                aria-label="Close"
                className="
                    absolute top-4 right-4 z-20
                    w-10 h-10
                    flex items-center justify-center
                    rounded-full
                   bg-black/60 backdrop-blur-md
                    border border-red-700
                   text-white
                   hover:bg-red-600 hover:border-red-500
                    transition
                 "
              >
                ✕
              </button>

              {/* Image */}
              <div className="relative h-72 w-full">
                <Image
                  src={activeMember.image}
                  alt={activeMember.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-red-500 mb-2">
                  {activeMember.name}
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  {activeMember.designation}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {activeMember.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
