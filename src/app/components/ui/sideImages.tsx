import Image from "next/image"
import { type Dispatch, type SetStateAction, useCallback } from "react"


import { Product } from "../../types/product"
import { cn } from "@/lib/utils"
import { Carousel, CarouselApi, CarouselContent } from "@/components/ui/carousel"


type SideImagesProps = {
  images: Product["Images"]
  api: CarouselApi
  setThumbsApi: Dispatch<SetStateAction<CarouselApi>>
  current: number
  className?: string
}

export const SideImages = ({ className, images, api, setThumbsApi, current }: SideImagesProps) => {
  const onThumbClick = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  return (
    <div className={className}>
      <Carousel className="my-4 md:sticky md:top-[100px]" orientation="vertical" setApi={setThumbsApi} opts={{ skipSnaps: true, watchDrag: false }}>
        <CarouselContent className="mt-0 w-full flex-row justify-center gap-4 md:flex-col">
          {images.map((image, index :Number) => (
            <div
              className={cn("", index === (current === 0 ? current : current - 1) && "border-2 border-black")}
              key={"thumbnail_" + image.alt}
           
            >
              <Image alt={image.alt || ""} src={image.src || `/default-product-image.svg`} width={100} height={100} sizes="100px" />
            </div>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
