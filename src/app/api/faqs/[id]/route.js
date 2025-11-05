import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Faq from "@/models/Faq";
import { verifyAdmin } from "@/lib/verifyToken";

export async function PUT(req, { params }) {
  await connectDB();
  try {
    const user = await verifyAdmin();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const data = await req.json();
    const updated = await Faq.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/faqs/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    const user = await verifyAdmin();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const deleted = await Faq.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/faqs/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
