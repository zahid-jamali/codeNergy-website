import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { verifyAdmin } from "@/lib/verifyToken";

export async function GET() {
  try {
    await connectDB();
    const user = await verifyAdmin();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const appointments = await Appointment.find().populate(
      "serviceId",
      "title"
    );
    return NextResponse.json(appointments, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newAppointment = await Appointment.create(body);
    return NextResponse.json(newAppointment, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
