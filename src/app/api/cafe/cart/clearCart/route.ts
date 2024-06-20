import Cart from "@/model/cart";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await Cart.deleteMany();
    return NextResponse.json(
      { message: "Cart Empty", success: true },
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
