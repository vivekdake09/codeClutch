import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold">
            <span className="hidden sm:inline-block">Video Admin Dashboard</span>
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </main>
    </div>
  )
}

