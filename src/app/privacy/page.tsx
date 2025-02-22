import { Shield, Eye, Clock, Lock, AlertTriangle, Mail, Phone, MapPin } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-12">Privacy Policy</h1>

        {/* Introduction Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start space-x-4">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-2">Introduction</h2>
              <p className="text-sm text-gray-500 mb-4">Last updated: May 4, 2023</p>
              <p className="text-gray-600 mb-4">
                At Your Store ("Store," "we," "our," or "us") we believe that managing your privacy is important,
                regardless of the season. Similar to how we craft our products, we have carefully crafted this online
                privacy policy (this "Policy") to explain to you how we use, disclose and otherwise interact with
                information we collect from you. We respect your privacy and are committed to managing it through our
                compliance with this Policy.
              </p>
            </div>
          </div>
        </div>

        {/* Information We Collect Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start space-x-4">
            <Eye className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-4">Information We Collect</h2>
              <p className="text-gray-600 mb-4">
                We may collect personal and other information about you when you voluntarily provide it to us, including
                on or through the Services. This may include your name, postal address, email address, telephone number,
                date of birth, gender, location, preferences, and payment information.
              </p>
              <p className="text-gray-600">
                We also collect information automatically when you use our Services, including your IP address, device
                type, browser type, and information about your activities on our websites and applications.
              </p>
            </div>
          </div>
        </div>

        {/* How We Use Your Information Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start space-x-4">
            <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We use your information to:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Respond to your requests</li>
                <li>Improve our products and services</li>
                <li>Personalize your experience</li>
                <li>Process transactions</li>
                <li>Send promotional communications</li>
                <li>Analyze usage of our Services</li>
                <li>Protect the security of our Services</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Information Sharing Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start space-x-4">
            <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-4">Information Sharing</h2>
              <p className="text-gray-600 mb-4">We may share your information with:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Our subsidiaries and affiliates</li>
                <li>Service providers and business partners</li>
                <li>Legal authorities when required by law</li>
                <li>Other parties in connection with a corporate transaction</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Children Under 13 Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-4">Children Under the Age of 13</h2>
              <p className="text-gray-600">
                The Services are not intended for anyone under the age of 13, and we do not knowingly collect personal
                information from children under 13. In the event that we learn that we have collected personal
                information from a child under the age of 13, without parental consent, we will delete that information
                and otherwise comply with the requirements of any applicable law including the Children's Online Privacy
                Protection Act. If you believe that we might have any information from or about a child under the age of
                13, please contact us at privacy@yourstore.com.
              </p>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start space-x-4">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-4">Security</h2>
              <p className="text-gray-600">
                We strive to use reasonable means to secure your personal information while you are using the Services.
                However, please keep in mind that the transmission of information over the Internet and on mobile
                platforms is not always secure, which means we cannot and do not guarantee the security or
                confidentiality of any personal information your provide to us. Given this reality, your use of the
                Services, and your decision to provide personal information to us, is at your own risk.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            To ask questions or comment about this Policy or our Terms of Use, or to remove or change your contact
            information in our database, or to not receive future mailings or other communications, as well as other
            inquiries, please contact us at any time using one of the options below:
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-gray-600">privacy@yourstore.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-gray-600">(920) 756-2141</span>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div className="text-gray-600">
                <p>Your Store</p>
                <p>Attn: Privacy Team</p>
                <p>655 West Ryan Street</p>
                <p>Brillion, WI 54110</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

