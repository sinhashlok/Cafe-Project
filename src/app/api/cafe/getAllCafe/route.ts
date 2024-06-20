import Restaurant from "@/model/cafe";
import { NextResponse } from "next/server";
import connect from "@/lib/dbConnect";

export async function GET() {
  await connect();
  try {
    const cafe = await Restaurant.find({});

    return NextResponse.json(
      { message: "Found all cafes", data: cafe, success: true },
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
