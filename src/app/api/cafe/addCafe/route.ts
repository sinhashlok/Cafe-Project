import Restaurant from "@/model/cafe";
import RestaurantItems from "@/model/cafeItems";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  await connect();
  try {
    const body = await req.json();
    const cafe = body;
    // const cafeItems = body[1];
    // console.log(cafe, cafeItems);

    cafe.map(async (item) => {
      await Restaurant.create(item);
    });
    // await Restaurant.create(cafe);
    // await RestaurantItems.create(cafeItems);

    return NextResponse.json(
      { message: "Found all cafes", success: true },
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
