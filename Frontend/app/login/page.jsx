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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Login attempt with:", { email, password });
      setIsLoading(false);
      // Redirect logic here
    }, 1500);
  };

  return (
    <div 
      className="flex min-h-screen flex-col items-center justify-center p-4 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/assets/7.jpg')" }} // Background image
    >
      {/* Overlay for better visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Login Card */}
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
          <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">Login to <span className="text-blue-400">CloudPlay</span></h1>
          <p className="text-sm text-gray-300">Enter your credentials to access your account</p>
        </div>

        <Card className="w-full bg-transparent shadow-none">
          <form onSubmit={handleSubmit}>
            <CardHeader>
            
                <CardTitle className="text-white text-xl cursor-pointer hover:underline">Login</CardTitle>

              <CardDescription className="text-gray-300">Access your CloudPlay account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-200">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-blue-400 hover:underline">
                    Forgot password?
                  </Link>
                </div>
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
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-gray-300 text-sm">
                  Remember me
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  type="submit" 
                  className="w-full text-lg py-3 rounded-xl shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 transition-all"
                  disabled={isLoading}>
                    <Link href="/client">
                  {isLoading ? "Logging in..." : "Login"}
                  </Link>
                </Button>
              </motion.div>
              <p className="text-center text-sm text-gray-300">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-400 hover:underline">
                  Register
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
