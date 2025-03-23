import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Register() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="max-w-md w-full space-y-6 p-6 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-bold text-center">Register for CloudPlay</h2>
        <Input type="text" placeholder="Full Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full">Register</Button>
        <p className="text-sm text-center text-muted-foreground">
          Already have an account? <Link href="/login" className="text-primary">Login</Link>
        </p>
      </div>
    </div>
  )
}
