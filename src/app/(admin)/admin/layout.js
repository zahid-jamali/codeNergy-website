// "use server";
import "./style.css";
import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/verifyToken";
import AdminPanelLayoutClient from "@/components/admin/AdminLayout";
import AdminProvider from "@/components/admin/AdminProvider";

// export const dynamic = "force-dynamic";
export const dynamic = "force-dynamic";
export default async function AdminLayout({ children }) {
  const user = await verifyAdmin();
  if (!user) redirect("/login");
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AdminProvider user={user}>
          <AdminPanelLayoutClient user={user}>
            {children}
          </AdminPanelLayoutClient>
        </AdminProvider>
      </body>
    </html>
  );
}
