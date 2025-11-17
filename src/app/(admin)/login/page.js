"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error);

    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      {/* Center Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          w-full max-w-md backdrop-blur-lg bg-[#111]/60 
          border border-red-700/40 rounded-2xl shadow-[0_0_20px_#ff000033] 
          p-8 space-y-7
        "
      >
        {/* Logo Placeholder */}
        <div className="flex flex-col items-center mb-2">
          <div className="w-20 h-20 rounded-full p-2 md:p-4  flex items-center justify-center shadow-[0_0_15px_#ff000088]">
            <Image
              src={"/logo.jpeg"}
              width={300}
              height={300}
              alt={"logo"}
              className="w-full  h-auto"
              priority
            />
          </div>
          <h2 className="text-3xl font-bold mt-4 tracking-wide text-red-500">
            Admin Panel
          </h2>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 bg-red-900/20 border border-red-800 px-3 py-2 rounded text-sm">
            {error}
          </p>
        )}

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full bg-[#0e0e0e] border border-gray-700 text-white 
              p-3 rounded-lg outline-none
              focus:border-red-500 focus:shadow-[0_0_8px_#ff0000]
              transition-all
            "
          />
          <label className="absolute -top-3 left-3 text-sm bg-black px-1 text-red-400">
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full bg-[#0e0e0e] border border-gray-700 text-white 
              p-3 rounded-lg outline-none
              focus:border-red-500 focus:shadow-[0_0_8px_#ff0000]
              transition-all
            "
          />
          <label className="absolute -top-3 left-3 text-sm bg-black px-1 text-red-400">
            Password
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="
            w-full py-3 rounded-lg font-bold text-lg 
            bg-red-600 hover:bg-red-700
            transition-all shadow-[0_0_10px_#ff000088]
          "
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 pt-1">
          Powered by{" "}
          <span className="text-red-500 font-semibold">CodeNergy</span>
        </p>
      </motion.form>
    </div>
  );
}
