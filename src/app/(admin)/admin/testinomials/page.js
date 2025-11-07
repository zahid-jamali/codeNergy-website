"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaTrash, FaEdit, FaUserTie } from "react-icons/fa";

export const dynamic = "force-dynamic";

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    comment: "",
    rating: 5,
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch testimonials
  async function loadTestimonials() {
    const res = await fetch("/api/testinomials");
    const data = await res.json();
    setTestimonials(data);
  }

  useEffect(() => {
    loadTestimonials();
  }, []);

  // Add or Update testimonial
  async function handleSubmit(e) {
    e.preventDefault();
    const method = editingId ? "PATCH" : "POST";
    const url = editingId
      ? `/api/testinomials/${editingId}`
      : "/api/testinomials";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", role: "", comment: "", rating: 5 });
    setEditingId(null);
    loadTestimonials();
  }

  async function handleDelete(id) {
    await fetch(`/api/testinomials/${id}`, { method: "DELETE" });
    loadTestimonials();
  }

  function handleEdit(t) {
    setForm(t);
    setEditingId(t._id);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-red-500"
        >
          Manage Testimonials
        </motion.h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/80 p-6 rounded-2xl border border-gray-700 shadow-lg space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="p-2 bg-gray-800 rounded-lg w-full outline-none border border-gray-700 focus:border-red-500"
            />
            <input
              type="text"
              placeholder="Role (e.g. CEO, Client)"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              required
              className="p-2 bg-gray-800 rounded-lg w-full outline-none border border-gray-700 focus:border-red-500"
            />
          </div>

          <textarea
            placeholder="Comment"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            required
            rows={3}
            className="p-2 bg-gray-800 rounded-lg w-full outline-none border border-gray-700 focus:border-red-500"
          />

          <div className="flex items-center gap-3">
            <label className="text-gray-400 text-sm">Rating:</label>
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg p-1 text-sm focus:border-red-500"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition-all px-6 py-2 rounded-lg font-semibold shadow-lg"
          >
            {editingId ? "Update Testimonial" : "Add Testimonial"}
          </button>
        </form>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-900/70 border border-gray-800 rounded-2xl p-5 shadow-md hover:shadow-red-500/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg text-red-400 flex items-center gap-2">
                  <FaUserTie className="text-gray-400" /> {t.name}
                </h3>
                <div className="flex gap-2">
                  <FaEdit
                    onClick={() => handleEdit(t)}
                    className="cursor-pointer text-yellow-400 hover:text-yellow-300"
                  />
                  <FaTrash
                    onClick={() => handleDelete(t._id)}
                    className="cursor-pointer text-red-500 hover:text-red-400"
                  />
                </div>
              </div>
              <p className="text-gray-500 text-sm">{t.role}</p>
              <p className="text-gray-300 mt-2 text-sm leading-relaxed">
                {t.comment}
              </p>
              <div className="flex mt-3">
                {[...Array(t.rating)].map((_, j) => (
                  <FaStar key={j} className="text-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
