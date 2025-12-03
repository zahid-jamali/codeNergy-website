import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Services";
import { verifyAdmin } from "@/lib/verifyToken";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  await connectDB();
  const services = await Service.find().sort({ createdAt: 1 });
  return NextResponse.json(services);
}

export async function POST(req) {
  await connectDB();

  const user = await verifyAdmin();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("image");
    const title = formData.get("title");
    const description = formData.get("description");
    const longDescription = formData.get("longDescription");

    if (!file || !title || !description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "services" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    // Create service entry in DB
    const newService = await Service.create({
      image: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
      title,
      description,
      longDescription,
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (err) {
    console.log("Upload Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
