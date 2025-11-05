import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Faq from "@/models/Faq";
import { verifyAdmin } from "@/lib/verifyToken";

export async function GET(req) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || "";
    const visible = url.searchParams.get("visible");
    const sort = url.searchParams.get("sort") || "order";

    const filter = {};
    if (q) {
      filter.$or = [
        { question: { $regex: q, $options: "i" } },
        { answer: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ];
    }
    if (visible === "true") filter.visible = true;
    if (visible === "false") filter.visible = false;

    const faqs = await Faq.find(filter).sort(
      sort === "createdAt" ? { createdAt: -1 } : { order: 1, createdAt: -1 }
    );
    return NextResponse.json(faqs);
  } catch (err) {
    console.error("GET /api/faqs error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const user = await verifyAdmin();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      question,
      answer,
      visible = true,
      order = 0,
      category = "General",
    } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required" },
        { status: 400 }
      );
    }

    const faq = await Faq.create({
      question,
      answer,
      visible,
      order,
      category,
    });
    return NextResponse.json(faq, { status: 201 });
  } catch (err) {
    console.error("POST /api/faqs error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
