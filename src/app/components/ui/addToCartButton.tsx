"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { usePathname, useRouter } from "next/navigation";

import SimplePayPalButton from "./paypalButton";
import { Product } from "../../types/product";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/src/context/cartProvider";

export function AddToCartButton({
  className,
  product,
  price,
  quantity,
}: {
  className?: string;
  product: Product;
  price: string;
  quantity: number;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const { setProduct } = useCart();
  // getOptionsFromUrl(pathname);
  const goToCheckout = () => {
    const checkoutParams = new URLSearchParams({
      id: product.Handle.toString(),
      name: product.Title,
      price: price,
      originalPrice: product.OriginalPrice.toString(),
      discountPercentage: "",
      image: product.Images[0]?.src || "/placeholder.svg",
      quantity: quantity.toString(),
    }).toString();
    // setProduct(product);
    router.push(`/checkout/${product.Handle.toString()}?${checkoutParams}`); // Ensure product.handle is a valid string
  };
  return (
    <div className="flex flex-col space-y-3">
      <Button
        onClick={goToCheckout}
        disabled={isPending}
        variant="default"
        className={cn(
          "mx-auto h-[48px] w-full rounded-md p-10 py-4 transition-all hover:scale-105 md:w-full md:rounded-md md:py-4",
          className
        )}
      >
        Buy now
      </Button>
      <SimplePayPalButton amount={price} />
    </div>
  );
}
