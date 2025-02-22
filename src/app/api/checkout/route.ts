import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { price } = await request.json()

    if (!price || isNaN(Number.parseFloat(price))) {
      return NextResponse.json({ success: false, error: "Invalid product price" }, { status: 400 })
    }

    const checkoutReference = `ref-${Date.now()}-${Math.random().toString(36).substring(7)}`

    const payload = {
      amount: Number.parseFloat(price),
      checkout_reference: checkoutReference,
      currency: "EUR",
      description: "Product Purchase",
      merchant_code: process.env.SUMUP_MERCHANT_CODE,
      return_url: process.env.SUMUP_RETURN_URL,
      pay_to_email: process.env.SUMUP_MERCHANT_EMAIL,
    }

    console.log("SumUp API Request:", {
      url: "https://api.sumup.com/v0.1/checkouts",
      payload: { ...payload, amount: payload.amount.toFixed(2) },
      merchantCode: process.env.SUMUP_MERCHANT_CODE?.substring(0, 5) + "...",
      hasAccessToken: !!process.env.SUMUP_ACCESS_TOKEN,
    })

    const sumupResponse = await fetch("https://api.sumup.com/v0.1/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUMUP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    })

    const responseData = await sumupResponse.json()

    if (!sumupResponse.ok) {
      console.error("SumUp API Error:", responseData)
      return NextResponse.json(
        {
          success: false,
          error: responseData.message || "Failed to create checkout",
          details: responseData,
        },
        { status: sumupResponse.status },
      )
    }

    console.log("SumUp API Success:", responseData)
    return NextResponse.json({ 
      success: true, 
      checkoutId: responseData.id 
    }, { 
      status: 201 ,
     
      
    }, );
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    )
  }
}

