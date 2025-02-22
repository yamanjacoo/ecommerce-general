"use client";
import "react-phone-number-input/style.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required").optional(),
  zipCode: z.string().min(1, "ZIP code is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits"),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

const europeanCountries = [
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "BG", name: "Bulgaria" },
  { code: "HR", name: "Croatia" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "EE", name: "Estonia" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "GR", name: "Greece" },
  { code: "HU", name: "Hungary" },
  { code: "IE", name: "Ireland" },
  { code: "IT", name: "Italy" },
  { code: "LV", name: "Latvia" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MT", name: "Malta" },
  { code: "NL", name: "Netherlands" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Romania" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ES", name: "Spain" },
  { code: "SE", name: "Sweden" },
];

const phonePrefixes: { [key: string]: string } = {
  US: "+1",
  AT: "+43",
  BE: "+32",
  BG: "+359",
  HR: "+385",
  CY: "+357",
  CZ: "+420",
  DK: "+45",
  EE: "+372",
  FI: "+358",
  FR: "+33",
  DE: "+49",
  GR: "+30",
  HU: "+36",
  IE: "+353",
  IT: "+39",
  LV: "+371",
  LT: "+370",
  LU: "+352",
  MT: "+356",
  NL: "+31",
  PL: "+48",
  PT: "+351",
  RO: "+40",
  SK: "+421",
  SI: "+386",
  ES: "+34",
  SE: "+46",
};

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  paymentLink: string;
}

interface OrderSummaryProps {
  product: Product;
}

export function CheckoutForm({ product }: { product: OrderSummaryProps }) {
  // const [selectedCountry, setSelectedCountry] = useState(["US"]);
  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const router = useRouter();

  const handleBuy = (url: string) => {
    router.push(url);
  };
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "US",
    },
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="max-w-[440px] border rounded-xl shadow-sm p-6 mx-auto">
      <Form {...form}>
        <form className="space-y-5">
          {/* Contact Section */}
          <div className="space-y-4">
            <h2 className="text-md font-medium">contact</h2>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="email"
                      {...field}
                      className="h-10 px-4 rounded-lg focus:border-2 border shadow-sm border-[#E5E7EB] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Delivery Section */}
          <div className="space-y-3">
            <h2 className="text-md font-medium">delivery</h2>

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedCountry(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10 px-4 rounded-lg focus:border-2 border shadow-sm border-[#E5E7EB] focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <SelectValue placeholder="countryRegion " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white max-h-[200px] overflow-y-auto">
                      <SelectItem value="US">unitedStates</SelectItem>
                      {europeanCountries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-1">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="firstNameOptional"
                        {...field}
                        className="h-10 px-4 rounded-lg focus:border-2 shadow-sm border border-[#E5E7EB] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="lastName"
                        {...field}
                        className="h-10 px-4 rounded-lg focus:border-2 border shadow-sm border-[#E5E7EB] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="address"
                      {...field}
                      className="h-10 px-4 rounded-lg focus:border-2 border shadow-sm border-[#E5E7EB] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apartment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="apartmentOptional"
                      {...field}
                      className="h-10 px-4 rounded-lg focus:border-2 border shadow-sm border-[#E5E7EB] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-1">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="city"
                        {...field}
                        className="h-10 px-4 rounded-lg focus:border-2 border shadow-sm border-[#E5E7EB] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {selectedCountry === "US" && (
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="state"
                          {...field}
                          className="h-10 px-4 rounded-lg focus:border-2 border shadow-sm border-[#E5E7EB] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="zipCode"
                        {...field}
                        className="h-10 px-4 rounded-lg focus:border-2 border shadow-sm border-[#E5E7EB] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        {phonePrefixes[selectedCountry as keyof typeof phonePrefixes]}
                      </span>
                      <Input 
                        placeholder={t('phone')} 
                        {...field}
                        className="h-10 px-4 rounded-r-lg focus:border-2 border shadow-sm border-[#E5E7EB] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1"
                        required
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <>
                  <FormItem className="focus-within:ring-2 focus-within:ring-blue-500 rounded-md">
                    <FormControl>
                      <div className="flex">
                        <PhoneInput
                          {...field}
                          defaultCountry="US"
                          onChange={field.onChange}
                          value={field.value}
                          placeholder="phone"
                          className="w-full h-10 px-4 rounded-lg border shadow-sm"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                  <FormMessage />
                </>
              )}
            />
          </div>

          {/* Shipping Section */}
          <div className="space-y-4">
            <h2 className="text-md font-medium">shipping</h2>
            <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
              <div>
                <div className="text-xs">express</div>
                <div className="text-gray-500 text-xs">sameDay</div>
              </div>
              <div className="font-medium text-xs">free</div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="">
            <h2 className="text-md font-medium">payment</h2>
            <p className="text-gray-500 text-sm pb-4">secureTransaction</p>

            <div className="border border-[#E5E7EB] rounded-lg p-4">
              <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between">
                <div className="flex items-center pb-2 lg:pb-0 space-x-2">
                  <input
                    type="radio"
                    checked
                    readOnly
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-xs">creditCard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img
                    src="/images/payments/pay6.png"
                    alt="Discover"
                    className="h-5"
                  />
                  <img
                    src="/images/payments/pay7.png"
                    alt="Discover"
                    className="h-5"
                  />
                  <img
                    src="/images/payments/pay1.png"
                    alt="Apple Pay"
                    className="h-5"
                  />
                  <img
                    src="/images/payments/pay3.png"
                    alt="Visa"
                    className="h-5"
                  />
                  <img
                    src="/images/payments/pay4.png"
                    alt="Mastercard"
                    className="h-5"
                  />
                  <img
                    src="/images/payments/pay5.png"
                    alt="American Express"
                    className="h-5"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-[20px] bg-[#0070F3] hover:bg-blue-600 text-white text-sm py-3 px-4 rounded-full disabled:opacity-50"
              >
                {isLoading ? <>Processing</> : "proceedToPayment"}
                {/* {status === "loading" ? "Processing" : proceedToPayment */}
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
