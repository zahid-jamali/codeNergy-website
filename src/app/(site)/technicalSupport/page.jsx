"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ServiceCards from "@/components/landings/ServiceCards";
import { FaHeadset, FaShieldAlt, FaTools, FaServer } from "react-icons/fa";
import Loading from "@/components/Loading";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const serviceCards = [
    {
      id: 1,
      icon: <FaHeadset className="text-5xl text-red-500 mb-4" />,
      title: "24/7 Customer Support",
      text: "Our team is available around the clock to assist with technical issues and ensure uninterrupted operations.",
    },
    {
      id: 2,
      icon: <FaShieldAlt className="text-5xl text-red-500 mb-4" />,
      title: "System Security & Monitoring",
      text: "We proactively monitor and secure your IT infrastructure to prevent threats and minimize downtime.",
    },
    {
      id: 3,
      icon: <FaTools className="text-5xl text-red-500 mb-4" />,
      title: "Troubleshooting & Maintenance",
      text: "Quick diagnosis and resolution of technical problems to keep your applications and systems running smoothly.",
    },
    {
      id: 4,
      icon: <FaServer className="text-5xl text-red-500 mb-4" />,
      title: "Server & Network Support",
      text: "Expert support for your servers, networks, and cloud infrastructure to ensure optimal performance and reliability.",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/services/category/technicalSupport");
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
    return <Loading />;
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
            Your Tech — Safe,{" "}
            <span className="text-red-500">Stable & Supported</span>
          </h1>
          <p className="text-gray-400 text-lg">
            We keep your systems running smoothly with fast, reliable and
            proactive technical assistance whenever you need it.
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
            src="/images/technicalSupport.png"
            alt="Technical Support Services"
            fill
            className="object-contain rounded-xl shadow-2xl shadow-gray-500"
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
          24/7 Tech Support You Can <span className="text-red-500"> Trust</span>
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

      {/* Service Cards  */}
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
