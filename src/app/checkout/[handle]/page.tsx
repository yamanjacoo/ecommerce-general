"use client";

import SimplePayPalButton from "@/src/app/components/ui/paypalButton";
import { Product } from "@/src/app/types/product";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    SumUpCard?: any;
  }
}

const CheckoutPage = () => {
  const searchParams = useSearchParams();

  // Build product object from query params
  const product = {
    id: searchParams.get("id"),
    name: searchParams.get("name"),
    price: searchParams.get("price"),
    originalPrice: searchParams.get("originalPrice"),
    image: searchParams.get("image"),
    count: searchParams.get("quantity"),
  };

  // Payment method state: "credit-card", "paypal", or null (nothing selected)
  const [openMethod, setOpenMethod] = useState<"credit-card" | "paypal" | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);

  const sumUpCardRef = useRef<any>(null);
  const router = useRouter();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize checkout if the user selects credit card
  useEffect(() => {
    if (openMethod === "credit-card") {
      initializeCheckout();
    }
  }, [openMethod]);

  // Mount SumUp widget once we have a checkoutId
  useEffect(() => {
    if (checkoutId && openMethod === "credit-card" && window.SumUpCard) {
      sumUpCardRef.current = window.SumUpCard.mount({
        checkoutId,
        onResponse: (type: string, body: any) => {
          if (
            body &&
            typeof body.status === "string" &&
            body.status.trim() !== ""
          ) {
            console.log("SumUp status:", body.status);
            setIsProcessing(false);
            if (body.status === "FAILED") {
              const errorMsg =
                body.message || "Payment failed. Please try again.";
              toast.error(errorMsg);
            } else {
              const successMsg =
                body.message || "Payment processed successfully.";
              toast.success(successMsg);
              // Optionally redirect after success
              // router.push("/success");
            }
          }
        },
        showSubmitButton: false,

        preferredPaymentMethods: ["card", "applePay", "googlePay"],
      });
    }

    return () => {
      if (sumUpCardRef.current) {
        sumUpCardRef.current.unmount();
      }
    };
  }, [checkoutId, openMethod, router]);

  // Fetch SumUp checkoutId from your API
  const initializeCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: product.price }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout");
      }
      if (!data.checkoutId) {
        throw new Error("No checkout ID received");
      }

      setCheckoutId(data.checkoutId);
    } catch (error) {
      console.error("Error initializing checkout:", error);
      toast.error("Failed to initialize payment");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle the Pay button for credit card or PayPal
  const handleSubmit = () => {
    if (openMethod === "credit-card" && sumUpCardRef.current) {
      setIsProcessing(true);
      sumUpCardRef.current.submit();
    } else if (openMethod === "paypal") {
      console.log("Processing PayPal payment");
      // Insert your PayPal logic here
    }
  };

  // Toggle which accordion item is open
  const toggleMethod = (method: "credit-card" | "paypal") => {
    setOpenMethod((prev) => (prev === method ? null : method));
  };

  // Format the price in EUR
  const formattedAmount = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(Number(product.price));

  return (
    <div className="flex flex-col md:justify-end justify-start items-start md:flex-row">
      {/* Main Content */}
      <div className="md:w-auto w-full p-6 md:pr-12 bg-white">
        <Link href="/" className="text-2xl font-bold">
          <Image src="/applogo.png" alt="Logo" height={120} width={120} />
        </Link>

        <div className="text-center text-gray-600 text-sm mt-5">
          EXPRESS CHECKOUT
        </div>

        <div className="flex flex-col gap-2 md:my-6 my-4">
          {/* Example PayPal express button up top */}
          <SimplePayPalButton amount={product?.price?.toString() || "0"} />
          <div className="flex gap-2">
            <button className="flex-1 bg-black h-[50px] text-white py-3 rounded-lg flex items-center justify-center">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/transport-7d83f.firebasestorage.app/o/pay%2Fapay.svg?alt=media&token=2a26f752-8816-437b-bd8c-c5b27ac8c712"
                alt="Apple Pay"
                className="h-14 w-14"
              />
            </button>
            <button className="flex-1 bg-black h-[50px] text-white py-3 rounded-lg flex items-center justify-center">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/transport-7d83f.firebasestorage.app/o/pay%2Fgpay.svg?alt=media&token=74dfed25-c9a8-4954-9e40-0bbebe876273"
                alt="Google Pay"
                className="h-14 w-14"
              />
            </button>
          </div>
        </div>

        <div className="flex w-full mb-6 justify-center items-center">
          <div className="h-[1px] bg-gray-200 w-full"></div>
          <div className="text-center text-gray-600 mx-4 text-sm">OR</div>
          <div className="h-[1px] bg-gray-200 w-full"></div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact information</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">
              Keep me up to date on news and exclusive offers
            </span>
          </label>
        </div>

        {/* Shipping Address */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Delivery</h2>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="First name"
              className="p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Last name"
              className="p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <input
            type="text"
            placeholder="Address"
            className="w-full p-3 border border-gray-300 rounded-lg mt-4"
          />
          <div className="grid grid-cols-3 gap-2 mt-4">
            <input
              type="text"
              placeholder="City"
              className="p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Zip Code"
              className="p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="State"
              className="p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <input
            type="tel"
            placeholder="Phone"
            className="w-full p-3 border border-gray-300 rounded-lg mt-4"
          />
        </div>

        {/* Payment Section: Two Accordion Items */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Payment</h2>

          {/* CREDIT CARD ACCORDION ITEM */}
          <div className="mb-2">
            {/* Header: black border if selected, otherwise transparent */}
            <div
              onClick={() => toggleMethod("credit-card")}
              className={`flex items-center justify-between p-4 bg-gray-50 cursor-pointer rounded-t-lg border-2 ${
                openMethod === "credit-card"
                  ? "border-black"
                  : "border-transparent"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-gray-600 rounded-full flex items-center justify-center">
                  {openMethod === "credit-card" && (
                    <div className="w-3 h-3 bg-gray-600 rounded-full" />
                  )}
                </div>
                <span className="font-medium">Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/visa.sxIq5Dot.svg"
                  alt="Visa"
                  className="h-6"
                />
                <img
                  src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/mastercard.1c4_lyMp.svg"
                  alt="Mastercard"
                  className="h-6"
                />
                <img
                  src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/amex.Csr7hRoy.svg"
                  alt="Amex"
                  className="h-6"
                />
              </div>
            </div>

            {/* Expanded Content: soft gray border when open */}
            <div
              className={`transition-all duration-300 overflow-hidden px-4 ${
                openMethod === "credit-card"
                  ? "max-h-[1000px] border border-gray-200 rounded-b-lg"
                  : "max-h-0"
              }`}
            >
              {openMethod === "credit-card" && (
                <div className="py-4 flex justify-center">
                  {isLoading ? (
                    <div className="min-h-[300px] flex items-center justify-center">
                      Loading payment form...
                    </div>
                  ) : (
                    <div id="sumup-card" className="w-full" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* PAYPAL ACCORDION ITEM */}
          <div className="mb-2">
            {/* Header: black border if selected, otherwise transparent */}
            <div
              onClick={() => toggleMethod("paypal")}
              className={`flex items-center justify-between p-4 bg-gray-50 cursor-pointer rounded-t-lg border-2 ${
                openMethod === "paypal" ? "border-black" : "border-transparent"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-gray-600 rounded-full flex items-center justify-center">
                  {openMethod === "paypal" && (
                    <div className="w-3 h-3 bg-gray-600 rounded-full" />
                  )}
                </div>
                <span className="font-medium">PayPal</span>
              </div>
              <img
                src="https://www.paypalobjects.com/webstatic/i/logo/rebrand/ppcom.svg"
                alt="PayPal"
                className="h-6"
              />
            </div>

            {/* Expanded Content: soft gray border when open */}
            <div
              className={`transition-all duration-300 overflow-hidden px-4 bg-[#F9FAFB] ${
                openMethod === "paypal"
                  ? "max-h-[600px] border border-gray-200 rounded-b-lg"
                  : "max-h-0"
              }`}
            >
              {openMethod === "paypal" && (
                <div className="py-4 flex flex-col items-center text-center ">
                  {/* Simple placeholder icon or use your own */}
                  <Image
                    src={"/download.svg"}
                    alt={""}
                    height={150}
                    width={150}
                    className="py-6"
                  ></Image>
                  <p className="text-md text-gray-500  mb-4 max-w-xs leading-5">
                    After you click "Pay with PayPal," you’ll be redirected to
                    PayPal to complete your purchase securely.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Save Information */}
        {/* <div className="mb-8">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Save this information for next time</span>
          </label>
        </div> */}

        {/* Proceed Button (for Credit Card only) */}
        {openMethod === "credit-card" && (
          <button
            onClick={handleSubmit}
            disabled={isLoading || isProcessing}
            className="w-full h-12 text-base font-medium mt-6 bg-black text-white rounded"
          >
            {isLoading
              ? "Loading form..."
              : isProcessing
              ? "Processing Payment..."
              : `Pay $${product.price}`}{" "}
            USD
          </button>
        )}
        {openMethod === "paypal" && (
          <SimplePayPalButton amount={formattedAmount} />
        )}
      </div>

      {/* Order Summary */}
      <div className="w-full h-auto md:w-[50%] border-l p-6 bg-[#F5F5F5] sticky top-0 right-0 md:h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Order summary</h2>
        <div className="space-y-3">
          <div className="flex flex-row justify-start items-end">
            <div className="relative">
              <img
                src={product?.image?.toString()}
                className="h-16 w-16 rounded-md border"
                alt="Product Image"
              />
              <div className="h-6 w-6 bg-[#666666] absolute rounded-full text-white text-xs -right-2 -top-2 flex items-center justify-center">
                {product?.count?.toString()}
              </div>
            </div>
            <div className="ml-6 flex flex-col items-start justify-start my-8">
              <span className="font-bold">{product?.name}</span>
              <span className="text-xs">{product?.name}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${product?.price}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${product?.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
