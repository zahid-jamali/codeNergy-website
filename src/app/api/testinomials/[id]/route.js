import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testinomials";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();
    const updated = await Testimonial.findByIdAndUpdate(id, body, {
      new: true,
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    await Testimonial.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
