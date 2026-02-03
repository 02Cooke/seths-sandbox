"use client"

import { ArrowDownRight, ArrowUpRight, TrendingUp } from "lucide-react"
import { PanelCard } from "./panel-card"
import { MonthlyReturnsChart } from "./monthly-returns-chart"

interface HoldingReturn {
  id: string
  name: string
  ticker: string | null
  currentValue: number
  ytdReturn: number | null
  totalReturn: number | null
  unrealizedGain: number
  assetClassName: string
}

interface MonthlyReturn {
  month: string
  year: number
  return: number
}

interface PerformancePanelProps {
  holdings: HoldingReturn[]
  monthlyReturns: MonthlyReturn[]
  portfolioYtdReturn?: number
}

export function PerformancePanel({
  holdings,
  monthlyReturns,
  portfolioYtdReturn
}: PerformancePanelProps) {
  // Sort by YTD return for top/bottom performers
  const sortedByYtd = [...holdings]
    .filter((h) => h.ytdReturn !== null)
    .sort((a, b) => (b.ytdReturn ?? 0) - (a.ytdReturn ?? 0))

  const topPerformers = sortedByYtd.slice(0, 3)
  const bottomPerformers = sortedByYtd.slice(-3).reverse()

  // Calculate total unrealized gain
  const totalUnrealizedGain = holdings.reduce(
    (sum, h) => sum + h.unrealizedGain,
    0
  )

  // Calculate average total return (since inception)
  const holdingsWithTotal = holdings.filter((h) => h.totalReturn !== null)
  const avgTotalReturn =
    holdingsWithTotal.length > 0
      ? holdingsWithTotal.reduce((sum, h) => sum + (h.totalReturn ?? 0), 0) /
        holdingsWithTotal.length
      : undefined

  // Get best and worst month from monthly data
  const bestMonth = monthlyReturns.reduce(
    (best, m) => (m.return > best.return ? m : best),
    monthlyReturns[0] || { month: "-", return: 0 }
  )
  const worstMonth = monthlyReturns.reduce(
    (worst, m) => (m.return < worst.return ? m : worst),
    monthlyReturns[0] || { month: "-", return: 0 }
  )

  return (
    <PanelCard
      title="Performance"
      subtitle="Returns and attribution"
      action={
        <div className="flex items-center gap-2">
          <TrendingUp className="size-5 text-muted-foreground" />
        </div>
      }
    >
      <div className="space-y-6">
        {/* Return Summary Cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {/* YTD Return */}
          <div className="rounded-lg border bg-card p-4">
            <div className="text-xs text-muted-foreground">YTD Return</div>
            {portfolioYtdReturn !== undefined ? (
              <div
                className={`mt-1 flex items-center gap-1 font-mono text-xl font-bold ${
                  portfolioYtdReturn >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {portfolioYtdReturn >= 0 ? (
                  <ArrowUpRight className="size-4" />
                ) : (
                  <ArrowDownRight className="size-4" />
                )}
                {portfolioYtdReturn >= 0 ? "+" : ""}
                {portfolioYtdReturn.toFixed(2)}%
              </div>
            ) : (
              <div className="mt-1 text-lg text-muted-foreground">--</div>
            )}
          </div>

          {/* Total Return (Since Inception) */}
          <div className="rounded-lg border bg-card p-4">
            <div className="text-xs text-muted-foreground">Avg Total Return</div>
            {avgTotalReturn !== undefined ? (
              <div
                className={`mt-1 flex items-center gap-1 font-mono text-xl font-bold ${
                  avgTotalReturn >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {avgTotalReturn >= 0 ? (
                  <ArrowUpRight className="size-4" />
                ) : (
                  <ArrowDownRight className="size-4" />
                )}
                {avgTotalReturn >= 0 ? "+" : ""}
                {avgTotalReturn.toFixed(1)}%
              </div>
            ) : (
              <div className="mt-1 text-lg text-muted-foreground">--</div>
            )}
          </div>

          {/* Best Month */}
          <div className="rounded-lg border bg-card p-4">
            <div className="text-xs text-muted-foreground">Best Month</div>
            <div className="mt-1 font-mono text-xl font-bold text-green-500">
              +{bestMonth.return.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">{bestMonth.month}</div>
          </div>

          {/* Worst Month */}
          <div className="rounded-lg border bg-card p-4">
            <div className="text-xs text-muted-foreground">Worst Month</div>
            <div className="mt-1 font-mono text-xl font-bold text-red-500">
              {worstMonth.return.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">{worstMonth.month}</div>
          </div>
        </div>

        {/* Monthly Returns Chart */}
        <MonthlyReturnsChart data={monthlyReturns} />

        {/* Top/Bottom Performers */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Top Performers */}
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-600">
              <ArrowUpRight className="size-4" />
              Top Performers (YTD)
            </div>
            <div className="space-y-2">
              {topPerformers.map((holding) => (
                <div
                  key={holding.id}
                  className="flex items-center justify-between rounded-lg bg-green-500/10 px-3 py-2"
                >
                  <div>
                    <span className="font-medium">{holding.name}</span>
                    {holding.ticker && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        {holding.ticker}
                      </span>
                    )}
                  </div>
                  <span className="font-mono font-semibold text-green-600">
                    +{holding.ytdReturn?.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Performers */}
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-red-600">
              <ArrowDownRight className="size-4" />
              Bottom Performers (YTD)
            </div>
            <div className="space-y-2">
              {bottomPerformers.map((holding) => (
                <div
                  key={holding.id}
                  className="flex items-center justify-between rounded-lg bg-red-500/10 px-3 py-2"
                >
                  <div>
                    <span className="font-medium">{holding.name}</span>
                    {holding.ticker && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        {holding.ticker}
                      </span>
                    )}
                  </div>
                  <span className="font-mono font-semibold text-red-600">
                    {holding.ytdReturn?.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Unrealized Gain Summary */}
        <div className="rounded-lg bg-muted/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">
                Total Unrealized Gain/Loss
              </div>
              <div
                className={`font-mono text-2xl font-bold ${
                  totalUnrealizedGain >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {totalUnrealizedGain >= 0 ? "+" : ""}$
                {totalUnrealizedGain.toLocaleString("en-US", {
                  maximumFractionDigits: 0
                })}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Holdings with Gains</div>
              <div className="font-mono text-lg font-semibold">
                {holdings.filter((h) => h.unrealizedGain > 0).length} / {holdings.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PanelCard>
  )
}
