"use client"

import { Shield, ShieldCheck, ShieldAlert } from "lucide-react"
import { PanelCard } from "./panel-card"
import { HoldingsTreemap } from "./holdings-treemap"

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
    if (pct < 30)
      return {
        color: "text-green-500",
        bg: "bg-green-500/10",
        label: "Healthy",
        icon: ShieldCheck
      }
    if (pct < 50)
      return {
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        label: "Moderate",
        icon: Shield
      }
    return {
      color: "text-red-500",
      bg: "bg-red-500/10",
      label: "High",
      icon: ShieldAlert
    }
  }

  const getSinglePositionStatus = (pct: number) => {
    if (pct < 10)
      return {
        color: "text-green-500",
        bg: "bg-green-500/10",
        label: "Healthy",
        icon: ShieldCheck
      }
    if (pct < 20)
      return {
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        label: "Moderate",
        icon: Shield
      }
    return {
      color: "text-red-500",
      bg: "bg-red-500/10",
      label: "High",
      icon: ShieldAlert
    }
  }

  const getIlliquidStatus = (pct: number) => {
    if (pct < 40)
      return {
        color: "text-green-500",
        bg: "bg-green-500/10",
        label: "Healthy",
        icon: ShieldCheck
      }
    if (pct < 60)
      return {
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        label: "Moderate",
        icon: Shield
      }
    return {
      color: "text-red-500",
      bg: "bg-red-500/10",
      label: "High",
      icon: ShieldAlert
    }
  }

  const top5Status = getConcentrationStatus(top5Percentage)
  const singleStatus = getSinglePositionStatus(largestPositionPct)
  const illiquidStatus = getIlliquidStatus(illiquidPct)

  return (
    <PanelCard title="Risk Snapshot" subtitle="Concentration and liquidity risk">
      <div className="space-y-6">
        {/* Risk Metrics Grid */}
        <div className="grid gap-3 md:grid-cols-3">
          {/* Top 5 Concentration */}
          <div className={`rounded-lg p-3 ${top5Status.bg}`}>
            <div className={`flex items-center gap-2 ${top5Status.color}`}>
              <top5Status.icon className="size-4" />
              <span className="text-xs font-medium">Top 5 Concentration</span>
            </div>
            <div
              className={`mt-1 font-mono text-xl font-bold ${top5Status.color}`}
            >
              {top5Percentage.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">
              {top5Status.label} (&lt;30% ideal)
            </div>
          </div>

          {/* Single Position */}
          <div className={`rounded-lg p-3 ${singleStatus.bg}`}>
            <div className={`flex items-center gap-2 ${singleStatus.color}`}>
              <singleStatus.icon className="size-4" />
              <span className="text-xs font-medium">Largest Position</span>
            </div>
            <div
              className={`mt-1 font-mono text-xl font-bold ${singleStatus.color}`}
            >
              {largestPositionPct.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">
              {singleStatus.label} (&lt;10% ideal)
            </div>
          </div>

          {/* Illiquid Exposure */}
          <div className={`rounded-lg p-3 ${illiquidStatus.bg}`}>
            <div className={`flex items-center gap-2 ${illiquidStatus.color}`}>
              <illiquidStatus.icon className="size-4" />
              <span className="text-xs font-medium">Illiquid Exposure</span>
            </div>
            <div
              className={`mt-1 font-mono text-xl font-bold ${illiquidStatus.color}`}
            >
              {illiquidPct.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">
              {illiquidStatus.label} (&lt;40% ideal)
            </div>
          </div>
        </div>

        {/* Holdings Treemap */}
        <HoldingsTreemap holdings={holdings} totalValue={totalValue} />

        {/* Top 5 Holdings Quick List */}
        <div>
          <div className="mb-2 text-sm text-muted-foreground">
            Largest Positions
          </div>
          <div className="grid gap-2 md:grid-cols-5">
            {top5.map((holding, index) => {
              const pct =
                totalValue > 0 ? (holding.currentValue / totalValue) * 100 : 0
              return (
                <div
                  key={holding.id}
                  className="rounded-lg border bg-card p-2 text-center"
                >
                  <div className="text-xs text-muted-foreground">#{index + 1}</div>
                  <div className="truncate text-sm font-medium" title={holding.name}>
                    {holding.ticker || holding.name.split(" ")[0]}
                  </div>
                  <div className="font-mono text-xs font-semibold">
                    {pct.toFixed(1)}%
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
