import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/mongodb";

const validPages = ["/", "/about", "/contact", "/form", "/admin/dashboard"];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const user_Id = searchParams.get("user_Id");
    const session_Id = searchParams.get("session_Id");
    const page_Name = searchParams.get("page_Name");
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    const match: Record<string, any> = {};
    if (user_Id) match.user_Id = user_Id;
    if (session_Id) match.session_Id = session_Id;

    if (page_Name && page_Name !== "all" && validPages.includes(page_Name)) {
      match.page_Name = page_Name;
    }

    if (start && end) {
      match.timestamp = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    }

    const db = (await client).db();

    const result = await db
      .collection("events")
      .aggregate([
        { $match: match },
        {
          $group: {
            _id: "$page_Name",
            count: { $sum: 1 },
            avgTime: { $avg: "$duration" },
          },
        },
        {
          $match: {
            _id: { $in: validPages },
          },
        },
      ])
      .toArray();

    return NextResponse.json(result);
  } catch (e) {
    console.error("Analytics API error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
