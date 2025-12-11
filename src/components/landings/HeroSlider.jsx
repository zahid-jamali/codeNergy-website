"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Innovative IT Solutions",
    text: "We provide cutting-edge IT solutions tailored to your business needs, helping you stay ahead in the digital world.",
    image: "/images/slider1.jpg",
  },
  {
    id: 2,
    title: "Driving Digital Transformation",
    text: "Our expert team empowers businesses to embrace digital transformation with reliable and scalable technology solutions.",
    image: "/images/slider2.jpg",
  },
  {
    id: 3,
    title: "From Ideas to Impact",
    text: "We turn your ideas into real-world applications, delivering impactful solutions that drive growth and efficiency.",
    image: "/images/slider3.jpg",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "Send Quate from the Home page slider form!!!",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[current];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      setLoading(false);
      setSuccessMessage("Your quote request has been successfully submitted!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: formData.message,
      });
    } catch (error) {
      setLoading(false);
      setSuccessMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center ">
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/50" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-20 w-full items-center">
        {/* Left Content */}
        <div className="flex flex-col justify-center text-white max-w-xl">
          <motion.h5
            key={`small-${currentSlide.id}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-red-500 font-semibold tracking-[4px] mb-3 uppercase"
          >
            Best IT Solution
          </motion.h5>

          <motion.h1
            key={`title-${currentSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-2xl"
          >
            {currentSlide.title}
          </motion.h1>

          <motion.p
            key={`text-${currentSlide.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 text-lg text-gray-200 leading-relaxed drop-shadow"
          >
            {currentSlide.text}
          </motion.p>
        </div>

        {/* Right Quote Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5  backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.4)] w-full max-w-md"
        >
          <h3 className="text-3xl font-bold mb-6 text-white tracking-wide">
            Request a Quote
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-semibold py-4 rounded-xl text-lg shadow-lg transition 
                ${
                  loading
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Sending...
                </span>
              ) : (
                "Send Quote"
              )}
            </button>
          </form>

          {/* Success Message */}
          {successMessage && (
            <p className="mt-4 text-green-300 text-lg font-medium">
              {successMessage}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
