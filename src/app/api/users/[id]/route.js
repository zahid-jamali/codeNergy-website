import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyAdmin } from "@/lib/verifyToken";

// ✅ DELETE
export async function DELETE(req, context) {
  await connectDB();
  const user = await verifyAdmin();
  const { id } = await context.params;
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deleted = await User.findByIdAndDelete(id);
  if (!deleted)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ message: "User deleted successfully" });
}

// ✅ UPDATE Role
export async function PUT(req, context) {
  await connectDB();
  const user = await verifyAdmin();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;

  const { role } = await req.json();
  const updated = await User.findByIdAndUpdate(id, { role }, { new: true });
  if (!updated)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(updated);
}
