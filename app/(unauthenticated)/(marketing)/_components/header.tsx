"use client"

import { Button } from "@/components/ui/button"
import { SelectCustomer } from "@/db/schema/customers"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Menu, X, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

// Check if Clerk is configured (this env var is exposed to client)
const hasClerkKey = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

interface HeaderProps {
  userMembership: SelectCustomer["membership"] | null
}

export function Header({ userMembership }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Markets", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" }
  ]

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-black/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 flex items-center gap-2 p-1.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <TrendingUp className="size-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AlphaWatch</span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white/70"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            {hasClerkKey ? (
              <>
                <SignedOut>
                  <Button
                    variant="ghost"
                    asChild
                    className="text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
                  >
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </SignedOut>
                <SignedIn>
                  {userMembership === "pro" ? (
                    <Button
                      asChild
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
                    >
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
                    >
                      <Link href="/#pricing">
                        <Sparkles className="h-4 w-4" />
                        Upgrade
                      </Link>
                    </Button>
                  )}
                  <UserButton />
                </SignedIn>
              </>
            ) : (
              <Button
                asChild
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {mounted && mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu panel */}
          <div className="fixed inset-y-0 right-0 z-[70] w-full overflow-y-auto bg-[#0a0a0f] px-6 py-6 shadow-2xl sm:max-w-sm sm:ring-1 sm:ring-white/10 lg:hidden">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="-m-1.5 flex items-center gap-2 p-1.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                  <TrendingUp className="size-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AlphaWatch</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white/70"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map(item => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white/70 hover:bg-white/5 hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="space-y-3 py-6">
                  {hasClerkKey ? (
                    <>
                      <SignedOut>
                        <Button
                          variant="outline"
                          className="w-full border-white/20 bg-transparent text-white hover:bg-white/10"
                          asChild
                        >
                          <Link
                            href="/login"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Log in
                          </Link>
                        </Button>
                        <Button
                          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                          asChild
                        >
                          <Link
                            href="/signup"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Get Started
                          </Link>
                        </Button>
                      </SignedOut>
                      <SignedIn>
                        {userMembership === "pro" ? (
                          <Button
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                            asChild
                          >
                            <Link
                              href="/dashboard"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Dashboard
                            </Link>
                          </Button>
                        ) : (
                          <Button
                            className="w-full gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                            asChild
                          >
                            <Link
                              href="/#pricing"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <Sparkles className="h-4 w-4" />
                              Upgrade
                            </Link>
                          </Button>
                        )}
                        <div className="flex justify-center pt-4">
                          <UserButton />
                        </div>
                      </SignedIn>
                    </>
                  ) : (
                    <Button
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                      asChild
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
