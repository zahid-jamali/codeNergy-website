"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import SlateDisplay from "@/components/admin/SlateDisplay";
import PortfolioProjects from "@/components/PortfolioProjects";
import Loading from "@/components/Loading";
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
    fetch(`/api/services/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch(() => router.push("/services"));
  }, []);

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
    return <Loading />;
  }

  return (
    <section className="bg-black text-white min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HERO IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl mb-16 border border-zinc-800"
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            sizes="(max-width:768px) 100vw, (max-width:1200px) 80vw, 1200px"
            className="object-cover"
          />
        </motion.div>

        {/* TITLE SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-red-500">{service.title}</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* PORTFOLIO */}
        <PortfolioProjects />

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-2 gap-12 mt-20 items-start">
          {/* SERVICE DETAILS */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 lg:p-10 shadow-xl"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-red-500 mb-6">
              About This Service
            </h2>

            <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
              {service.sideDescription}
            </div>
          </motion.div>

          {/* APPOINTMENT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 lg:p-10 shadow-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-red-500 mb-8">
              Schedule a Consultation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition"
                />

                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition"
                />
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message (optional)"
                rows="4"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  loading
                    ? "bg-zinc-700 cursor-not-allowed"
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

        {/* LONG CONTENT */}
        <div className="mt-24 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
            How We Deliver Results
          </h2>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 lg:p-12 shadow-xl text-gray-300 leading-relaxed">
            <SlateDisplay value={service.longDescription} />
          </div>
        </div>
      </div>
    </section>
  );
}
