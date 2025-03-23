import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">CloudPlay</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Welcome to CloudPlay Platform</h2>
            <p className="text-muted-foreground">Access your video content or manage videos as an admin</p>
          </div>

          <div className="flex flex-col space-y-4">
            <Link href="/client" passHref>
              <Button className="w-full" size="lg">
                Client Access
              </Button>
            </Link>

            <Link href="/admin" passHref>
              <Button className="w-full" variant="outline" size="lg">
                Admin Access
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} CloudPlay. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

