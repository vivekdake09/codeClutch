"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // Importing Framer Motion

export default function Home() {
  return (
    <div 
      className="flex flex-col min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/assets/image2.jpg')" }} // Background image
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-75"></div>

      {/* Main Content */}
      <div className="relative flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-transparent text-white py-6">
          <div className="container mx-auto px-4 flex justify-center items-center">
            <motion.h1
              className="text-6xl font-bold tracking-wide text-white relative" // Removed "uppercase"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
                CloudPlay
              </span>
              {/* Elegant Subtle Glow */}
              <span className="absolute -z-10 inset-0 text-blue-500 opacity-30 blur-lg">
                CloudPlay
              </span>
            </motion.h1>
          </div>
        </header>


        {/* Main Section */}
        <main className="flex-1 flex items-center justify-center text-center px-4">
          <motion.div 
            className="max-w-lg mx-auto bg-white bg-opacity-10 backdrop-blur-2xl p-10 rounded-2xl shadow-2xl border border-gray-500/50"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8 }}
          >
            {/* Welcome Text */}
            <div className="space-y-4">
              <h2 className="text-5xl font-extrabold text-white drop-shadow-lg">
                Welcome to <span className="text-blue-400">CloudPlay</span>
              </h2>
              <p className="text-lg text-gray-300 font-medium tracking-wide">
                <span className="text-cyan-300">No Lag.</span> 
                <span className="text-blue-300"> No Wait.</span> 
                <span className="text-purple-400"> Just Play ⚡</span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col space-y-5 mt-6">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/login" passHref>
                  <Button className="w-full text-lg py-3 rounded-xl shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-purple-600 transition-all">
                    Login
                  </Button>
                </Link>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/register" passHref>
                  <Button className="w-full text-lg py-3 rounded-xl shadow-lg border border-gray-400 text-white bg-transparent hover:bg-white hover:text-black transition-all">
                    Register
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-700 py-5">
          <div className="container mx-auto px-4 text-center text-sm text-gray-300">
            &copy; {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">CloudPlay</span>. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
