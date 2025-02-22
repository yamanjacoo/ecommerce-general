"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface FiltersProps {
  types: string[];
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
  priceRange: [number, number];
  maxPrice: number;
  onPriceRangeChange: (range: [number, number]) => void;
}

export function Filters({
  types,
  selectedTypes,
  onTypeChange,
  priceRange,
  maxPrice,
  onPriceRangeChange,
}: FiltersProps) {
  const handleTypeChange = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    onTypeChange(newTypes);
  };

  return (
    <div className="space-y-1">
      <Accordion
        type="multiple"
        defaultValue={["type", "price", "status", "vendor"]}
        className="space-y-2"
      >
        <AccordionItem value="type">
          <AccordionTrigger className="text-sm font-semibold">
            Type
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              {types.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={() => handleTypeChange(type)}
                  />
                  <Label
                    htmlFor={`type-${type}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-semibold">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-2 pt-4 space-y-4">
              <Slider
                value={[priceRange[0], priceRange[1]]}
                max={maxPrice}
                step={1}
                onValueChange={(value) =>
                  onPriceRangeChange(value as [number, number])
                }
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  ${priceRange[0]}
                </span>
                <span className="text-sm text-muted-foreground">
                  ${priceRange[1]}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="status">
          <AccordionTrigger className="text-sm font-semibold">
            Status
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="status-published" />
                <Label htmlFor="status-published">Published</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="status-in-stock" />
                <Label htmlFor="status-in-stock">In Stock</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="vendor">
          <AccordionTrigger className="text-sm font-semibold">
            Vendor
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              {Array.from(new Set(types)).map((vendor) => (
                <div key={vendor} className="flex items-center space-x-2">
                  <Checkbox id={`vendor-${vendor}`} />
                  <Label htmlFor={`vendor-${vendor}`}>{vendor}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
