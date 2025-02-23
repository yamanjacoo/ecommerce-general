import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { orderID } = await req.json();
    const response = await fetch("https://pypal-unclaimed-payments.onrender.com/capture_order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderID,
        receiver_email: process.env.PAYPAL_EMAIL,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Order capture failed" }, { status: 500 });
  }
}
