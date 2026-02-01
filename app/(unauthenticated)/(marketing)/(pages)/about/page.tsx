import { TrendingUp } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 flex items-center justify-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
            <TrendingUp className="size-6 text-white" />
          </div>
          <span className="text-3xl font-bold text-white">AlphaWatch</span>
        </div>

        <h1 className="mb-8 text-center text-4xl font-bold text-white sm:text-5xl">
          About Us
        </h1>

        <div className="space-y-6 text-lg leading-relaxed text-white/70">
          <p>
            AlphaWatch is a next-generation market intelligence platform built
            for the modern investor. We provide real-time tracking of top
            performing assets across crypto, stocks, and commodities.
          </p>

          <p>
            Our mission is simple: cut through the noise and deliver the data
            that matters. No fluff, no hype—just clean, actionable market
            insights.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-white">What We Track</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Cryptocurrencies - Bitcoin, Ethereum, Solana, and more</li>
            <li>Stocks - NVIDIA, Apple, Tesla, and top performers</li>
            <li>Commodities - Gold, Silver, and precious metals</li>
            <li>Forex - Major currency pairs (coming soon)</li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-white">Our Edge</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Real-time price updates</li>
            <li>Multi-asset coverage in one dashboard</li>
            <li>Clean, distraction-free interface</li>
            <li>Institutional-grade data</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
