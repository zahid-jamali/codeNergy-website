// src/app/api/testimonials/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testinomial from "@/models/Testinomials";

export async function GET() {
  try {
    await connectDB();
    const tmp = await Testinomial.find().sort({ createdAt: -1 });
    return NextResponse.json(tmp);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error!" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const testimonial = await Testinomial.create(body);
    return NextResponse.json(testimonial, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
