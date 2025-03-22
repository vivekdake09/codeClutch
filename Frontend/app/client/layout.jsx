import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ClientLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/client" className="font-bold text-xl">
            Video Platform
          </Link>

          <div className="hidden md:flex items-center space-x-1 flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search videos..." className="pl-8 w-full" />
            </div>
          </div>

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Video Platform. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

