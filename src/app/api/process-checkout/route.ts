import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  try {
    const { checkoutId, card } = await request.json()

    if (!checkoutId || !card) {
      return NextResponse.json({ success: false, error: "Missing checkoutId or card details" }, { status: 400 })
    }

    const payload = {
      payment_type: "card",
      card: {
        number: card.number,
        expiry_month: card.expiry_month,
        expiry_year: card.expiry_year,
        cvv: card.cvv,
        name: card.name,
        last_4_digits:card.last_4_digits,

      },

    }

    const processResponse = await fetch(`https://api.sumup.com/v0.1/checkouts/${checkoutId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUMUP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await processResponse.json()

    if (!processResponse.ok) {
      return NextResponse.json({ success: false, error: data }, { status: processResponse.status })
    }

    // If 3D Secure is required, return the redirect URL
    if (data.next_step?.type === "3ds" && data.next_step?.redirect_url) {
      return NextResponse.json({
        success: true,
        next_step: {
          type: "3ds",
          redirect_url: data.next_step.redirect_url,
        },
      })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

