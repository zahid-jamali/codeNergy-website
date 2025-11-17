// src/app/api/blog/[slug]/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "@/models/Blog";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI);
}

// Get blog by slug
export async function GET(_, { params }) {
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug: params.slug });
    if (!blog)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update blog
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const data = await req.json();
    const blog = await Blog.findOneAndUpdate({ slug: params.slug }, data, {
      new: true,
    });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete blog
export async function DELETE(_, { params }) {
  try {
    await connectDB();
    await Blog.findOneAndDelete({ slug: params.slug });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
