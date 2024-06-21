import Cart from "@/model/cart";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cafeId, itemId, itemName, price, isVeg } = body;

    const cartExists = await Cart.find({});
    if (cartExists.length != 0) {
      if (cartExists[0].cafeId.toString() === cafeId) {
        let countItem = null;
        cartExists.map((item: any) => {
          if (item.itemId.toString() === itemId) {
            countItem = item.count;
            return;
          }
        });

        if (countItem != null) {
          await Cart.findOneAndUpdate(
            { itemId: itemId },
            { count: (countItem || 1) + 1 }
          );
        } else {
          await Cart.create({
            cafeId: cafeId,
            itemId: itemId,
            itemName: itemName,
            price: price,
            isVeg: isVeg,
            count: 1,
          });
        }
      } else {
        return NextResponse.json(
          { message: "Cannot add from different cafe", success: false },
          { status: 200 }
        );
      }
    } else {
      await Cart.create({
        cafeId: cafeId,
        itemId: itemId,
        itemName: itemName,
        price: price,
        isVeg: isVeg,
        count: 1,
      });
    }

    return NextResponse.json(
      { message: "Added to Cart", success: true },
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
