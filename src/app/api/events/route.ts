
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid format" }, { status: 400 });
  }

  try {
    const db = (await client).db();
    await db.collection("events").insertMany(body);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
