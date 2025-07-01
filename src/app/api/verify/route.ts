import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "dev_key";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const token = auth?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  try {
    jwt.verify(token, jwtSecret);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
