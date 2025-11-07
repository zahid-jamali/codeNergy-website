"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

/** Utility: Render Slate JSON */
const renderSlateContent = (content) => {
  try {
    const parsed = JSON.parse(content);
    return parsed.map((block, i) => (
      <div key={i} className="mb-3">
        {block.children.map((child, j) => {
          if (child.text.trim() === "") return null;
          let Tag = "p";
          if (block.type === "heading-one") Tag = "h1";
          else if (block.type === "heading-two") Tag = "h2";
          else if (block.type === "bulleted-list") Tag = "ul";
          else if (block.type === "list-item") Tag = "li";

          return (
            <Tag
              key={j}
              className={`leading-relaxed ${
                block.type?.includes("heading")
                  ? "text-xl font-semibold text-red-500"
                  : "text-gray-300"
              }`}
            >
              {child.text}
            </Tag>
          );
        })}
      </div>
    ));
  } catch (err) {
    return <p className="text-gray-400">{content}</p>;
  }
};

export default function ServiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [service, setService] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const saved = sessionStorage.getItem("selectedService");
    if (saved) {
      setService(JSON.parse(saved));
    } else {
      fetch(`/api/services/${params.id}`)
        .then((res) => res.json())
        .then((data) => setService(data))
        .catch(() => router.push("/services"));
    }
  }, [params.id, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          serviceId: service._id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({
          type: "success",
          message: "✅ Appointment booked successfully!",
        });
        setForm({ name: "", email: "", date: "", time: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong. Try again.",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "Server not responding. Please try later.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!service) {
    return (
      <div className="bg-black text-white flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <section className="bg-black text-white min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Image Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-96 rounded-2xl overflow-hidden mb-12 shadow-lg"
        >
          <Image
            src={service.image}
            alt={service.title}
            width={400}
            height={400}
            className="m-auto object-cover"
          />
        </motion.div>

        {/* Title and Short Description */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 text-red-500">
            {service.title}
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Long Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-semibold text-red-500 mb-4">
              About this Service
            </h2>
            <div className="space-y-3 text-gray-300">
              {renderSlateContent(service.longDescription)}
            </div>
          </motion.div>

          {/* Appointment Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-red-500 mb-6">
              Schedule an Appointment
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                />
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message (optional)"
                rows="3"
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-bold transition-colors ${
                  loading
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-500"
                }`}
              >
                {loading ? "Booking..." : "Book Appointment"}
              </button>
            </form>

            {status.message && (
              <p
                className={`mt-4 text-center font-medium ${
                  status.type === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {status.message}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
