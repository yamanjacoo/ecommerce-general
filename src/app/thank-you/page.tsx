"use client";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";

// Generate random tracking number and transaction ID
function generateRandomId(prefix: string, length: number) {
  return `${prefix}${Math.random()
    .toString(36)
    .substring(2, length + 2)
    .toUpperCase()}`;
}

export default function ThankYouPage({
  params,
}: {
  params: {
    orderId: string;
    endingcard: string;
    image: string;
    title: string;
    subtitle: string;
  };
}) {
  const trackingNumber = generateRandomId("TRK", 10);
  const transactionId = generateRandomId("TXN", 12);
  const searchParams = useSearchParams();

  const product = {
    name: searchParams.get("name"),
    price: searchParams.get("price"),
    image: searchParams.get("image"),
    endingcard: searchParams.get("endingcard"),
    address: searchParams.get("address"),
    email: searchParams.get("email"),
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Your Shopify Store
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-start gap-4 mb-6">
            <CheckCircle2 className="w-8 h-8 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">
                Order #EL-1IJZ899113N
              </div>
              <h2 className="text-2xl font-semibold">Thank you John!</h2>
            </div>
          </div>

          <Card className="mb-6 p-6">
            <h3 className="text-lg font-semibold mb-2">
              Your order is confirmed
            </h3>
            <p className="text-muted-foreground">
              You'll receive a confirmation email with your order number
              shortly.
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              <div>Tracking Number: {trackingNumber}</div>
              <div>Transaction ID: {transactionId}</div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Customer information</h3>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-3">Contact information</h4>
                <p className="text-muted-foreground">{product.email}</p>
              </div>
              <div>
                <h4 className="font-medium mb-3">Payment method</h4>
                <p className="text-muted-foreground">
                  Visa ending with {product.endingcard}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-3">Shipping address</h4>
                <div className="text-muted-foreground">
                  <p>{product.address}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Billing address</h4>
                <div className="text-muted-foreground">
                  <p>{product.address}</p>
                </div>
              </div>
              <div className="md:col-span-2">
                <h4 className="font-medium mb-3">Shipping method</h4>
                <p className="text-muted-foreground">First Class Package</p>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-34-2048x1152-crZh2SCGjx0utRlsfvNf5TWx0fxrci.webp"
                  alt="Product"
                  fill
                  className="object-cover"
                />
                <span className="absolute top-0 right-0 bg-gray-500 text-white text-xs px-1 rounded-bl">
                  1
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Product Name</h4>
                <p className="text-lg font-semibold">$360.00</p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>$360.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span>$0.00</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-lg">$365.00</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <HelpCircle className="w-5 h-5" />
          <span>Need help?</span>
          <Link href="#" className="text-primary hover:underline">
            Contact us
          </Link>
        </div>
        <Button asChild>
          <Link href="/">Continue shopping</Link>
        </Button>
      </div>
    </div>
  );
}
