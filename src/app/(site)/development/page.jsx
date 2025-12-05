"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaLaptopCode, FaCogs, FaTools, FaCloud } from "react-icons/fa";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const serviceCards = [
    {
      id: 1,
      icon: <FaLaptopCode className="text-5xl text-red-500 mb-4" />,
      title: "Custom Software Development",
      text: "We engineer robust, scalable and high-performance applications tailored to your exact business needs.",
    },
    {
      id: 2,
      icon: <FaCogs className="text-5xl text-red-500 mb-4" />,
      title: "System Architecture & API",
      text: "We design secure and efficient architectures, microservices and APIs that enable seamless integrations.",
    },
    {
      id: 3,
      icon: <FaTools className="text-5xl text-red-500 mb-4" />,
      title: "Full-Stack Web Development",
      text: "From UI to backend to database, we build complete solutions with clean code, high speed and reliability.",
    },
    {
      id: 4,
      icon: <FaCloud className="text-5xl text-red-500 mb-4" />,
      title: "Deployment & DevOps",
      text: "We deploy on cloud infrastructure with CI/CD pipelines, ensuring stability, performance and zero downtime.",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/services/category/development");
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
    router.push(`/development/${service._id}`);
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
    <section className=" text-white min-h-screen">
      {/* 🌟 HERO SECTION */}
      <div className="relative w-full min-h-[60vh] flex flex-col md:flex-row items-center  gap-10  py-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl  text-center md:text-left md:ml-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Transforming Ideas Into{" "}
            <span className="text-red-500">Powerful Products</span>
          </h1>
          <p className="text-gray-400 text-lg">
            We design, develop and deliver powerful applications that are fast,
            scalable and aligned with your business goals.
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
          className="relative w-80 h-80 md:w-[400px] md:h-[400px] m-auto md:pl-46"
        >
          <Image
            src="/images/development.png"
            alt="Development Services"
            fill
            className="object-contain rounded-xl shadow-2xl shadow-gray-600"
          />
        </motion.div>
      </div>

      {/* 🧩 SERVICES GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Developers <span className="text-red-500">Hub </span>
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
                  <img
                    src={service.image}
                    alt={service.title}
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

      {/* Service Cards */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceCards.map((srv) => (
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

      {/* ✨ CALL TO ACTION */}
      <div className="text-center py-20  border-t border-zinc-800">
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
