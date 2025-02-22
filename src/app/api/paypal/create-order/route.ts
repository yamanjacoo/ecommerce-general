import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { amount } = await request.json()

    // Here you would typically create a PayPal order using their API
    // This is a simplified example
    const orderID = `TEST_ORDER_${Date.now()}`

    return NextResponse.json({ orderID })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

