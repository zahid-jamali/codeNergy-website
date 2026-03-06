"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaRobot, FaBrain, FaChartLine, FaDatabase } from "react-icons/fa";
import Loading from "@/components/Loading";

export default function AISolutionsPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const serviceCards = [
    {
      id: 1,
      icon: <FaRobot className="text-5xl text-red-500 mb-4" />,
      title: "AI Automation",
      text: "Automate repetitive business tasks using intelligent AI systems that improve efficiency and reduce operational costs.",
    },
    {
      id: 2,
      icon: <FaBrain className="text-5xl text-red-500 mb-4" />,
      title: "Machine Learning Models",
      text: "Custom machine learning models designed to extract insights, predict trends, and power intelligent applications.",
    },
    {
      id: 3,
      icon: <FaChartLine className="text-5xl text-red-500 mb-4" />,
      title: "Predictive Analytics",
      text: "Turn your business data into actionable insights with predictive analytics that supports smarter decisions.",
    },
    {
      id: 4,
      icon: <FaDatabase className="text-5xl text-red-500 mb-4" />,
      title: "Data Intelligence",
      text: "Transform raw data into strategic assets through advanced data processing, visualization, and business intelligence.",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const encoded = encodeURIComponent("AI & Data Solutions");
        const res = await fetch(`/api/services/category/${encoded}`);
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
    router.push(`/ai-solutions/${service._id}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="text-white min-h-screen">
      {/* HERO SECTION */}
      <div className="relative w-full min-h-[60vh] flex flex-col md:flex-row items-center gap-10 py-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center md:text-left md:ml-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Intelligent
            <span className="text-red-500"> AI Solutions </span>
            For Modern Businesses
          </h1>

          <p className="text-gray-400 text-lg">
            We build advanced AI and machine learning solutions that transform
            data into intelligence, automate workflows, and create powerful
            digital products for the future.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-8 bg-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-500 transition"
            onClick={() => router.push("/contactus")}
          >
            Discuss Your AI Project
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-80 h-80 md:w-[400px] md:h-[400px] m-auto md:pl-46"
        >
          <Image
            src="/images/ai.jpg"
            alt="AI Solutions"
            fill
            className="object-contain rounded-xl shadow-2xl shadow-gray-500"
          />
        </motion.div>
      </div>

      {/* SERVICES GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          AI & Data <span className="text-red-500">Capabilities</span>
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

      {/* FEATURE CARDS */}
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

              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-red-600 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-20 border-t border-zinc-800">
        <h3 className="text-3xl font-bold mb-4">
          Ready to integrate AI into your business?
        </h3>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Our AI experts design intelligent systems that automate workflows,
          analyze complex data, and unlock new opportunities for innovation.
        </p>

        <button
          onClick={() => router.push("/contact")}
          className="mt-8 bg-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-500 transition"
        >
          Start Your AI Journey
        </button>
      </div>
    </section>
  );
}
