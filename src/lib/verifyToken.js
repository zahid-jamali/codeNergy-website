"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verifyAdmin() {
  try {
    // ✅ cookies() ab directly cookie object return karta hai
    const cookieStore = await cookies();
    const userInfo =
      cookieStore?.get?.("userInfo")?.value || cookieStore?.userInfo || null;

    if (!userInfo) return null;

    // const decoded = jwt.verify(userInfo.token, process.env.JWT_SECRET);
    return JSON.parse(userInfo) || null;
  } catch (error) {
    console.error("verifyAdmin error:", error);
    return null;
  }
}
