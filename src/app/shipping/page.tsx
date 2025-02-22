import Link from "next/link";
import { Truck, Clock, Globe, Package } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-4">Shipping Information</h1>
          <p className="text-gray-600">
            At Your Store, we're committed to getting your products to you
            quickly and efficiently. That's why we offer free 2-4 day shipping
            on all orders within the contiguous United States.
          </p>
        </div>

        {/* Shipping Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Truck className="w-8 h-8 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Free 1-2 Day Shipping
            </h2>
            <p className="text-gray-600">
              Enjoy complimentary standard shipping on all orders within the
              contiguous United States. Your order will arrive within 1-2
              business days from the date of purchase.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Clock className="w-8 h-8 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Shipping Timeframes</h2>
            <p className="text-gray-600">
              Orders are typically processed within 1 business day. Shipping
              time is 1-2 business days, depending on your location. Please note
              that delivery times may be longer for Alaska, Hawaii, and
              international orders.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Globe className="w-8 h-8 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              International Shipping
            </h2>
            <p className="text-gray-600">
              We offer international shipping to select countries. International
              orders may incur additional customs fees and taxes, which are the
              responsibility of the recipient.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Package className="w-8 h-8 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Tracking Your Order</h2>
            <p className="text-gray-600">
              Once your order ships, you'll receive a confirmation email with
              tracking information. You can track your package's progress at any
              time through our website or the carrier's site.
            </p>
          </div>
        </div>

        {/* Returns Policy Section */}
        <div className="bg-red-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Returns Policy</h2>
          <p className="text-gray-700 mb-4">
            We stand behind the quality of our products. If you're not
            completely satisfied with your purchase, you can return it within 30
            days of receipt for a full refund or exchange, subject to the
            following conditions:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
            <li>
              The item must be in its original, unused condition with all
              original packaging and accessories.
            </li>
            <li>
              Shipping costs for returns are the responsibility of the customer,
              unless the return is due to our error.
            </li>
            <li>
              Refunds will be processed to the original payment method within
              5-10 business days of receiving the returned item.
            </li>
            <li>
              For warranty-related issues, please refer to our{" "}
              <Link href="/warranty" className="text-primary hover:underline">
                Warranty page
              </Link>
              .
            </li>
          </ul>
          <p className="text-gray-700">
            To initiate a return, please contact our customer service team for a
            Return Merchandise Authorization (RMA) number and further
            instructions.
          </p>
        </div>

        {/* Shipping FAQs Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Shipping FAQs</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Do you ship to PO boxes?</h3>
              <p className="text-gray-600">
                Yes, we can ship to PO boxes for most items.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Can I change my shipping address after placing an order?
              </h3>
              <p className="text-gray-600">
                Please contact our customer service as soon as possible if you
                need to change your shipping address.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                What if my package is lost or damaged?
              </h3>
              <p className="text-gray-600">
                Contact our customer service immediately, and we'll work to
                resolve the issue promptly.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Do you offer expedited shipping?
              </h3>
              <p className="text-gray-600">
                For urgent orders, please contact our customer service for
                expedited shipping options.
              </p>
            </div>
          </div>
        </div>

        {/* Need More Information Section */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Need More Information?</h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about our shipping policies or need
            assistance with a return, our customer service team is here to help.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
