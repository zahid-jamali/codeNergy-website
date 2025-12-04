import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Services";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { category } = await context.params;
  await connectDB();
  const services = await Service.find({ category: category }).sort({
    createdAt: -1,
  });
  return NextResponse.json(services);
}
