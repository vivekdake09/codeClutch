"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { motion } from "framer-motion"; // Importing Framer Motion for animations

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Registration attempt with:", { name, email, password });
      setIsLoading(false);
      // Redirect logic here
    }, 1500);
  };

  return (
    <div 
      className="flex min-h-screen flex-col items-center justify-center p-4 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/assets/1.jpg')" }} // Background image
    >
      {/* Overlay for better visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Registration Card */}
      <motion.div 
        className="relative w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-400/50"
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8 }}
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/">
            <Image
              src="/assets/logo2.jpg?height=80&width=80"
              alt="CloudPlay Logo"
              width={80}
              height={80}
              className="rounded-full mb-4"
            />
          </Link>
          <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">Create a <span className="text-blue-400">CloudPlay</span> Account</h1>
          <p className="text-sm text-gray-300">Sign up to start streaming your favorite videos</p>
        </div>

        <Card className="w-full bg-transparent shadow-none">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-white text-xl">Register</CardTitle>
              <CardDescription className="text-gray-300">Create your CloudPlay account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-200">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white bg-opacity-20 text-white placeholder-gray-300 border border-gray-500 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white bg-opacity-20 text-white placeholder-gray-300 border border-gray-500 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white bg-opacity-20 text-white placeholder-gray-300 border border-gray-500 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-gray-200">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-white bg-opacity-20 text-white placeholder-gray-300 border border-gray-500 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
                {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-gray-300 text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-400 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-400 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  type="submit" 
                  className="w-full text-lg py-3 rounded-xl shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </motion.div>
              <p className="text-center text-sm text-gray-300">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-400 hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
