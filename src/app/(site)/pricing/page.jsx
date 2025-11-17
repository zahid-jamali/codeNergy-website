"use client";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaRocket,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";
import { useState } from "react";
import StatsSection from "@/components/landings/StatsSection";

export default function NextGenPricing() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, page: "From Prices Page" }),
      });
      if (!res.ok) throw new Error("Failed to book appointment");
      setForm({ name: "", email: "", message: "", date: "", time: "" });
      setSuccess(
        "Appointment booked successfully! Our team will contact you soon."
      );
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-black to-black"></div>
      <div className="absolute top-1/3 left-1/2 w-[700px] h-[700px] bg-red-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto text-center px-6 py-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
        >
          CodeNergy <span className="text-red-500">Next-Gen Solutions</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto"
        >
          Starting at <span className="text-red-500 font-semibold">$100</span>.
          Custom solutions for startups, growth, and enterprises. Discuss your
          project and schedule a consultation to unlock your full potential.
        </motion.p>
      </div>

      {/* Features / Highlights */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        {[
          {
            icon: <FaRocket />,
            title: "Rapid Deployment",
            desc: "Launch your project faster than ever with our optimized workflow and expert team.",
          },
          {
            icon: <FaShieldAlt />,
            title: "Security & Reliability",
            desc: "Enterprise-grade security and performance for long-term peace of mind.",
          },
          {
            icon: <FaChartLine />,
            title: "Scalable Growth",
            desc: "From small startups to large enterprises, scale effortlessly with tailored solutions.",
          },
          {
            icon: <FaCalendarAlt />,
            title: "Dedicated Support",
            desc: "Get personalized assistance and guidance from our expert consultants.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="flex flex-col items-start bg-white/5 p-8 rounded-3xl backdrop-blur-xl border border-gray-700 hover:border-red-500 transition-all duration-500 shadow-lg shadow-red-600/20"
          >
            <div className="text-red-500 text-4xl mb-4">{item.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Appointment / Contact Form */}
      <motion.div
        id="appointment"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl mx-auto px-6 py-20 bg-black/50 backdrop-blur-2xl rounded-3xl border border-gray-700 shadow-lg shadow-red-600/20 mt-24"
      >
        <h2 className="text-4xl font-bold text-red-500 mb-6 flex items-center gap-3">
          <FaCalendarAlt /> Schedule an Appointment
        </h2>
        <p className="text-gray-400 mb-8">
          Discuss your project, clarify pricing, or get expert advice. Fill out
          this form and our team will reach out promptly.
        </p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-5 py-4 rounded-xl bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-5 py-4 rounded-xl bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 outline-none"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 outline-none"
            required
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 outline-none"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            placeholder="Tell us about your project..."
            className="w-full px-5 py-4 rounded-xl bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 outline-none"
          ></textarea>

          {success && <p className="text-green-400 font-medium">{success}</p>}
          {error && <p className="text-red-500 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-500 transition-all duration-300 shadow-md shadow-red-600/40 disabled:opacity-50"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </motion.div>

      {/* Footer / Trust Badges */}
      <StatsSection />
    </section>
  );
}
