import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount } = body;

    const instance = new Razorpay({
      key_id: "rzp_test_hJOfjrq717Ffbt",
      key_secret: "p5dOMXjeYambe7Q7oJ2suXAR",
    });

    const data = await instance.orders.create({
      amount: parseInt(amount),
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2",
      },
    });

    return NextResponse.json({ data: data }, {status: 200});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 5000 });
  }
}
