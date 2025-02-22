import type { ReactNode } from "react"

export default function HelpCenterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-50">
      <main className="min-h-screen">{children}</main>
    </div>
  )
}

