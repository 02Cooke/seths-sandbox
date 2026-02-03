"use client"

import { Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface PortfolioHeaderProps {
  portfolioName: string
  netWorth: number
  grossAssets: number
  totalDebt: number
  holdingsCount: number
  lastUpdated?: Date
}

export function PortfolioHeader({
  portfolioName,
  netWorth,
  grossAssets,
  totalDebt,
  holdingsCount,
  lastUpdated
}: PortfolioHeaderProps) {
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    router.refresh()
    // Reset after a short delay
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <div className="space-y-4">
      {/* Top Row: Title and Refresh */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {portfolioName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">
            {holdingsCount} holdings across all asset classes
          </p>
        </div>
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <div className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
              <Clock className="size-3.5" />
              <span>
                {lastUpdated.toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit"
                })}
              </span>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`size-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span className="ml-2 hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:flex md:gap-6">
        {/* Net Worth - Primary */}
        <div className="col-span-2 rounded-lg border bg-card p-4 sm:col-span-2 md:border-0 md:bg-transparent md:p-0">
          <div className="text-xs font-medium text-muted-foreground md:text-sm">
            Net Worth
          </div>
          <div className="font-mono text-2xl font-bold md:text-3xl">
            ${netWorth.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </div>
        </div>

        {/* Gross Assets */}
        <div className="rounded-lg border bg-card p-3 md:border-0 md:bg-transparent md:p-0 md:text-right">
          <div className="text-xs font-medium text-muted-foreground">
            Gross Assets
          </div>
          <div className="font-mono text-lg font-semibold text-green-600 md:text-xl">
            ${grossAssets.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </div>
        </div>

        {/* Total Debt */}
        <div className="rounded-lg border bg-card p-3 md:border-0 md:bg-transparent md:p-0 md:text-right">
          <div className="text-xs font-medium text-muted-foreground">
            Total Debt
          </div>
          <div className="font-mono text-lg font-semibold text-red-600 md:text-xl">
            ${totalDebt.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>
    </div>
  )
}
