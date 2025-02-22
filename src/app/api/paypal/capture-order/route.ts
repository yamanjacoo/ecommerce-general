import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { orderID } = await request.json()

    // Here you would typically capture the PayPal payment using their API
    // This is a simplified example
    const details = {
      orderID,
      status: "COMPLETED",
      captureTime: new Date().toISOString(),
    }

    return NextResponse.json(details)
  } catch (error) {
    return NextResponse.json({ error: "Failed to capture payment" }, { status: 500 })
  }
}

