import Team from "@/models/Team";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyToken";
import { writeFile } from "fs/promises";
import path from "path";

export async function PUT(req, context) {
  await connectDB();
  const user = await verifyAdmin();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const formData = await req.formData();

    const name = formData.get("name");
    const designation = formData.get("designation");
    const contact = formData.get("contact");
    const description = formData.get("description");
    const file = formData.get("image");

    let imageUrl;

    // ✅ Save image if uploaded
    if (file && typeof file === "object") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(process.cwd(), "public/uploads", file.name);
      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${file.name}`;
    }

    // ✅ Prepare updated data
    const updateData = {
      name,
      designation,
      contact,
      description,
    };
    if (imageUrl) updateData.image = imageUrl;

    const updated = await Team.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /team error:", err);
    return NextResponse.json(
      { error: "Failed to update member" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  await connectDB();
  const user = await verifyAdmin();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await context.params;
    await Team.findByIdAndDelete(id);
    return NextResponse.json({ message: "Member deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete member" },
      { status: 500 }
    );
  }
}
