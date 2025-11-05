"use client";
import { useState, useEffect } from "react";
import { BiMessageDetail, BiSearch, BiCheckDouble } from "react-icons/bi";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { motion } from "framer-motion";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch("/api/messages");
        const data = await res.json();
        setMessages(data || []);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    }
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FaEnvelopeOpenText className="text-red-500" /> User Messages
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:border-red-500"
            />
            <BiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMessages.map((msg, i) => {
            const isSeen = msg?.seen; // assume your model has a "seen" boolean
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`relative rounded-2xl p-5 border shadow-lg transition-all duration-300 
                  ${
                    isSeen
                      ? "bg-gray-900/60 border-gray-800 hover:border-gray-700"
                      : "bg-gradient-to-br from-gray-900 to-red-950/40 border-red-700 shadow-red-500/20 hover:shadow-red-600/40"
                  } hover:-translate-y-1`}
              >
                {/* Seen / Unseen Badge */}
                {!isSeen ? (
                  <span className="absolute top-3 right-3 bg-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                    Unread
                  </span>
                ) : (
                  <BiCheckDouble className="absolute top-3 right-3 text-green-500 text-xl" />
                )}

                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <h2
                    className={`font-semibold text-lg ${
                      isSeen ? "text-gray-400" : "text-red-400"
                    }`}
                  >
                    {msg.name}
                  </h2>
                  <BiMessageDetail
                    className={`text-xl ${
                      isSeen ? "text-gray-500" : "text-red-400"
                    }`}
                  />
                </div>

                <p
                  className={`text-sm mb-2 ${
                    isSeen ? "text-gray-500" : "text-gray-300"
                  }`}
                >
                  {msg.email}
                </p>

                <div
                  className={`mt-3 text-sm leading-relaxed line-clamp-4 ${
                    isSeen ? "text-gray-500" : "text-gray-200"
                  }`}
                >
                  {msg.message}
                </div>
              </motion.div>
            );
          })}

          {/* Empty state */}
          {filteredMessages.length === 0 && (
            <p className="text-center text-gray-500 col-span-full mt-10">
              No messages found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
