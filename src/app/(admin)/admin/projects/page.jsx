"use client";

import { useEffect, useState } from "react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [category, setCategory] = useState(""); // TITLE
  const [subcategory, setSubcategory] = useState(""); // TITLE

  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    service: "", // SERVICE _id
  });

  /* ---------------- SERVICE CATEGORIES ---------------- */

  const serviceCategories = {
    development: {
      title: "Development",
      subcategories: {
        website: "Website Development",
        app: "App Development",
        software: "Software Development",
      },
    },
    marketing: {
      title: "Marketing & Branding",
      subcategories: {
        digital: "Digital Marketing",
        content: "Content Marketing",
        branding: "Brand Identity",
      },
    },
    outsourcing: {
      title: "Outsourcing Services",
      subcategories: {
        staff: "Staff Augmentation",
        support: "Business Support",
      },
    },
    technical: {
      title: "Technical Support",
      subcategories: {
        maintenance: "Website Maintenance",
        hosting: "Hosting Support",
      },
    },
  };

  /* ---------------- FETCH DATA ---------------- */

  const fetchProjects = async () => {
    setLoading(true);
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  const fetchServices = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    fetchProjects();
    fetchServices();
  }, []);

  /* ---------------- FILTER SERVICES (IMPORTANT) ---------------- */

  const filteredServices = services.filter(
    (s) => s.subcategory === subcategory
  );

  /* ---------------- ADD PROJECT ---------------- */

  const handleAddProject = async () => {
    if (!form.title || !form.description || !form.service || !imageFile) {
      alert("All fields are required");
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("service", form.service); // ObjectId
    fd.append("image", imageFile);

    const res = await fetch("/api/projects", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      const err = await res.json();
      console.error(err);
      alert("Upload failed");
      return;
    }

    setShowAddModal(false);
    setForm({ title: "", description: "", service: "" });
    setCategory("");
    setSubcategory("");
    setImageFile(null);
    fetchProjects();
  };

  /* ---------------- DELETE PROJECT ---------------- */

  const handleDelete = async () => {
    await fetch(`/api/projects/${deleteTarget}`, {
      method: "DELETE",
    });
    setDeleteTarget(null);
    fetchProjects();
  };

  if (loading) {
    return <p className="p-6 text-gray-400">Loading projects...</p>;
  }

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-red-600 px-5 py-2 rounded hover:bg-red-700"
        >
          + Add Project
        </button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-900">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Service</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id} className="border-t border-gray-800">
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.service?.title || "—"}</td>
                <td className="p-3">
                  <button
                    onClick={() => setDeleteTarget(p._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- ADD MODAL ---------------- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 w-full max-w-lg rounded-lg p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Add Project</h2>
              <button onClick={() => setShowAddModal(false)}>✕</button>
            </div>

            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full mb-3 bg-black border border-gray-700 p-2 rounded"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full mb-3 bg-black border border-gray-700 p-2 rounded"
            />

            <textarea
              rows={4}
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full mb-3 bg-black border border-gray-700 p-2 rounded"
            />

            {/* Category (TITLE) */}
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory("");
                setForm({ ...form, service: "" });
              }}
              className="w-full mb-3 bg-black border border-gray-700 p-2 rounded"
            >
              <option value="">Select Category</option>
              {Object.entries(serviceCategories).map(([key, cat]) => (
                <option key={key} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>

            {/* Subcategory (TITLE) */}
            {category && (
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full mb-3 bg-black border border-gray-700 p-2 rounded"
              >
                <option value="">Select Subcategory</option>
                {Object.entries(
                  Object.values(serviceCategories).find(
                    (c) => c.title === category
                  ).subcategories
                ).map(([key, title]) => (
                  <option key={key} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            )}

            {/* Service (_id) */}
            {category && subcategory && (
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full mb-4 bg-black border border-gray-700 p-2 rounded"
              >
                <option value="">Select Service</option>
                {filteredServices.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.title}
                  </option>
                ))}
              </select>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- DELETE MODAL ---------------- */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 w-full max-w-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-500 mb-3">
              Delete Project
            </h2>
            <p className="text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
