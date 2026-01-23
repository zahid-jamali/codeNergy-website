import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
// import Faq from "@/models/Faq";
import { verifyAdmin } from "@/lib/verifyToken";
import Projects from "@/models/Projects";

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    const user = await verifyAdmin();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // console.log(context.params);

    const { id } = await parmas;
    const deleted = await Projects.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Projects not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/projects/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
