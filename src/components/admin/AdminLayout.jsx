"use client";
import "./style.css";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaEnvelope,
  FaServicestack,
  FaQuestionCircle,
  FaCalendarCheck,
} from "react-icons/fa";
import { MdGroups, MdPeople } from "react-icons/md";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AdminPanelLayoutClient({ children, user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
      });

      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      sessionStorage.clear();

      // ✅ 4. Redirect
      if (res.ok) {
        router.push("/login");
      } else {
        alert("Logout failed. Try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error during logout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 250 : 80 }}
        className="bg-zinc-900 border-r border-zinc-800 flex flex-col transition-all duration-300"
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h1
            className={`text-xl font-bold text-red-500 transition-opacity duration-200 ${
              isSidebarOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            codeNergy
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white"
          >
            <FaBars size={20} />
          </button>
        </div>

        <nav className="flex-1 mt-4 space-y-2">
          <SidebarLink
            icon={<FaTachometerAlt size={20} />}
            label="Dashboard"
            open={isSidebarOpen}
            href="/admin/dashboard"
          />
          <SidebarLink
            icon={<MdPeople size={20} />}
            label="Users"
            open={isSidebarOpen}
            href="/admin/user"
          />
          <SidebarLink
            icon={<FaServicestack size={20} />}
            label="Services"
            open={isSidebarOpen}
            href="/admin/service"
          />
          <SidebarLink
            icon={<FaEnvelope size={20} />}
            label="Messages"
            open={isSidebarOpen}
            href="/admin/messages"
          />

          <SidebarLink
            icon={<FaUsers size={20} />}
            label="Teams"
            open={isSidebarOpen}
            href="/admin/team"
          />

          <SidebarLink
            icon={<FaCalendarCheck size={20} />}
            label="Appointments"
            open={isSidebarOpen}
            href="/admin/appointments"
          />
          <SidebarLink
            icon={<FaQuestionCircle size={20} />}
            label="FAQs"
            open={isSidebarOpen}
            href="/admin/faqs"
          />
          <SidebarLink
            icon={<FaCog size={20} />}
            label="Settings"
            open={isSidebarOpen}
            href="/admin/settings"
          />
        </nav>

        {/* Logout */}
        <div className="border-t border-zinc-800 p-4">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full flex items-center gap-4 px-4 py-2 text-gray-300 hover:bg-zinc-800 hover:text-white transition-all duration-200 disabled:opacity-50"
          >
            <FaSignOutAlt size={20} />
            {isSidebarOpen && (
              <span className="text-sm font-medium">
                {loading ? "Logging out..." : "Logout"}
              </span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-14 flex items-center justify-between bg-zinc-950 border-b border-zinc-800 px-6">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">{user?.name}</span>
            <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-bold">
              AJ
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto bg-zinc-950">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, open, href }) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 px-4 py-2 text-gray-300 hover:bg-zinc-800 hover:text-white transition-all duration-200"
    >
      {icon}
      {open && <span className="text-sm font-medium">{label}</span>}
    </a>
  );
}
