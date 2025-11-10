"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ServicesCarousel(Services) {
  const [services, setServices] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (Services !== undefined) setServices(Services?.Services);
  }, [Services]);

  const handleServiceClick = (service) => {
    sessionStorage.setItem("selectedService", JSON.stringify(service));
    router.push(`/services/${service._id}`);
  };
  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.1),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-4xl sm:text-5xl font-extrabold mb-14 tracking-tight"
        >
          <span className="text-white">Explore Our </span>
          <span className="text-red-500">Services</span>
        </motion.h2>

        {/* Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
          spaceBetween={35}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {Array.isArray(services) &&
            services.map((service, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -6 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="relative bg-gradient-to-b from-gray-900 to-gray-950 rounded-3xl border border-gray-800 shadow-lg overflow-hidden group h-full flex flex-col"
                  onClick={() => handleServiceClick(service)}
                >
                  {/* Image */}
                  <div className="h-52 overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between flex-1 p-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
                        {service.description}
                      </p>
                    </div>

                    <Link href={`/services/${service._id}`} className="mt-5">
                      <motion.button
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
                      >
                        View Details <FaArrowRight className="text-sm" />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}
