"use client";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";
import { DEFAULT_CURRENCY } from "../currency";

interface SimplePayPalButtonProps {
  amount: string;
}

interface CreateOrderResponse {
  orderID: string;
}

export default function SimplePayPalButton({
  amount,
}: SimplePayPalButtonProps) {
  const [paypalClientId, setPaypalClientId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/paypal")
      .then((res) => res.json())
      .then((data) => setPaypalClientId(data.clientId))
      .catch((err) => console.error("Error loading PayPal config:", err));
  }, []);

  if (!paypalClientId) return <p>Loading PayPal...</p>;

  return (
    <PayPalScriptProvider
      options={{ clientId: paypalClientId, currency: "USD" }}
    >
      <PayPalButtons
        className="z-0"
        fundingSource={FUNDING.PAYPAL}
        createOrder={async () => {
          const response = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
          });

          const data = (await response.json()) as CreateOrderResponse;
          return data.orderID;
        }}
        onApprove={async (data) => {
          const response = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderID: data.orderID }),
          });

          const details = await response.json();
          console.log("Capture Response:", details);
        }}
      />
    </PayPalScriptProvider>
  );
}
