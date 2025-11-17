import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Activities from "@/models/Activities";
import { verifyAdmin } from "@/lib/verifyToken";

export async function GET() {
  await connectDB();
  const user = await verifyAdmin();
  try {
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await Activities.find().sort({ createdAt: -1 });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Team GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
