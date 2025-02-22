"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-4">Website Terms & Conditions of Use</h1>

        <p className="text-gray-600 text-center mb-8">
          Please read the following terms of use carefully before using this site. By using or accessing this site or
          using the services therein, you agree to these terms of use.
        </p>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-500 mb-6">Last updated: May 4, 2023</p>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="acceptance" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">Acceptance of the Terms of Use</AccordionTrigger>
              <AccordionContent className="text-gray-600 space-y-4 pt-4">
                <p>
                  Your Store ("Store," "we," "us," and "our"), owns and operates any website (including without
                  limitation yourstore.com and related domains) (the "Sites") and mobile application (the "Apps")
                  (collectively, the "Services") on which these terms and conditions of use (these "Terms of Use") are
                  posted.
                </p>
                <p>
                  By visiting, downloading, using and/or submitting information to the Services, you agree to be bound
                  by these Terms of Use and Your Store's Privacy Policy available here (the "Privacy Policy"), which is
                  incorporated herein. If you do not agree with these Terms of Use and/or the Privacy Policy, your
                  choice is to not use the Services.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="changes" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">Changes to the Terms of Use</AccordionTrigger>
              <AccordionContent className="text-gray-600 space-y-4 pt-4">
                <p>
                  We may revise and update these Terms of Use from time to time in our sole discretion. All changes are
                  effective immediately and apply to all access to and use of the Services thereafter. However, any
                  changes to the dispute resolution provisions set out in the Governing Law section will not apply to
                  any disputes for which the parties have actual notice on or before the date the change is posted on
                  the Services.
                </p>
                <p>
                  Your continued use of the Services following the posting of revised Terms of Use means that you accept
                  and agree to the changes. Notwithstanding anything to the contrary in these Terms of Use, you are
                  expected to check this page from time to time so you are aware of any changes to these Terms of Use,
                  as they are binding on you.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="access" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">Your Access and Use of the Site</AccordionTrigger>
              <AccordionContent className="text-gray-600 space-y-4 pt-4">
                <p>
                  By accessing the Services, Your Store is providing you a limited, revocable, non-exclusive,
                  non-transferable, non-sublicensable, non-assignable right to access and use the Services for your own
                  personal, non-commercial use; the right to access and use the Services is personal to you and is not
                  transferable by you to any other person or entity except as described below with regards to a business
                  you are authorized to act on behalf of.
                </p>
                <p>
                  You are only entitled to access and use the Services for lawful purposes and pursuant to the terms and
                  conditions of these Terms of Use and the Privacy Policy.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="intellectual-property" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">Intellectual Property Rights</AccordionTrigger>
              <AccordionContent className="text-gray-600 space-y-4 pt-4">
                <p>
                  The Services and their entire contents, features, and functionality (including but not limited to all
                  information, software, text, displays, images, video, and audio, and the design, selection, and
                  arrangement thereof) are owned by Your Store, its licensors, or other providers of such material and
                  are protected by United States and international copyright, trademark, patent, trade secret, and other
                  intellectual property or proprietary rights laws.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="prohibited-uses" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">Prohibited Uses</AccordionTrigger>
              <AccordionContent className="text-gray-600 space-y-4 pt-4">
                <p>You may use the Services only for lawful purposes and in accordance with these Terms of Use.</p>
                <p>You agree not to use the Services:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    In any way that violates any applicable federal, state, local, or international law or regulation
                  </li>
                  <li>To transmit, or procure the sending of, any advertising or promotional material</li>
                  <li>
                    To impersonate or attempt to impersonate the Company, an employee, or any other person or entity
                  </li>
                  <li>
                    To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Services
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="disclaimer" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold">Disclaimer of Warranties</AccordionTrigger>
              <AccordionContent className="text-gray-600 space-y-4 pt-4">
                <p>
                  Your use of the Services is at your own risk. The Services are provided on an "AS IS" and "AS
                  AVAILABLE" basis, without any warranties of any kind, either express or implied. Neither Your Store
                  nor any person associated with Your Store makes any warranty or representation with respect to the
                  completeness, security, reliability, quality, accuracy, or availability of the Services.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

