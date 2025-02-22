"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CardPaymentFormProps {
  checkoutId: string;
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function CardPaymentForm({
  checkoutId,
  amount,
  onSuccess,
  onError,
}: CardPaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;
    if (name === "expiry") {
      // Format MM/YY
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 4)
        .replace(/(\d{2})(\d{2})/, "$1/$2")
        .replace(/(\d{2})(\d{1})/, "$1/$2");
    } else if (name === "number") {
      // Format card number with spaces
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setCardData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const processPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const [month, year] = cardData.expiry.split("/");

      const response = await fetch(`/api/process-checkout`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkoutId,
          card: {
            number: cardData.number.replace(/\s/g, ""),
            expiry_month: month,
            expiry_year: `20${year}`,
            cvv: cardData.cvv,
            name: cardData.name,
            last_4_digits: cardData.number.replace(/\s/g, "").slice(-4),
          },
          payment_type: "card",
        }),
      });

      const data = await response.json();

      if (data["data"]["status"] === "FAILED") {
        throw new Error(data.error || "Payment failed");
      }

      if (data["data"]["next_step"]?.url) {
        const { url, method, payload, mechanism } = data["data"]["next_step"];

        if (mechanism.includes("iframe")) {
          // Open 3DS challenge in an iframe
          setThreeDSecure({ url, method, payload });
        } else {
          // Redirect to 3D Secure page
          const form = document.createElement("form");
          form.method = method;
          form.action = url;
          form.style.display = "none";

          Object.keys(payload).forEach((key) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = payload[key];
            form.appendChild(input);
          });

          document.body.appendChild(form);
          form.submit();
        }
        return;
      }

      onSuccess();
    } catch (error) {
      onError(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const formattedAmount = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
  const [threeDSecure, setThreeDSecure] = useState<{
    url: string;
    method: string;
    payload: Record<string, string>;
  } | null>(null);
  return (
    <>
      <form onSubmit={processPayment} className="space-y-4 w-full">
        <div className="space-y-2">
          <Label htmlFor="name">Cardholder Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={cardData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="number">Card Number</Label>
          <Input
            id="number"
            name="number"
            placeholder="4111 1111 1111 1111"
            value={cardData.number}
            onChange={handleInputChange}
            required
            maxLength={19}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              id="expiry"
              name="expiry"
              placeholder="MM/YY"
              value={cardData.expiry}
              onChange={handleInputChange}
              required
              maxLength={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvv">cvv</Label>
            <Input
              id="cvv"
              name="cvv"
              placeholder="CVV"
              value={cardData.cvv}
              onChange={handleInputChange}
              required
              maxLength={4}
            />
          </div>
        </div>

        <Button type="submit" className="w-full py-4" disabled={isProcessing}>
          {isProcessing ? "Processing..." : `Pay ${formattedAmount}`}
        </Button>
      </form>
      {threeDSecure && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <iframe src={threeDSecure.url} width="400" height="400" />
          </div>
        </div>
      )}
    </>
  );
}
