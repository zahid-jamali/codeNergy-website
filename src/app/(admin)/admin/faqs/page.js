"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { redirect } from "next/dist/server/api-utils";

// export const dynamic = "force-dynamic";

export default function FaqsAdminPage() {
  const [faqs, setFaqs] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    question: "",
    answer: "",
    visible: true,
    order: 0,
    category: "General",
  });
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await fetch("/api/faqs?sort=order");
      const data = await res.json();
      setFaqs(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setForm({
      question: "",
      answer: "",
      visible: true,
      order: 0,
      category: "General",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) {
      setMsg("Question and Answer are required.");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      const url = editingId ? `/api/faqs/${editingId}` : "/api/faqs";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMsg(editingId ? "Updated successfully." : "Added successfully.");
      resetForm();
      fetchFaqs();
    } catch (err) {
      console.error(err);
      setMsg(err.message || "Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      question: item.question,
      answer: item.answer,
      visible: item.visible,
      order: item.order,
      category: item.category || "General",
    });
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this FAQ?")) return;
    try {
      await fetch(`/api/faqs/${id}`, { method: "DELETE" });
      setMsg("Deleted.");
      fetchFaqs();
    } catch (err) {
      console.error(err);
      setMsg("Delete failed.");
    }
  };

  const toggleVisible = async (id, current) => {
    try {
      await fetch(`/api/faqs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible: !current }),
      });
      fetchFaqs();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(q.toLowerCase()) ||
      (f.answer || "").toLowerCase().includes(q.toLowerCase()) ||
      (f.category || "").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-black via-slate-900 to-black text-white">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-red-500">
              FAQ Management
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Create, edit, reorder and publish FAQs for your site.
            </p>
          </div>

          <div className="w-64">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500"
            />
          </div>
        </header>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mb-8 shadow-lg"
        >
          <div className="grid gap-3">
            <input
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              placeholder="Question"
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
            <textarea
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              placeholder="Answer (you can use simple HTML or markdown)"
              rows={6}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Category"
                className="px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
              />
              <input
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm({ ...form, order: Number(e.target.value) })
                }
                className="w-32 px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                placeholder="Order"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.visible}
                  onChange={(e) =>
                    setForm({ ...form, visible: e.target.checked })
                  }
                />
                <span className="text-sm text-gray-300">Visible</span>
              </label>
            </div>

            {msg && (
              <div className="text-center py-2 rounded-md bg-gray-800 text-sm">
                {msg}
              </div>
            )}

            <div className="flex gap-3 justify-end">
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setMsg("");
                  }}
                  className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
                >
                  <FaTimes /> Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-md font-semibold ${
                  loading ? "bg-gray-600" : "bg-red-600 hover:bg-red-500"
                }`}
              >
                {loading ? (
                  "Saving..."
                ) : editingId ? (
                  "Update FAQ"
                ) : (
                  <>
                    <FaPlus className="inline mr-2" /> Add FAQ
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.form>

        {/* FAQ List */}
        <div className="grid gap-4">
          {filtered.map((f, i) => (
            <motion.div
              key={f._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`p-5 rounded-2xl border ${
                f.visible
                  ? "border-zinc-700 bg-zinc-900"
                  : "border-gray-700 bg-gray-900/50"
              } shadow-sm`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{f.question}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {f.category} • {new Date(f.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    title={f.visible ? "Set invisible" : "Set visible"}
                    onClick={() => toggleVisible(f._id, f.visible)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      f.visible
                        ? "bg-green-700/20 text-green-300"
                        : "bg-yellow-700/20 text-yellow-300"
                    }`}
                  >
                    {f.visible ? (
                      <>
                        <FaCheck className="inline mr-1" /> Visible
                      </>
                    ) : (
                      "Hidden"
                    )}
                  </button>

                  <button
                    onClick={() => handleEdit(f)}
                    className="text-blue-400 hover:text-blue-300 px-3 py-1 rounded-md"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(f._id)}
                    className="text-red-400 hover:text-red-300 px-3 py-1 rounded-md"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className="mt-3 text-gray-300 prose prose-invert max-w-none">
                {/* Show answer (rendering raw HTML is possible but be careful with XSS) */}
                <div dangerouslySetInnerHTML={{ __html: f.answer }} />
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-gray-500 py-6">No FAQs found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
