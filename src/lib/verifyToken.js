"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verifyAdmin() {
  try {
    const cookieStore = cookies();
    const userInfo = cookieStore?.get("userInfo")?.value || null;

    if (!userInfo) return null;

    const parsed = JSON.parse(userInfo);

    return parsed || null;
  } catch (error) {
    console.error("verifyAdmin error:", error);
    return null;
  }
}
