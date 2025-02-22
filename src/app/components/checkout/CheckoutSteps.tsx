interface CheckoutStepsProps {
  steps: string[]
  currentStep: number
}

export default function CheckoutSteps({ steps, currentStep }: CheckoutStepsProps) {
  return (
    <div className="flex justify-center items-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className="relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                index <= currentStep ? "border-primary bg-primary text-white" : "border-gray-300 bg-white text-gray-500"
              }`}
            >
              <span className="text-sm font-semibold">{index + 1}</span>
            </div>
            <span
              className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm whitespace-nowrap ${
                index <= currentStep ? "text-primary font-medium" : "text-gray-500"
              }`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-20 h-0.5 mx-2 ${index < currentStep ? "bg-primary" : "bg-gray-300"}`} />
          )}
        </div>
      ))}
    </div>
  )
}

