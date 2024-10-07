import { db } from "@/utils/db";
import { Examinations, Schools } from "@/utils/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const results = await db.select().from(Schools);

    return NextResponse.json({
      results,
    });
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json(
      { error: "Failed to fetch schools" },
      { status: 500 }
    );
  }
}
