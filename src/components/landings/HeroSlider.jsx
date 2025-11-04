"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import Modal from "react-modal";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "IT Solutions For Your Company",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
    image: "/images/slider1.jpg",
  },
  {
    id: 2,
    title: "Empowering Digital Growth",
    text: "We deliver smart and reliable IT solutions to elevate your business digitally.",
    image: "/images/slider2.jpg",
  },
  {
    id: 3,
    title: "Transform Ideas Into Reality",
    text: "From concept to code, we create impactful solutions for your company success.",
    image: "/images/slider3.jpg",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[current];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Zoom and Fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <Image
            src={currentSlide.image}
            alt="Slide Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-10 md:px-20 text-white">
        <motion.h5
          key={`small-${currentSlide.id}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-red-500 font-semibold tracking-widest mb-2"
        >
          BEST IT SOLUTION
        </motion.h5>

        <motion.h1
          key={`title-${currentSlide.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight"
        >
          {currentSlide.title.split(" ").map((word, i) => (
            <span key={i} className={word === "Company" ? "text-red-500" : ""}>
              {word}{" "}
            </span>
          ))}
        </motion.h1>

        <motion.p
          key={`text-${currentSlide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-2xl mt-6 text-lg text-gray-300"
        >
          {currentSlide.text}
        </motion.p>

        {/* Buttons */}
        <div className="mt-10 flex items-center gap-6">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 uppercase">
            Meet With Us
          </button>
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer flex items-center justify-center w-14 h-14 rounded-full bg-white/10 border border-white/30 relative"
          >
            <FaPlay className="text-white text-xl" />
            <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping"></span>
          </div>
        </div>
      </div>

      {/* YouTube Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="flex justify-center items-center h-full"
        overlayClassName="fixed inset-0 bg-black/80 flex justify-center items-center"
      >
        <div className="relative w-[90%] md:w-[60%] aspect-video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <button
            className="absolute -top-10 right-0 text-white text-2xl"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>
      </Modal>
    </div>
  );
}
