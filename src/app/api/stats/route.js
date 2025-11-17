// app/api/admin/stats/route.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Messages from "@/models/Messages";
import Service from "@/models/Services";
import Appointment from "@/models/Appointment";
import { verifyAdmin } from "@/lib/verifyToken";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const user = await verifyAdmin();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Count documents in each collection
    const [usersCount, messagesCount, servicesCount, appointmentsCount] =
      await Promise.all([
        User.countDocuments(),
        Messages.countDocuments(),
        Service.countDocuments(),
        Appointment.countDocuments(),
      ]);

    // Attendance & Projects coming soon
    const stats = {
      users: usersCount,
      messages: messagesCount,
      services: servicesCount,
      appointments: appointmentsCount,
      attendance: 0, // coming soon
      projects: 0, // coming soon
    };

    return new Response(JSON.stringify(stats), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch stats" }), {
      status: 500,
    });
  }
}
