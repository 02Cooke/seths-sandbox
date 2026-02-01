import {
  BarChart3,
  Bell,
  Globe,
  LineChart,
  Shield,
  Zap
} from "lucide-react"

const features = [
  {
    icon: LineChart,
    title: "Real-Time Tracking",
    description:
      "Live price updates across all major asset classes. Never miss a market move."
  },
  {
    icon: Globe,
    title: "Multi-Asset Coverage",
    description:
      "Crypto, stocks, commodities, and forex—all in one unified dashboard."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Sub-second updates and instant page loads. Built for speed-obsessed traders."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Deep market insights with trend analysis, volume tracking, and performance metrics."
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Set custom price alerts and get notified when your targets hit."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Enterprise-grade security. Your data stays yours."
  }
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Features
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/50">
            Everything you need to stay ahead of the markets
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                <feature.icon className="size-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-white/50">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
