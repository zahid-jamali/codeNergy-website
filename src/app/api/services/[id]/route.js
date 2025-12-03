import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Services";
import { verifyAdmin } from "@/lib/verifyToken";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(req, context) {
  await connectDB();

  try {
    const user = await verifyAdmin();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await context.params;

    const service = await Service.findById(id);
    if (!service) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Delete Cloudinary image
    if (service.imagePublicId) {
      await cloudinary.uploader.destroy(service.imagePublicId);
    }

    // Delete from DB
    await Service.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log("Delete Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
