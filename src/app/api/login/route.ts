import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const jwtSecret = process.env.JWT_SECRET || "dev_key";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1d" });
    return NextResponse.json({ token });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
