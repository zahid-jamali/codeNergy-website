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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [servicesData, setServicesData] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const message = `Send Quate from the Home page slider form, for the category:${selectedCategory}, subcategory:${selectedSubcategory} and service:${selectedService}!!!`;

  useEffect(() => {
    fetch("/api/services/forNavbar")
      .then((res) => res.json())
      .then((data) => setServicesData(data));
  }, []);

  const categories = Object.keys(servicesData);

  const subcategories = servicesData[selectedCategory]?.subcategories
    ? Object.keys(servicesData[selectedCategory].subcategories)
    : [];

  const services =
    selectedCategory &&
    selectedSubcategory &&
    servicesData[selectedCategory]?.subcategories?.[selectedSubcategory]
      ? servicesData[selectedCategory].subcategories[selectedSubcategory]
          .services
      : [];

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
          message: message,
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
    <div className="relative   w-full overflow-hidden flex items-center ">
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

      <div className="relative pt-24 md:pt-0 z-10 w-full">
        <div className="grid  grid-cols-1 md:grid-cols-2 w-[90%] m-auto items-center">
          {/* LEFT CONTENT – Full Left */}
          <div className="flex flex-col justify-center text-white max-w-2xl">
            <motion.h5
              key={`small-${currentSlide.id}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-red-500 font-semibold tracking-[4px] mb-4 uppercase"
            >
              Best IT Solution
            </motion.h5>

            <motion.h1
              key={`title-${currentSlide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight"
            >
              {currentSlide.title}
            </motion.h1>

            <motion.p
              key={`text-${currentSlide.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-6 text-lg text-gray-200 leading-relaxed max-w-xl"
            >
              {currentSlide.text}
            </motion.p>
          </div>

          {/* RIGHT QUOTE FORM – Full Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="ml-auto w-full max-w-[350px] mt-12 md:mt-20 bg-white/5 backdrop-blur-2xl 
                 border border-white/10 rounded-3xl 
                 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              Request a Quote
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20
                     text-white placeholder-gray-300
                     focus:ring-2 focus:ring-red-500 focus:outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20
                     text-white placeholder-gray-300
                     focus:ring-2 focus:ring-red-500 focus:outline-none"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20
                     text-white placeholder-gray-300
                     focus:ring-2 focus:ring-red-500 focus:outline-none"
              />

              {/* CATEGORY */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory("");
                  setSelectedService("");
                }}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20
               text-white focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option value="" className="text-black">
                  Select Category
                </option>
                {categories.map((cat) => (
                  <option
                    key={cat}
                    value={servicesData[cat].title}
                    className="text-black"
                  >
                    {servicesData[cat].title}
                  </option>
                ))}
              </select>

              {/* SUBCATEGORY */}
              {selectedCategory && (
                <select
                  value={selectedSubcategory}
                  onChange={(e) => {
                    setSelectedSubcategory(e.target.value);
                    setSelectedService("");
                  }}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20
                 text-white focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="" className="text-black">
                    Select Subcategory
                  </option>
                  {subcategories.map((sub) => (
                    <option
                      key={sub}
                      value={
                        servicesData[selectedCategory].subcategories[sub].title
                      }
                      className="text-black"
                    >
                      {servicesData[selectedCategory].subcategories[sub].title}
                    </option>
                  ))}
                </select>
              )}

              {/* SERVICE */}
              {selectedSubcategory && (
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20
                 text-white focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="" className="text-black">
                    Select Service
                  </option>
                  {services.map((service) => (
                    <option
                      key={service.href}
                      value={service.name}
                      className="text-black"
                    >
                      {service.name}
                    </option>
                  ))}
                </select>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`mt-2 w-full py-3 text-white rounded-xl font-semibold transition
            ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-700"
            }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send Quote"
                )}
              </button>
            </form>

            {successMessage && (
              <p className="mt-4 text-green-300 text-center font-medium">
                {successMessage}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
