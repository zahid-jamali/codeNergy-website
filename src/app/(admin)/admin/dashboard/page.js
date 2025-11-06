import { verifyAdmin } from "@/lib/verifyToken";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await verifyAdmin();
  if (!user) {
    redirect("/login"); // or "/admin/login"
  }
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl text-red-500 font-bold">
        Welcome, {user?.email}
      </h1>
      <p className="mt-4 text-gray-400">Role: {user?.role}</p>
    </div>
  );
}
