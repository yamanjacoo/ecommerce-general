"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How do I choose the right coffee maker for my needs?",
    answer:
      "Consider factors such as capacity, brewing options, and convenience features. For a single user, a single-serve machine might be ideal, while a family might prefer a larger drip coffee maker.",
  },
  {
    question: "What maintenance is required for a pressure washer?",
    answer:
      "Regular maintenance includes cleaning the nozzle, checking and replacing oil, inspecting hoses for wear, and winterizing the machine if you live in a cold climate.",
  },
  {
    question: "How often should I sharpen my mower blades?",
    answer:
      "Generally, you should sharpen your mower blades after every 20-25 hours of use, or at least once per mowing season.",
  },
  {
    question: "What safety precautions should I take when using a generator?",
    answer:
      "Always operate generators outdoors and away from windows, never refuel while the generator is running, and ensure proper grounding and connection to avoid electrical hazards.",
  },
  {
    question: "How do I winterize my pool?",
    answer:
      "Winterizing involves cleaning the pool, balancing water chemistry, lowering the water level, draining pipes and equipment, and covering the pool. The exact process may vary depending on your climate and pool type.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <button className="flex justify-between items-center w-full p-4 text-left" onClick={() => toggleFAQ(index)}>
              <span className="font-semibold">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            {openIndex === index && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

