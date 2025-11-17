import { connectDB } from "@/lib/mongodb";
import Messages from "@/models/Messages";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectDB();
    const msg = await Messages.find();
    if (msg) {
      console.log("Health api called!!!");
    }
    return NextResponse.json(
      { message: "I am still running!!!" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error, please contact to admin!" },
      { status: 500 }
    );
  }
}
