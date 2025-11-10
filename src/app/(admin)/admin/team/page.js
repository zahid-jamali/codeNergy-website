"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

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
  const [editMember, setEditMember] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMembers = async () => {
    const res = await fetch("/api/team");
    const data = await res.json();
    setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // ✅ ADD OR UPDATE MEMBER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));

    const url = editMember ? `/api/team/${editMember._id}` : "/api/team";
    const method = editMember ? "PUT" : "POST";

    const res = await fetch(url, { method, body: fd });
    setLoading(false);

    if (res.ok) {
      alert(editMember ? "Member Updated ✅" : "Member Added ✅");
      setForm({
        name: "",
        designation: "",
        contact: "",
        description: "",
        image: null,
      });
      setEditMember(null);
      fetchMembers();
    } else {
      alert("Error saving member ❌");
    }
  };

  // ✅ DELETE MEMBER
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Deleted successfully ✅");
      fetchMembers();
    } else alert("Error deleting ❌");
  };

  // ✅ HANDLE EDIT
  const startEdit = (member) => {
    setEditMember(member);
    setForm({
      name: member.name,
      designation: member.designation,
      contact: member.contact,
      description: member.description,
      image: null,
    });
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold text-red-500 mb-6 text-center">
        Team Management
      </h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 p-6 rounded-2xl shadow-lg mb-8 max-w-3xl mx-auto"
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

        <div className="flex justify-between items-center mt-4">
          <button
            disabled={loading}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold"
          >
            {loading
              ? "Saving..."
              : editMember
              ? "Update Member"
              : "Add Member"}
          </button>
          {editMember && (
            <button
              type="button"
              onClick={() => {
                setEditMember(null);
                setForm({
                  name: "",
                  designation: "",
                  contact: "",
                  description: "",
                  image: null,
                });
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </motion.form>

      {/* ✅ TEAM LIST */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {members.map((m) => (
            <motion.div
              key={m._id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.03 }}
              className="bg-zinc-900 p-5 rounded-2xl shadow-xl relative group"
            >
              <img
                src={m.image}
                alt={m.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-3 border-2 border-red-600"
              />
              <h2 className="text-xl font-bold">{m.name}</h2>
              <p className="text-red-400">{m.designation}</p>
              <p className="text-sm mt-2 text-zinc-300">{m.description}</p>
              <p className="text-zinc-500 text-xs mt-2">{m.contact}</p>

              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startEdit(m)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(m._id)}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-full"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
