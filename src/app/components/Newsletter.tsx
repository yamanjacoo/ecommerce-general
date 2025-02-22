"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, XCircle } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // Simulating API call
    setTimeout(() => {
      if (email.includes("@")) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    }, 1500)
  }

  return (
    <section className="py-16 bg-primary text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-secondary"></div>
      <div className="absolute inset-0 bg-[url('/newsletter-bg.jpg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-primary/80"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-lg mb-8">
            Subscribe to our newsletter for exclusive deals, new product alerts, and insider tips!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="relative w-full md:w-2/3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-3 rounded-full bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300"
                required
              />
              <AnimatePresence>
                {status === "loading" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <div className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-primary font-semibold rounded-full hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
              type="submit"
              disabled={status === "loading"}
            >
              Subscribe
              <Send className="ml-2 w-5 h-5" />
            </motion.button>
          </form>
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 flex items-center justify-center text-green-300"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Thank you for subscribing!</span>
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 flex items-center justify-center text-red-300"
              >
                <XCircle className="w-5 h-5 mr-2" />
                <span>Oops! Something went wrong. Please try again.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

