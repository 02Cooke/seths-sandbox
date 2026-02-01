import { Github, TrendingUp } from "lucide-react"
import Link from "next/link"

const XLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export function Footer() {
  const footerNavigation = {
    markets: [
      { name: "Crypto", href: "#" },
      { name: "Stocks", href: "#" },
      { name: "Forex", href: "#" },
      { name: "Commodities", href: "#" }
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Pricing", href: "/pricing" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "/contact" }
    ],
    resources: [
      { name: "API Docs", href: "#" },
      { name: "Market Analysis", href: "#" },
      { name: "Trading Guides", href: "#" },
      { name: "Status", href: "#" }
    ],
    legal: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Risk Disclosure", href: "#" },
      { name: "Cookies", href: "#" }
    ]
  }

  const socialLinks = [
    { name: "X", href: "https://x.com", icon: XLogo },
    { name: "GitHub", href: "https://github.com", icon: Github }
  ]

  return (
    <footer
      className="border-t border-white/10 bg-[#0a0a0f]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <TrendingUp className="size-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AlphaWatch</span>
            </Link>
            <p className="text-sm leading-6 text-white/50">
              Real-time market intelligence for the modern investor. Track top
              performing assets across crypto, stocks, and commodities.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/40 transition-colors hover:text-white"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Markets
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.markets.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-white/50 transition-colors hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.company.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-white/50 transition-colors hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Resources
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.resources.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-white/50 transition-colors hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.legal.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-white/50 transition-colors hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs leading-5 text-white/40">
              &copy; {new Date().getFullYear()} AlphaWatch. All rights reserved.
            </p>
            <p className="text-xs leading-5 text-white/30">
              Market data for informational purposes only. Not financial advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
