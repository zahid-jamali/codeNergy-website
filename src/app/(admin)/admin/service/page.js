"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrashAlt, FaPlusCircle } from "react-icons/fa";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !title || !description) {
      setMsg("All fields are required.");
      return;
    }
    setLoading(true);
    setMsg("");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    const res = await fetch("/api/services", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setMsg("✅ Service added successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
      fetchServices();
    } else {
      setMsg("❌ Failed to add service.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    fetchServices();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <FaPlusCircle className="text-red-500" /> Manage Services
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-2xl border border-gray-800 mb-10"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Service Title"
              className="p-3 bg-gray-800 rounded-lg focus:outline-none border border-gray-700 focus:border-red-500"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-red-500"
            />
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Service Description"
            className="w-full mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-red-500"
            rows={4}
          ></textarea>

          {msg && (
            <p className="mt-3 text-sm text-center text-gray-300 bg-gray-800 py-2 rounded-lg">
              {msg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full sm:w-auto px-10 py-3 bg-red-600 rounded-lg font-bold hover:bg-red-500 transition-all"
          >
            {loading ? "Uploading..." : "Add Service"}
          </button>
        </form>

        {/* Service Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, i) => (
            <motion.div
              key={srv._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-900 p-5 rounded-2xl border border-gray-800 shadow-lg hover:shadow-red-600/20 transition"
            >
              <img
                src={srv.image}
                alt={srv.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="font-semibold text-lg text-red-400 mb-2">
                {srv.title}
              </h2>
              <p className="text-gray-400 text-sm">{srv.description}</p>
              <button
                onClick={() => handleDelete(srv._id)}
                className="mt-4 flex items-center gap-2 text-red-500 hover:text-red-400"
              >
                <FaTrashAlt /> Delete
              </button>
            </motion.div>
          ))}
        </div>

        {services.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No services added yet.
          </p>
        )}
      </div>
    </div>
  );
}
