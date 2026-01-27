import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
// import Faq from "@/models/Faq";
import { verifyAdmin } from "@/lib/verifyToken";
import Projects from "@/models/Projects";

export async function GET(req, { params }) {
  await connectDB();

  const { id } = await params; // Next.js 15+

  const project = await Projects.findById(id).populate("service");

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const user = await verifyAdmin();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ NEXT.JS 15+ FIX
    const { id } = await params;

    console.log("Project to delete is:", id);

    const deleted = await Projects.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /api/projects/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
