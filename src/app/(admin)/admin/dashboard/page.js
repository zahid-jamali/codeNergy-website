"use client";
// import { verifyAdmin } from "@/lib/verifyToken";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const user = useSelector((state) => state.user) || undefined;
  console.log(`User: isLogin: ${user.isLogin} - name: ${user.name}`);
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl text-red-500 font-bold">Welcome, {user.name}</h1>
      <p className="mt-4 text-gray-400">Role: {user.email}</p>
    </div>
  );
}
