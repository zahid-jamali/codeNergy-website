// app/api/admin/blogs/route.js
import { connectDB } from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyToken";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const user = await verifyAdmin();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { title, description, content, author, image, slug } = body;

    const existing = await Blog.findOne({ slug });
    if (existing) {
      return new Response(JSON.stringify({ error: "Slug already exists" }), {
        status: 400,
      });
    }

    const newBlog = new Blog({
      title,
      description,
      content,
      author,
      image,
      slug,
    });
    await newBlog.save();

    return new Response(JSON.stringify(newBlog), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create blog" }), {
      status: 500,
    });
  }
}
