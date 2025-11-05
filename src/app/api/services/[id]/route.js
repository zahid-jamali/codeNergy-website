import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Services";
import fs from "fs";
import path from "path";

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = params;
  console.log(`ID: ${id}`);
  try {
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
export async function GET(req, { params }) {
  //   const { id } = params;
  NextResponse.json({ message: "it the response" });
}
