import Restaurant from "@/model/cafe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { search } = body;
    

    let cafe = [];
    if (search === "") {
      cafe = await Restaurant.find({});
    } else {
      cafe = await Restaurant.find({
        name: { $regex: search },
      });
    }

    if (cafe.length === 0) {
      return NextResponse.json(
        { message: "No cafe found", cafe: cafe, success: false },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Cafe Found", cafe: cafe, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
