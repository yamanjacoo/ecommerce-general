"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Home Improvement Enthusiast",
    comment:
      "Eleika Wholesale has been a game-changer for my DIY projects. Their wide range of high-quality tools and excellent customer service keep me coming back!",
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Professional Contractor",
    comment:
      "As a contractor, I rely on dependable equipment. Eleika Wholesale never disappoints with their top-notch products and prompt delivery.",
    rating: 5,
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Coffee Shop Owner",
    comment:
      "The coffee machines I purchased from Eleika Wholesale have significantly improved our cafe's efficiency. Great products, great service!",
    rating: 4,
  },
  {
    id: 4,
    name: "Emily Brown",
    role: "Landscape Architect",
    comment:
      "From lawn mowers to pruning shears, Eleika Wholesale has all the outdoor equipment I need for my landscaping business. Highly recommended!",
    rating: 5,
  },
  {
    id: 5,
    name: "David Lee",
    role: "Home Owner",
    comment:
      "I'm impressed with the variety of home improvement tools available at Eleika Wholesale. It's my go-to store for all my household projects.",
    rating: 4,
  },
  {
    id: 6,
    name: "Sarah Wilson",
    role: "Restaurant Manager",
    comment:
      "The commercial kitchen equipment we bought from Eleika Wholesale has been reliable and efficient. Their after-sales support is commendable too.",
    rating: 5,
  },
  {
    id: 7,
    name: "Tom Anderson",
    role: "Electrician",
    comment:
      "As an electrician, I need tools I can trust. Eleika Wholesale provides top-quality electrical tools that make my job easier and safer.",
    rating: 5,
  },
  {
    id: 8,
    name: "Lisa Garcia",
    role: "Hobby Gardener",
    comment:
      "I love the selection of gardening tools at Eleika Wholesale. They have everything I need to keep my garden thriving!",
    rating: 4,
  },
  {
    id: 9,
    name: "Robert Taylor",
    role: "Construction Company Owner",
    comment:
      "Eleika Wholesale is our primary supplier for construction equipment. Their prices are competitive, and the quality is always top-notch.",
    rating: 5,
  },
  {
    id: 10,
    name: "Amanda White",
    role: "Interior Designer",
    comment:
      "I often recommend Eleika Wholesale to my clients for their home improvement needs. The range of products and the quality never disappoints.",
    rating: 5,
  },
];

export default function TestimonialScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-2">
          What Our Clients Say
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Hear from our satisfied customers
        </p>
        <div ref={scrollRef} className="overflow-hidden">
          <motion.div
            className="flex"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { x: "0%" },
              visible: {
                x: "-100%",
                transition: {
                  x: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 50,
                    ease: "linear",
                  },
                },
              },
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-[350px] mx-4 bg-white p-6 rounded-lg shadow-md relative"
              >
                <Quote className="absolute top-4 left-4 text-primary opacity-20 w-8 h-8" />
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic line-clamp-3">
                  &quot;{testimonial.comment}&quot;
                </p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
