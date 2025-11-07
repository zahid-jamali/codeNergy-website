"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserCog,
  FaTrashAlt,
  FaUserShield,
  FaUserPlus,
} from "react-icons/fa";

export const dynamic = "force-dynamic";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
    if (res.ok) {
      alert("User added ✅");
      setForm({ name: "", email: "", password: "", role: "user" });
      fetchUsers();
    } else alert("Failed to add user ❌");
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) fetchUsers();
  };

  const handleRoleChange = async (id, role) => {
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ role }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) fetchUsers();
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-red-500 flex items-center gap-2">
          <FaUserShield className="text-red-500" /> Manage Users
        </h1>
      </div>

      {/* Add User Form */}
      <motion.form
        onSubmit={handleAddUser}
        className="bg-zinc-900 p-6 rounded-2xl shadow-lg mb-8 grid md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <input
          type="text"
          placeholder="Name"
          className="p-2 rounded bg-zinc-800"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-zinc-800"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-zinc-800"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          disabled={loading}
          className="flex items-center justify-center bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
        >
          {loading ? (
            "Creating..."
          ) : (
            <>
              <FaUserPlus className="mr-2" /> Add User
            </>
          )}
        </button>
      </motion.form>

      {/* Users Table */}
      <div className="overflow-x-auto bg-zinc-900 rounded-2xl shadow-lg">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-zinc-800 text-left text-gray-300 uppercase text-xs">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <motion.tr
                key={u._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-zinc-800 hover:bg-zinc-800/70"
              >
                <td className="p-3 font-semibold">{u.name}</td>
                <td className="p-3 text-gray-400">{u.email}</td>
                <td className="p-3">
                  <select
                    className="bg-zinc-800 rounded p-1"
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-3 flex gap-3 items-center">
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <FaTrashAlt />
                  </button>
                  <FaUserCog className="text-gray-400" />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
