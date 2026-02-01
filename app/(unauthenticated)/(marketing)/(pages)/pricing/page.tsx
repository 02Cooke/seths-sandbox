import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Top 15 assets tracking",
      "24h price changes",
      "Basic market data",
      "Public watchlist"
    ],
    cta: "Get Started",
    href: "/signup",
    featured: false
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For serious investors",
    features: [
      "Unlimited asset tracking",
      "Real-time price alerts",
      "Advanced analytics",
      "Portfolio tracking",
      "Custom watchlists",
      "API access",
      "Priority support"
    ],
    cta: "Upgrade to Pro",
    href: "/signup",
    featured: true
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Simple Pricing
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/50">
            Start free, upgrade when you need more
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 ${
                plan.featured
                  ? "border-indigo-500 bg-gradient-to-b from-indigo-500/10 to-transparent"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-1 text-xs font-medium text-white">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-white/50">{plan.period}</span>
                )}
              </div>
              <p className="mt-2 text-white/50">{plan.description}</p>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="size-5 text-green-500" />
                    <span className="text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`mt-8 w-full ${
                  plan.featured
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                    : ""
                }`}
                variant={plan.featured ? "default" : "outline"}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
