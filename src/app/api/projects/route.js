import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Projects";
import { verifyAdmin } from "@/lib/verifyToken";
import cloudinary from "@/lib/cloudinary";

/* ---------------- GET PROJECTS ---------------- */
export async function GET() {
  await connectDB();

  const projects = await Project.find()
    .populate("service") // optional but recommended
    .sort({ createdAt: 1 });

  return NextResponse.json(projects);
}

/* ---------------- CREATE PROJECT ---------------- */
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
    const service = formData.get("service"); // Service ObjectId

    console.log("Service: ", service);

    if (!file || !title || !description || !service) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    /* ---------- FILE → BUFFER ---------- */
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    /* ---------- UPLOAD TO CLOUDINARY ---------- */
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "projects" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    /* ---------- CREATE PROJECT ---------- */
    const newProject = await Project.create({
      title,
      description,
      service,
      image: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Project Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
