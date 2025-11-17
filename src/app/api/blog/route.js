// src/app/api/blog/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "@/models/Blog";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI);
}

// Fetch all blogs
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create a new blog
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const blog = await Blog.create(data);
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
