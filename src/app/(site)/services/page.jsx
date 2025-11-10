"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleServiceClick = (service) => {
    sessionStorage.setItem("selectedService", JSON.stringify(service));
    router.push(`/services/${service._id}`);
  };

  // 🌀 Loader Screen
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg tracking-wide">Loading services...</p>
      </div>
    );
  }

  return (
    <section className="bg-black text-white min-h-screen">
      {/* 🌟 HERO SECTION */}
      <div className="relative w-full min-h-[60vh] flex flex-col md:flex-row items-center justify-center gap-10 px-8 py-20 bg-gradient-to-b from-zinc-900 to-black">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Empower Your Business with{" "}
            <span className="text-red-500">Professional Digital Solutions</span>
          </h1>
          <p className="text-gray-400 text-lg">
            From web applications to AI integrations — we craft scalable,
            modern, and high-performance solutions tailored to your goals.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-8 bg-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-500 transition"
            onClick={() => router.push("/contactus")}
          >
            Get a Free Consultation
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-80 h-80 md:w-[400px] md:h-[400px]"
        >
          <Image
            src="/images/services-hero.png"
            alt="Professional Services"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* 🧩 SERVICES GRID */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          <span className="text-red-500">Our</span> Core Services
        </motion.h2>

        {services.length === 0 ? (
          <p className="text-center text-gray-500">
            No services available at the moment. Please check back later.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, i) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                onClick={() => handleServiceClick(service)}
                className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden 
                           hover:shadow-[0_0_25px_-5px_rgba(239,68,68,0.6)] transition-all duration-500 cursor-pointer"
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={service.image || "/assets/default-service.jpg"}
                    alt={service.title}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-red-500 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-4">
                    {service.description}
                  </p>
                </div>

                <div className="px-6 pb-6">
                  <button className="w-full bg-red-600 py-2 rounded-lg font-semibold hover:bg-red-500 transition-colors">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ✨ CALL TO ACTION */}
      <div className="text-center py-20 bg-zinc-900/70 border-t border-zinc-800">
        <h3 className="text-3xl font-bold mb-4">
          Ready to elevate your digital presence?
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Let’s build something exceptional together. Whether it's a full-scale
          web platform, mobile app, or branding — our expert team is ready.
        </p>
        <button
          onClick={() => router.push("/contact")}
          className="mt-8 bg-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-500 transition"
        >
          Contact Us Today
        </button>
      </div>
    </section>
  );
}
