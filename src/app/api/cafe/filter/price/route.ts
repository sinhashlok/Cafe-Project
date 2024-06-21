import Restaurant from "@/model/cafe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { price } = body;
    console.log(price);
    

    const cafe = await Restaurant.find({
      costForTwo: { $gte: price[0], $lte: price[1] },
    });
    console.log(cafe);
    

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
