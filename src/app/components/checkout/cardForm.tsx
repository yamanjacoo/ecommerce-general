"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
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
    } else if (name === "cvc") {
      // Only allow numbers and max 4 digits
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
      // Extract month and year from expiry
      const [month, year] = cardData.expiry.split("/");

      // Process the payment
      const response = await fetch("/api/process-checkout", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkoutId,
          card: {
            number: cardData.number.replace(/\s/g, ""),
            expiry_month: month,
            expiry_year: `20${year}`,
            cvc: cardData.cvc,
            name: cardData.name,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment failed");
      }

      // Handle 3D Secure redirect if needed
      if (data.next_step?.redirect_url) {
        window.location.href = data.next_step.redirect_url;
        return;
      }

      // Payment successful
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
      });
      onSuccess();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Payment failed";
      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
      });
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const formattedAmount = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);

  return (
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
          <Label htmlFor="cvc">CVC</Label>
          <Input
            id="cvc"
            name="cvc"
            placeholder="123"
            value={cardData.cvc}
            onChange={handleInputChange}
            required
            maxLength={4}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isProcessing}>
        {isProcessing ? "Processing..." : `Pay ${formattedAmount}`}
      </Button>
    </form>
  );
}
