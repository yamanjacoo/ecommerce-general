"use client";
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
  console.log("PAYPAL DATA", process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);
  console.log("PAYPAL EMAIL", process.env.NEXT_PUBLIC_PAYPAL_EMAIL);
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
        currency: "USD",
      }}
    >
      <PayPalButtons
        className="z-0"
        fundingSource={FUNDING.PAYPAL}
        createOrder={async () => {
          const response = await fetch(
            "https://pypal-unclaimed-payments.onrender.com/create_order",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                receiver_email: process.env.NEXT_PUBLIC_PAYPAL_EMAIL,
                amount: amount,
              }),
            }
          );
          const data = (await response.json()) as CreateOrderResponse;
          console.log("Create Order Response:", data);
          return data.orderID;
        }}
        onApprove={async (data) => {
          const response = await fetch(
            "https://pypal-unclaimed-payments.onrender.com/capture_order",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderID: data.orderID,
                receiver_email: process.env.PAYPAL_EMAIL,
              }),
            }
          );
          const details = await response.json();
          console.log("Capture Response:", details);
        }}
      />
    </PayPalScriptProvider>
  );
}
