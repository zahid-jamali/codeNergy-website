"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const dynamic = "force-dynamic";

export default function TeamAdminPage() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    contact: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const fetchMembers = async () => {
    const res = await fetch("/api/team");
    const data = await res.json();
    setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));

    const res = await fetch("/api/team", {
      method: "POST",
      body: fd,
    });

    setLoading(false);
    if (res.ok) {
      alert("Member Added ✅");
      setForm({
        name: "",
        designation: "",
        contact: "",
        description: "",
        image: null,
      });
      fetchMembers();
    } else {
      alert("Error adding member ❌");
    }
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold text-red-500 mb-6">Team Management</h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 p-6 rounded-2xl shadow-lg mb-8"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-2 rounded bg-zinc-800"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Designation"
            className="p-2 rounded bg-zinc-800"
            value={form.designation}
            onChange={(e) => setForm({ ...form, designation: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contact"
            className="p-2 rounded bg-zinc-800"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            className="p-2 rounded bg-zinc-800"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />
        </div>

        <textarea
          placeholder="Description"
          className="w-full mt-4 p-2 rounded bg-zinc-800"
          rows="3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button
          disabled={loading}
          className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold"
        >
          {loading ? "Uploading..." : "Add Member"}
        </button>
      </motion.form>

      <div className="grid md:grid-cols-3 gap-6">
        {members.map((m) => (
          <motion.div
            key={m._id}
            whileHover={{ scale: 1.05 }}
            className="bg-zinc-900 p-4 rounded-2xl text-center shadow-lg"
          >
            <img
              src={m.image}
              alt={m.name}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-3 border border-red-600"
            />
            <h2 className="text-xl font-bold">{m.name}</h2>
            <p className="text-red-400">{m.designation}</p>
            <p className="text-sm mt-2">{m.description}</p>
            <p className="text-zinc-500 text-xs mt-2">{m.contact}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
