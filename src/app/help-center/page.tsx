"use client";

import type React from "react";

import { useState } from "react";
import { Search } from "lucide-react";
import type { Metadata } from "next";

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Help Center</h1>

        {/* Search Bar */}
        {/* <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help across all product categories..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div> */}

        {/* Help Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Getting Started Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-primary mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h2 className="text-2xl font-bold">Getting Started</h2>
            </div>
            <div className="space-y-3">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-primary hover:text-primary-dark">
                  Product Assembly and Setup
                  <span className="transform group-open:rotate-180 transition-transform">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 pl-4">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Unboxing and parts verification</li>
                    <li>Step-by-step assembly guides</li>
                    <li>Initial setup and configuration</li>
                    <li>Connecting to power sources or networks</li>
                    <li>Pre-use inspections and checks</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-primary hover:text-primary-dark">
                  First-Time Use Instructions
                  <span className="transform group-open:rotate-180 transition-transform">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 pl-4">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Reading user manuals and safety guidelines</li>
                    <li>Understanding product controls and features</li>
                    <li>Initial settings and customization</li>
                    <li>Performing test runs or calibrations</li>
                    <li>Tips for optimal first-time experiences</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-primary hover:text-primary-dark">
                  Safety Guidelines
                  <span className="transform group-open:rotate-180 transition-transform">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 pl-4">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>General safety precautions for all products</li>
                    <li>Proper use of safety equipment and gear</li>
                    <li>Environmental considerations and best practices</li>
                    <li>Child and pet safety around equipment</li>
                    <li>Emergency procedures and contact information</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>

          {/* Troubleshooting Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-primary mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h2 className="text-2xl font-bold">Troubleshooting</h2>
            </div>
            <div className="space-y-3">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-primary hover:text-primary-dark">
                  Common Issues and Solutions
                  <span className="transform group-open:rotate-180 transition-transform">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 pl-4">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Power-related problems and checks</li>
                    <li>Connectivity issues for smart devices</li>
                    <li>Performance optimization tips</li>
                    <li>Noise or vibration troubleshooting</li>
                    <li>Software and firmware update guidance</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-primary hover:text-primary-dark">
                  Error Codes and Diagnostics
                  <span className="transform group-open:rotate-180 transition-transform">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 pl-4">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Understanding common error codes</li>
                    <li>Step-by-step diagnostic procedures</li>
                    <li>Self-service repair guidelines</li>
                    <li>When to seek professional assistance</li>
                    <li>Warranty information and support</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-primary hover:text-primary-dark">
                  Product-Specific Issues
                  <span className="transform group-open:rotate-180 transition-transform">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 pl-4">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Coffee makers and espresso machines</li>
                    <li>Pressure washers and outdoor equipment</li>
                    <li>Power tools and construction equipment</li>
                    <li>Smart home devices and automation</li>
                    <li>Audio gear and entertainment systems</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>

          {/* Maintenance Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-primary mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                />
              </svg>
              <h2 className="text-2xl font-bold">Maintenance</h2>
            </div>
            <div className="space-y-3">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-primary hover:text-primary-dark">
                  Routine Maintenance Tips
                  <span className="transform group-open:rotate-180 transition-transform">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 pl-4">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>General cleaning and care instructions</li>
                    <li>Lubrication and moving parts maintenance</li>
                    <li>Filter replacement schedules</li>
                    <li>Software and firmware updates</li>
                    <li>Battery care and optimization</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-primary hover:text-primary-dark">
                  Seasonal Maintenance
                  <span className="transform group-open:rotate-180 transition-transform">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 pl-4">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Winterizing outdoor equipment</li>
                    <li>Spring startup procedures</li>
                    <li>Summer heat protection measures</li>
                    <li>Fall preparation and storage tips</li>
                    <li>Off-season maintenance checklist</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-primary hover:text-primary-dark">
                  Long-Term Care
                  <span className="transform group-open:rotate-180 transition-transform">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 pl-4">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Product lifespan optimization tips</li>
                    <li>Deep cleaning and refurbishment guides</li>
                    <li>Component replacement schedules</li>
                    <li>Storage best practices for infrequently used items</li>
                    <li>Upgrade and modernization options</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>

          {/* Product Information Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-primary mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h2 className="text-2xl font-bold">Product Information</h2>
            </div>
            <div className="space-y-3">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-primary hover:text-primary-dark">
                  Product Manuals and Guides
                  <span className="transform group-open:rotate-180 transition-transform">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 pl-4">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Downloadable user manuals</li>
                    <li>Quick start guides</li>
                    <li>Detailed product specifications</li>
                    <li>Installation and setup instructions</li>
                    <li>Safety and warranty information</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-primary hover:text-primary-dark">
                  Accessories and Compatibility
                  <span className="transform group-open:rotate-180 transition-transform">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 pl-4">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Compatible accessories list</li>
                    <li>Replacement parts information</li>
                    <li>Upgrade options and compatibility</li>
                    <li>Third-party accessory recommendations</li>
                    <li>Product ecosystem integration guides</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-primary hover:text-primary-dark">
                  Product Registration and Warranty
                  <span className="transform group-open:rotate-180 transition-transform">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 pl-4">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Product registration process</li>
                    <li>Warranty terms and conditions</li>
                    <li>Extended warranty options</li>
                    <li>How to make a warranty claim</li>
                    <li>Product support and service centers</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
