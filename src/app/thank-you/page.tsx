// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { CheckCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// // Helper function to generate random order ID
// const generateOrderId = () => {
//   return Math.floor(100000 + Math.random() * 900000);
// };

// // Helper function to generate random tracking number
// const generateTrackingNumber = () => {
//   return `TN${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
// };

// // Helper function to format date
// const formatDate = (date: Date) => {
//   return new Intl.DateTimeFormat("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   }).format(date);
// };

// export default function ThankYouPage({
//   product,
//   paymentMethod,
// }: {
//   product: {
//     name: string;
//     price: string;
//     image: string;
//     count: string;
//   };
//   paymentMethod: string;
// }) {
//   const orderId = generateOrderId();
//   const trackingNumber = generateTrackingNumber();
//   const orderDate = new Date();
//   const estimatedDelivery = new Date(orderDate);
//   estimatedDelivery.setDate(orderDate.getDate() + 7);

//   const paymentMethodInfo = {
//     "credit-card": {
//       label: "Credit Card",
//       icon: "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/visa.sxIq5Dot.svg",
//     },
//     paypal: {
//       label: "PayPal",
//       icon: "https://www.paypalobjects.com/webstatic/i/logo/rebrand/ppcom.svg",
//     },
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen">
//       {/* Left Section - Order Details */}
//       <div className="flex-1 p-6 md:p-12">
//         <Link href="/" className="mb-8 block">
//           <Image src="/applogo.png" alt="Logo" height={120} width={120} />
//         </Link>

//         <div className="flex items-center gap-4 mb-8">
//           <CheckCircle className="w-12 h-12 text-green-500" />
//           <div>
//             <h1 className="text-2xl font-bold">Thank you for your order!</h1>
//             <p className="text-gray-600">Order #{orderId}</p>
//           </div>
//         </div>

//         <Card className="p-6 mb-8">
//           <h2 className="font-semibold mb-4">Order Information</h2>
//           <div className="space-y-4 text-sm">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Order Date</span>
//               <span>{formatDate(orderDate)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Tracking Number</span>
//               <span>{trackingNumber}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Estimated Delivery</span>
//               <span>{formatDate(estimatedDelivery)}</span>
//             </div>
//             <Separator />
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600">Payment Method</span>
//               <div className="flex items-center gap-2">
//                 <img
//                   src={
//                     paymentMethodInfo[
//                       paymentMethod as keyof typeof paymentMethodInfo
//                     ].icon || "/placeholder.svg"
//                   }
//                   alt={
//                     paymentMethodInfo[
//                       paymentMethod as keyof typeof paymentMethodInfo
//                     ].label
//                   }
//                   className="h-6"
//                 />
//                 <span>
//                   {
//                     paymentMethodInfo[
//                       paymentMethod as keyof typeof paymentMethodInfo
//                     ].label
//                   }
//                 </span>
//               </div>
//             </div>
//           </div>
//         </Card>

//         <div className="space-y-4">
//           <p className="text-gray-600">
//             We'll send you shipping confirmation when your order is on its way!
//           </p>
//           <Button asChild className="w-full sm:w-auto">
//             <Link href="/">Continue Shopping</Link>
//           </Button>
//         </div>
//       </div>

//       {/* Right Section - Product Summary */}
//       <div className="w-full md:w-[40%] bg-[#F5F5F5] p-6 md:p-12">
//         <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
//         <div className="space-y-6">
//           <div className="flex items-start gap-4">
//             <div className="relative">
//               <img
//                 src={product.image || "/placeholder.svg"}
//                 alt={product.name}
//                 className="h-20 w-20 rounded-lg border object-cover"
//               />
//               <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#666666] text-xs text-white">
//                 {product.count}
//               </div>
//             </div>
//             <div className="flex-1">
//               <h3 className="font-medium">{product.name}</h3>
//               <p className="text-sm text-gray-600">Quantity: {product.count}</p>
//             </div>
//             <p className="font-medium">${product.price}</p>
//           </div>

//           <Separator />

//           <div className="space-y-2">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Subtotal</span>
//               <span>${product.price}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Shipping</span>
//               <span>FREE</span>
//             </div>
//             <Separator />
//             <div className="flex justify-between text-lg font-semibold">
//               <span>Total</span>
//               <span>${product.price}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
