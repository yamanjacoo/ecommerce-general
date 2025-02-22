import { Shield, Clock, PenToolIcon as Tool, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-4">Warranty Information</h1>
          <p className="text-gray-600">
            At Your Store, we stand behind the quality of our products. Our comprehensive warranty ensures that you can
            use our equipment with confidence.
          </p>
          <Link
            href="/register"
            className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
          >
            Register Your Product
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Shield className="w-8 h-8 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Comprehensive Coverage</h2>
            <p className="text-gray-600">Our warranty covers all manufacturing defects and faulty parts.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Clock className="w-8 h-8 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Extended Protection</h2>
            <p className="text-gray-600">Enjoy peace of mind with our 3-year standard warranty on all products.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Tool className="w-8 h-8 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Expert Repairs</h2>
            <p className="text-gray-600">Get your equipment fixed by certified technicians using genuine parts.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <CheckCircle className="w-8 h-8 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Easy Claims Process</h2>
            <p className="text-gray-600">Simple and straightforward warranty claim process for your convenience.</p>
          </div>
        </div>

        {/* Warranty Terms Section */}
        <div className="bg-red-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Warranty Terms</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              3-year warranty on all products for residential use
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              1-year warranty for commercial use
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              90-day warranty on accessories and replacement parts
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              Warranty covers defects in materials and workmanship
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              Excludes normal wear and tear, misuse, or improper maintenance
            </li>
          </ul>
        </div>

        {/* Registration Section */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Register Your Product</h2>
          <p className="text-gray-600 mb-6">
            Register your product to activate your warranty and receive important product updates.
          </p>
          <Link
            href="/register"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  )
}

