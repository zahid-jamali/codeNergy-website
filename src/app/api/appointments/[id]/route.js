import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const updated = await Appointment.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Appointment.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
