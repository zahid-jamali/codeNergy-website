"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTrashAlt, FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";

export const dynamic = "force-dynamic";

export default function AdminAppointmentsPage() {
  let user = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState("");

  // Fetch all appointments
  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch("/api/appointments");
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  const markDone = async (id) => {
    await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDone: true }),
    });
    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, isDone: true } : a))
    );
  };

  const deleteAppointment = async (id) => {
    if (!confirm("Delete this appointment?")) return;
    await fetch(`/api/appointments/${id}`, { method: "DELETE" });
    setAppointments((prev) => prev.filter((a) => a._id !== id));
  };

  if (loading) {
    return (
      <div className="bg-black text-white flex justify-center items-center min-h-screen">
        Loading appointments...
      </div>
    );
  }

  return (
    <section className="bg-black text-white min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-10 text-center text-red-500"
        >
          Appointment Management
        </motion.h1>

        <div className="overflow-x-auto bg-gray-900/70 rounded-2xl border border-gray-800 shadow-lg">
          <table className="w-full text-left text-gray-300">
            <thead className="bg-gray-800 text-sm uppercase text-gray-400">
              <tr>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Service / Page</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Time</th>
                <th className="py-4 px-6">Message</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <motion.tr
                  key={a._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t border-gray-800 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4 px-6 font-medium">{a.name}</td>
                  <td className="py-4 px-6">{a.email}</td>
                  <td className="py-4 px-6">
                    {a.serviceId?.title || a.page || "—"}
                  </td>
                  <td className="py-4 px-6">{a.date || "—"}</td>
                  <td className="py-4 px-6">{a.time || "—"}</td>
                  <td className="py-4 px-6 max-w-xs">
                    {a.message ? (
                      <div
                        className="truncate cursor-pointer"
                        title={a.message}
                        onClick={() => setSelectedMessage(a.message)}
                      >
                        {a.message}
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {a.isDone ? (
                      <span className="text-green-400 font-semibold">Done</span>
                    ) : (
                      <span className="text-yellow-400 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 flex gap-3 justify-end">
                    {!a.isDone && (
                      <button
                        onClick={() => markDone(a._id)}
                        className="text-green-500 hover:text-green-400 transition"
                        title="Mark Done"
                      >
                        <FaCheckCircle size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteAppointment(a._id)}
                      className="text-red-500 hover:text-red-400 transition"
                      title="Delete"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Message Modal */}
        {selectedMessage && (
          <div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
            onClick={() => setSelectedMessage("")}
          >
            <div className="bg-gray-900 rounded-xl p-6 max-w-lg w-full text-gray-100 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Message</h3>
              <p className="whitespace-pre-wrap">{selectedMessage}</p>
              <button
                className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-500 rounded-xl font-bold"
                onClick={() => setSelectedMessage("")}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
