import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Services";
import fs from "fs";
import path from "path";
import { verifyAdmin } from "@/lib/verifyToken";

export async function DELETE(req, context) {
  await connectDB();
  const { id } = await context.params;

  console.log(`ID: ${id}`);
  try {
    const user = await verifyAdmin();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const service = await Service.findById(id);
    if (!service)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    // delete image from uploads folder
    const imagePath = path.join(process.cwd(), "public", service.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await Service.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
