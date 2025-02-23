"use client";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";

interface SimplePayPalButtonProps {
  amount: string;
}

interface CreateOrderResponse {
  orderID: string;
}

export default function SimplePayPalButton({
  amount,
}: SimplePayPalButtonProps) {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "Ab-_RGJfzR_nlzigMBpi7ca4fNNjS2nlqTdRUylABhCLkVUTZy7KdOWb9xPEGmNq262xkObg7NQlzLN6",
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
                receiver_email: process.env.PAYPAL_EMAIL,
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
