import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto text-center space-y-8 p-4">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="CloudPlay Logo"
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Welcome to CloudPlay</h1>
            <p className="text-muted-foreground">Your ultimate video streaming platform</p>
          </div>

          <div className="flex flex-col space-y-4">
            <Link href="/login" passHref>
              <Button className="w-full" size="lg">
                Login
              </Button>
            </Link>

            <Link href="/register" passHref>
              <Button className="w-full" variant="outline" size="lg">
                Register
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

