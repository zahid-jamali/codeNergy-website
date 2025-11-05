export async function GET() {
  const response = Response.json({ message: "Logged out successfully" });
  response.headers.append(
    "Set-Cookie",
    "token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax"
  );
  return response;
}
