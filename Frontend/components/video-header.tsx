"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, User, Moon, Sun, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"

interface VideoHeaderProps {
  viewMode: "browse" | "watch"
  onBackToBrowse: () => void
}

export function VideoHeader({ viewMode, onBackToBrowse }: VideoHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center mr-4">
          {viewMode === "watch" ? (
            <Button variant="ghost" size="icon" onClick={onBackToBrowse} className="mr-2 md:hidden">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          ) : null}

          <Link href="/client" className="flex items-center space-x-2">
            <span className="font-bold text-xl">VideoStream</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link href="/client" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link
            href="/client/categories"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Categories
          </Link>
          <Link
            href="/client/trending"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Trending
          </Link>
          <Link
            href="/client/subscriptions"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Subscriptions
          </Link>
        </nav>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 items-center justify-center px-2">
          <div className="w-full max-w-lg">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search videos..."
                className="w-full bg-muted pl-8 md:w-[300px] lg:w-[500px]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2">
          {/* Mobile Search Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>History</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/client" className="text-base font-medium transition-colors hover:text-primary">
                  Home
                </Link>
                <Link
                  href="/client/categories"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Categories
                </Link>
                <Link
                  href="/client/trending"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Trending
                </Link>
                <Link
                  href="/client/subscriptions"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Subscriptions
                </Link>
                <Link
                  href="/client/profile"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Profile
                </Link>
                <Link
                  href="/client/settings"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar (Conditional) */}
      {isSearchOpen && (
        <div className="border-t md:hidden">
          <div className="container py-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search videos..." className="w-full pl-8" autoFocus />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

