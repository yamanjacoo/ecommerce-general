import type { Dispatch, SetStateAction } from "react"
import Image from "next/image"


import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Product } from "../../types/product"
import { cn } from "@/lib/utils"

type CenterSectionProps = {
    images: Product["Images"]
  setApi: Dispatch<SetStateAction<CarouselApi>>
  className?: string
}

export const CenterSection = ({ className, images, setApi }: CenterSectionProps) => {
  const hasOnlyOneImage = images.length <= 1
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="md:sticky md:top-[100px]">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem className="relative aspect-square" key={image.src}>
                <Image alt={image.alt || ""} src={image.src || "/default-product-image.svg"} fill priority={index === 0} sizes="(max-width: 450px) 300px, 480px" />
              </CarouselItem>
            ))}
          </CarouselContent>
          {!hasOnlyOneImage && (
            <div className="mt-4 flex justify-center gap-10 pb-6">
              <CarouselPrevious className="relative" />
              <CarouselNext className="relative" />
            </div>
          )}
        </Carousel>
      </div>
    </div>
  )
}
