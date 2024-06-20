import Restaurant from "@/model/cafe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { deliveryTimeCode } = body;

    let cafe: any = [];
    console.log(deliveryTimeCode);

    if (deliveryTimeCode === 3) {
      cafe = await Restaurant.find({});
    } else if (deliveryTimeCode === 2) {
      cafe = await Restaurant.find({
        deliveryTime: { $gte: 50 },
      });
    } else if (deliveryTimeCode === 1) {
      cafe = await Restaurant.find({
        deliveryTime: { $lte: 50 },
      });
    } else {
      cafe = await Restaurant.find({
        deliveryTime: { $lte: 30 },
      });
    }

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
