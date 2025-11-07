import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Services";
import { verifyAdmin } from "@/lib/verifyToken";

export async function GET() {
  await connectDB();
  const services = await Service.find().sort({ createdAt: -1 });
  return NextResponse.json(services);
}

export async function POST(req) {
  await connectDB();
  const user = await verifyAdmin();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("image");
  const title = formData.get("title");
  const description = formData.get("description");
  const longDescription = formData.get("longDescription");

  if (!file || !title || !description)
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );

  // Save image to public/uploads
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name}`;
  const path = `./public/uploads/${filename}`;
  await import("fs").then(({ writeFileSync }) => writeFileSync(path, buffer));

  const imageUrl = `/uploads/${filename}`;

  const newService = await Service.create({
    image: imageUrl,
    title,
    description,
    longDescription,
  });

  return NextResponse.json(newService, { status: 201 });
}
