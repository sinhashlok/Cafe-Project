import Restaurant from "@/model/cafe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rating } = body;

    const cafe = await Restaurant.find({
      rating: { $gte: rating },
    });

    return NextResponse.json(
      { message: "Cafes found", cafe: cafe, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
