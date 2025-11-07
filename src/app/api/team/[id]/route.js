import Team from "@/models/Team";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await connectDB();
  try {
    const body = await req.json();
    const updated = await Team.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update member" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    await Team.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Member deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete member" },
      { status: 500 }
    );
  }
}
