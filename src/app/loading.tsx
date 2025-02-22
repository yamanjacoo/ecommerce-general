export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

