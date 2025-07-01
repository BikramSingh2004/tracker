import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received sync payload:", body); // ✅ DEBUG

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const db = (await client).db();
    await db.collection("events").insertMany(body);

    return NextResponse.json({ message: "Synced successfully" });
  } catch (e) {
    console.error("Sync error:", e);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
  