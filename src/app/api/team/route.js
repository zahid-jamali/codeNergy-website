import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Team from "@/models/Team";
import { verifyAdmin } from "@/lib/verifyToken";

export async function POST(req) {
  await connectDB();
  const user = await verifyAdmin();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("image");
    const name = formData.get("name");
    const designation = formData.get("designation");
    const contact = formData.get("contact");
    const description = formData.get("description");

    if (!file || !name || !designation || !description)
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );

    // Save file to public/uploads/team
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const filePath = `./public/uploads/team/${filename}`;

    await import("fs").then(({ writeFileSync, mkdirSync, existsSync }) => {
      if (!existsSync("./public/uploads/team")) {
        mkdirSync("./public/uploads/team", { recursive: true });
      }
      writeFileSync(filePath, buffer);
    });

    const imageUrl = `/uploads/team/${filename}`;

    const newMember = await Team.create({
      name,
      designation,
      contact,
      description,
      image: imageUrl,
    });

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error("Team POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const members = await Team.find().sort({ createdAt: -1 });
    return NextResponse.json(members);
  } catch (error) {
    console.error("Team GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
