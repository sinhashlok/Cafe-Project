import Cart from "@/model/cart";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const cart = await Cart.find({});
    return NextResponse.json(
      {
        message: "Cart",
        data: cart,
        success: true,
      },
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
