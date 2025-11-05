import { connectDB } from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyToken";
import Message from "@/models/Messages";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectDB();
    const user = await verifyAdmin();
    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "unauthorized admin user!" },
        { status: 400 }
      );
    }
    const message = await Message.find().sort({ createdAt: -1 });

    return NextResponse.json(message, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error, please contact to admin!" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await connectDB();
  let { name, email, message } = await req.json();
  console.log(name, email, message);
  message.trim();
  if ((!name, !email, !message)) {
    return NextResponse.json(
      { message: "Please send complete data" },
      { status: 400 }
    );
  }
  try {
    let msg = Message({ name, email, message });
    await msg.save();
    return NextResponse.json(
      { message: "Message created successfully!!!" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
