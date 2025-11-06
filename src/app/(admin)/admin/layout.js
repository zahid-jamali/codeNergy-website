import "./style.css";
import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/verifyToken";
import AdminPanelLayoutClient from "@/components/admin/AdminLayout";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }) {
  const user = await verifyAdmin();
  if (user?.role !== "admin") redirect("/login");

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AdminPanelLayoutClient user={user}>{children}</AdminPanelLayoutClient>
      </body>
    </html>
  );
}
