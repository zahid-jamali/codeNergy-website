"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 added loading state
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
        setLoading(false); // 👈 stop loading when done
      }
    }
    fetchData();
  }, []);

  const handleServiceClick = (service) => {
    sessionStorage.setItem("selectedService", JSON.stringify(service));
    router.push(`/services/${service._id}`);
  };

  // 👇 Show Loader Until Data is Loaded
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg tracking-wide">Loading services...</p>
      </div>
    );
  }

  return (
    <section className="bg-black text-white min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold text-center mb-12"
        >
          <span className="text-red-500">Our</span> Premium Services
        </motion.h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              onClick={() => handleServiceClick(service)}
              className="bg-gray-900/70 border border-gray-800 rounded-2xl overflow-hidden hover:shadow-[0_0_25px_-5px_rgba(239,68,68,0.6)] transition-all duration-500 cursor-pointer"
            >
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-semibold text-red-500 mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-400 line-clamp-4 text-sm">
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
      </div>
    </section>
  );
}
