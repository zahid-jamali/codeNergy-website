import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyAdmin } from "@/lib/verifyToken";
import bcrypt from "bcryptjs";

// ✅ GET All Users
export async function GET() {
  await connectDB();
  const user = await verifyAdmin();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const users = await User.find().sort({ createdAt: -1 });
  return NextResponse.json(users);
}

// ✅ CREATE New User (same logic as createUser route)
export async function POST(req) {
  await connectDB();
  const user = await verifyAdmin();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, email, password, role } = await req.json();
  if (!name || !email || !password)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  return NextResponse.json(newUser, { status: 201 });
}
