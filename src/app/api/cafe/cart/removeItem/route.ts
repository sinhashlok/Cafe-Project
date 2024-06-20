import Cart from "@/model/cart";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { itemId } = body;

    const cartItem = await Cart.findOne({ itemId: itemId });
    if (cartItem) {
      if (cartItem.count == 1) {
        await Cart.deleteOne({ itemId: itemId });
      } else {
        await Cart.findOneAndUpdate({ itemId }, { count: cartItem.count - 1 });
      }
    } else {
      return NextResponse.json(
        { message: "No item exists", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Item Removed", success: false },
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
