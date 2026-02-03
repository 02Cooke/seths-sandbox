import { AlertTriangle, Shield, ShieldCheck, ShieldAlert } from "lucide-react"
import { PanelCard } from "./panel-card"

interface HoldingData {
  id: string
  name: string
  ticker: string | null
  currentValue: number
  assetClassName: string
}

interface LiquidityData {
  type: string
  label: string
  percentage: number
}

interface RiskPanelProps {
  holdings: HoldingData[]
  liquidityData: LiquidityData[]
  totalValue: number
}

export function RiskPanel({
  holdings,
  liquidityData,
  totalValue
}: RiskPanelProps) {
  // Calculate concentration metrics
  const sortedHoldings = [...holdings].sort(
    (a, b) => b.currentValue - a.currentValue
  )
  const top5 = sortedHoldings.slice(0, 5)
  const top5Value = top5.reduce((sum, h) => sum + h.currentValue, 0)
  const top5Percentage = totalValue > 0 ? (top5Value / totalValue) * 100 : 0

  // Single position concentration
  const largestPosition = sortedHoldings[0]
  const largestPositionPct =
    totalValue > 0 && largestPosition
      ? (largestPosition.currentValue / totalValue) * 100
      : 0

  // Illiquid exposure
  const illiquidData = liquidityData.find((l) => l.type === "illiquid")
  const illiquidPct = illiquidData?.percentage ?? 0

  // Risk thresholds
  const getConcentrationStatus = (pct: number) => {
    if (pct < 30) return { color: "text-green-500", bg: "bg-green-500/10", label: "Healthy", icon: ShieldCheck }
    if (pct < 50) return { color: "text-amber-500", bg: "bg-amber-500/10", label: "Moderate", icon: Shield }
    return { color: "text-red-500", bg: "bg-red-500/10", label: "High", icon: ShieldAlert }
  }

  const getSinglePositionStatus = (pct: number) => {
    if (pct < 10) return { color: "text-green-500", bg: "bg-green-500/10", label: "Healthy", icon: ShieldCheck }
    if (pct < 20) return { color: "text-amber-500", bg: "bg-amber-500/10", label: "Moderate", icon: Shield }
    return { color: "text-red-500", bg: "bg-red-500/10", label: "High", icon: ShieldAlert }
  }

  const getIlliquidStatus = (pct: number) => {
    if (pct < 40) return { color: "text-green-500", bg: "bg-green-500/10", label: "Healthy", icon: ShieldCheck }
    if (pct < 60) return { color: "text-amber-500", bg: "bg-amber-500/10", label: "Moderate", icon: Shield }
    return { color: "text-red-500", bg: "bg-red-500/10", label: "High", icon: ShieldAlert }
  }

  const top5Status = getConcentrationStatus(top5Percentage)
  const singleStatus = getSinglePositionStatus(largestPositionPct)
  const illiquidStatus = getIlliquidStatus(illiquidPct)

  return (
    <PanelCard title="Risk Snapshot" subtitle="Concentration and liquidity risk">
      <div className="space-y-6">
        {/* Risk Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Top 5 Concentration */}
          <div className={`rounded-lg p-4 ${top5Status.bg}`}>
            <div className={`flex items-center gap-2 ${top5Status.color}`}>
              <top5Status.icon className="size-4" />
              <span className="text-sm font-medium">Top 5 Concentration</span>
            </div>
            <div className={`mt-2 font-mono text-2xl font-bold ${top5Status.color}`}>
              {top5Percentage.toFixed(1)}%
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {top5Status.label} (&lt;30% ideal)
            </div>
          </div>

          {/* Single Position */}
          <div className={`rounded-lg p-4 ${singleStatus.bg}`}>
            <div className={`flex items-center gap-2 ${singleStatus.color}`}>
              <singleStatus.icon className="size-4" />
              <span className="text-sm font-medium">Largest Position</span>
            </div>
            <div className={`mt-2 font-mono text-2xl font-bold ${singleStatus.color}`}>
              {largestPositionPct.toFixed(1)}%
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {singleStatus.label} (&lt;10% ideal)
            </div>
          </div>

          {/* Illiquid Exposure */}
          <div className={`rounded-lg p-4 ${illiquidStatus.bg}`}>
            <div className={`flex items-center gap-2 ${illiquidStatus.color}`}>
              <illiquidStatus.icon className="size-4" />
              <span className="text-sm font-medium">Illiquid Exposure</span>
            </div>
            <div className={`mt-2 font-mono text-2xl font-bold ${illiquidStatus.color}`}>
              {illiquidPct.toFixed(1)}%
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {illiquidStatus.label} (&lt;40% ideal)
            </div>
          </div>
        </div>

        {/* Top 5 Holdings List */}
        <div>
          <div className="mb-2 text-sm text-muted-foreground">
            Top 5 Holdings by Value
          </div>
          <div className="space-y-2">
            {top5.map((holding, index) => {
              const pct =
                totalValue > 0 ? (holding.currentValue / totalValue) * 100 : 0
              return (
                <div
                  key={holding.id}
                  className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <span className="font-medium">{holding.name}</span>
                      {holding.ticker && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          {holding.ticker}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-semibold">
                      ${holding.currentValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {pct.toFixed(1)}%
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </PanelCard>
  )
}
