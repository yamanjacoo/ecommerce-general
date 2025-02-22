"use client";
import SimplePayPalButton from "@/src/app/components/ui/paypalButton";
import { Product } from "@/src/app/types/product";
import { useCart } from "@/src/context/cartProvider";
import { count } from "console";
import Image from "next/image";
import Link from "next/link";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CheckoutPage {
  product: Product;
}

const CheckoutPage = ({}) => {
  const [selectedMethod, setSelectedMethod] = useState("credit-card");
  const paymentMethods = [
    {
      id: "credit-card",
      label: "Credit Card",
      icons: [
        "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/visa.sxIq5Dot.svg",
        "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/mastercard.1c4_lyMp.svg",
        "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/amex.Csr7hRoy.svg",
      ],
    },
    {
      id: "paypal",
      label: "PayPal",
      icons: [
        "https://www.paypalobjects.com/webstatic/i/logo/rebrand/ppcom.svg",
      ],
    },
  ];
  const searchParams = useSearchParams();

  const product = {
    id: searchParams.get("id"),
    name: searchParams.get("name"),
    price: searchParams.get("price"),
    originalPrice: searchParams.get("originalPrice"),
    image: searchParams.get("image"),
    count: searchParams.get("quantity"),
  };

  return (
    <div className="flex flex-col md:justify-end justify-start items-start md:flex-row ">
      {/* Main Content */}
      <div className="md:w-auto w-full p-6 md:pr-12 bg-white">
        <Link href="/" className="text-2xl font-bold ">
          <Image src="/applogo.png" alt="" height={120} width={120} />
        </Link>

        {/* Express Checkout */}
        <div className="text-center text-gray-600  text-sm mt-[20px] ">
          EXPRESS CHECKOUT
        </div>

        <div className="flex flex-col  gap-2 md:my-6 my-4">
          <SimplePayPalButton amount={product?.price?.toString() || "0"} />

          <div className="flex  gap-2 ">
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

        <div className="flex w-full mb-6 justify-center items-center ">
          <div className="h-[1px] bg-gray-200 w-full"></div>

          <div className="text-center text-gray-600 mx-4 text-sm ">OR</div>

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

        {/* Payment Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Payment</h2>
          <div className="flex flex-col space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`cursor-pointer bg-gray-50 p-4 rounded-lg flex items-center justify-between border-2 ${
                  selectedMethod === method.id
                    ? "border-black"
                    : "border-transparent"
                }`}
              >
                <div className="flex items-center  gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={selectedMethod === method.id}
                    readOnly
                    className="peer hidden"
                  />
                  <div className="w-4 h-4 border-2 border-black rounded-full flex items-center justify-center">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        selectedMethod === method.id
                          ? "bg-black"
                          : "bg-transparent"
                      }`}
                    ></div>
                  </div>
                  <span className="font-medium">{method.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {method.icons.map((icon, index) => (
                    <img
                      key={index}
                      src={icon}
                      alt={method.label}
                      className="h-6"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Information */}
        <div className="mb-8">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Save this information for next time</span>
          </label>
        </div>

        {/* Proceed to Payment Button or PayPal Button */}

        {selectedMethod === "paypal" ? (
          <SimplePayPalButton amount={product?.price?.toString() || "0"} />
        ) : (
          <button className="w-full bg-black text-white py-3 rounded-lg">
            Proceed to Payment
          </button>
        )}
      </div>

      {/* Order Summary */}
      <div className="w-full h-auto md:w-[50%] border-l p-6 bg-[#F5F5F5] sticky top-0  right-0 md:h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Order summary</h2>
        <div className="space-y-3">
          <div className="flex flex-row justify-start items-end">
            <div className="relative">
              <img
                src={product?.image?.toString()}
                className="h-16 w-16 rounded-md border-1 "
              ></img>
              <div className="h-6 w-6 bg-[#666666] absolute rounded-full text-white text-xs -right-2 -top-2">
                <div className="flex flex-row w-full h-full justify-center items-center">
                  {" "}
                  {product?.count?.toString()}
                </div>
              </div>
            </div>

            <div className="ml-6 flex my-8 flex-col items-start justify-start">
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
