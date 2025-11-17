"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const user = useSelector((state) => state.user) || undefined;

  const [stats, setStats] = useState({
    users: 0,
    messages: 0,
    services: 0,
    appointments: 0,
    attendance: 0,
  });
  const [activities, setActivities] = useState([]);

  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);

  const quickActions = [
    { title: "Users", count: stats.users, icon: "👥", href: "/admin/users" },
    {
      title: "Messages",
      count: stats.messages,
      icon: "✉️",
      href: "/admin/messages",
    },
    {
      title: "Services",
      count: stats.services,
      icon: "🛠️",
      href: "/admin/services",
    },
    {
      title: "Appointments",
      count: stats.appointments,
      icon: "📅",
      href: "/admin/appointments",
    },
    { title: "Attendance", count: 0, icon: "👤", href: "#", comingSoon: true },
    { title: "Projects", count: 0, icon: "🚀", href: "#", comingSoon: true },
  ];

  // Fetch Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const res = await fetch("/api/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  // Fetch Activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoadingActivities(true);
        const res = await fetch("/api/Activities");
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
      } finally {
        setLoadingActivities(false);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Welcome, <span className="text-red-500">{user?.name || "Admin"}</span>
        </h1>
        <p className="text-gray-400 mt-1">Dashboard Overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {quickActions.map((item, index) => (
          <Link href={item.href} key={index}>
            <div
              key={index}
              className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-red-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{item.title}</p>
                  <p className="text-2xl font-bold mt-1">
                    {loadingStats ? "..." : item.count}
                  </p>
                </div>
                <div className="text-2xl">
                  {item.icon}
                  {item.comingSoon && (
                    <span className="block text-xs text-red-500 mt-1">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="bg-gray-800 hover:bg-red-500 text-white p-3 rounded-lg text-sm font-medium transition-colors text-center"
              disabled={action.comingSoon}
            >
              {action.title}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mt-6">
        <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
        {loadingActivities ? (
          <p className="text-gray-400 text-sm">Loading activities...</p>
        ) : activities.length === 0 ? (
          <p className="text-gray-400 text-sm">No recent activity</p>
        ) : (
          <div className="space-y-3">
            {activities.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>{item.content}</span>
                <span className="text-gray-400 ml-auto">
                  {new Date(item.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
