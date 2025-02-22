import { Phone, Mail, MessageCircle } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Still Need Help?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <Phone className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Call Us</h3>
          <p className="mb-4">Our support team is available Mon-Fri, 9am-5pm</p>
          <a href="tel:+1234567890" className="text-primary hover:underline">
            +1 (234) 567-890
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <Mail className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Email Us</h3>
          <p className="mb-4">We'll respond to your email within 24 hours</p>
          <a href="mailto:support@example.com" className="text-primary hover:underline">
            support@example.com
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <MessageCircle className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
          <p className="mb-4">Chat with our support team in real-time</p>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors duration-300">
            Start Chat
          </button>
        </div>
      </div>
    </section>
  )
}

