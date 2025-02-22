import { RefreshCw, AlertTriangle, Ban, Euro, CreditCard, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Returns Policy</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At Your Store, we want you to be completely satisfied with your purchase. Our returns policy is designed to
            give you peace of mind and ensure a smooth experience if you need to return an item.
          </p>
        </div>

        {/* 30-Day Return Policy */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start space-x-4">
            <RefreshCw className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-4">30-Day Return Policy</h2>
              <p className="text-gray-600 mb-4">
                We have a 30-day return policy, which means you have 30 days after receiving your item to request a
                return. To be eligible for a return, your item must be in the same condition that you received it,
                unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of
                purchase.
              </p>
              <p className="text-gray-600">
                To start a return, contact us at contact@yourstore.com. Returns should be sent to: 655 West Ryan Street,
                Brillion, WI 54110, USA. If your return is accepted, we'll send you a return shipping label and
                instructions. Items sent back without first requesting a return will not be accepted.
              </p>
            </div>
          </div>
        </div>

        {/* Damages and Issues */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-4">Damages and Issues</h2>
              <p className="text-gray-600">
                Please inspect your order upon reception and contact us immediately if the item is defective, damaged or
                if you receive the wrong item, so that we can evaluate the issue and make it right.
              </p>
            </div>
          </div>
        </div>

        {/* Exceptions / Non-Returnable Items */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start space-x-4">
            <Ban className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-4">Exceptions / Non-Returnable Items</h2>
              <p className="text-gray-600">
                Certain types of items cannot be returned, including perishable goods, custom products, personal care
                goods, and hazardous materials. We also do not accept returns for sale items or gift cards. Please
                contact us if you have questions about a specific item.
              </p>
            </div>
          </div>
        </div>

        {/* European Union 14-Day Cooling Off Period */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start space-x-4">
            <Euro className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-4">European Union 14-Day Cooling Off Period</h2>
              <p className="text-gray-600">
                For merchandise shipped into the European Union, you have the right to cancel or return your order
                within 14 days, for any reason and without justification. The item must be in the same condition that
                you received it, unworn or unused, with tags, and in its original packaging. You'll also need the
                receipt or proof of purchase.
              </p>
            </div>
          </div>
        </div>

        {/* Refunds */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <div className="flex items-start space-x-4">
            <CreditCard className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-4">Refunds</h2>
              <p className="text-gray-600 mb-4">
                We will notify you once we've received and inspected your return, and let you know if the refund was
                approved or not. If approved, you'll be automatically refunded on your original payment method within 10
                business days. Please remember it can take some time for your bank or credit card company to process and
                post the refund too.
              </p>
              <p className="text-gray-600">
                If more than 15 business days have passed since we've approved your return, please contact us at
                contact@yourstore.com.
              </p>
            </div>
          </div>
        </div>

        {/* Need More Information Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Need More Information?</h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about our returns policy or need assistance with a return, our customer service
            team is here to help.
          </p>
          <Button asChild>
            <Link href="/contact" className="inline-flex items-center">
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

