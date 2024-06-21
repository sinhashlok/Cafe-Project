import Restaurant from "@/model/cafe";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/dbConnect";
import RestaurantItems from "@/model/cafeItems";

connect();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cafeId } = body;

    const cafe = await Restaurant.findById({ _id: cafeId });
    const list = await RestaurantItems.find({ cafeId: cafeId });

    return NextResponse.json(
      { message: "Found all cafes", data: [cafe, list], success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
