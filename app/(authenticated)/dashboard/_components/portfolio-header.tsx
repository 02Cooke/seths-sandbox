import { ArrowDownRight, ArrowUpRight, Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{portfolioName}</h1>
        <p className="mt-1 text-muted-foreground">
          {holdingsCount} holdings across all asset classes
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        {/* Net Worth */}
        <div className="text-right">
          <div className="text-sm font-medium text-muted-foreground">
            Net Worth
          </div>
          <div className="font-mono text-3xl font-bold">
            ${netWorth.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </div>
        </div>

        {/* Gross Assets */}
        <div className="text-right">
          <div className="text-sm font-medium text-muted-foreground">
            Gross Assets
          </div>
          <div className="font-mono text-xl font-semibold text-green-600">
            ${grossAssets.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </div>
        </div>

        {/* Total Debt */}
        <div className="text-right">
          <div className="text-sm font-medium text-muted-foreground">
            Total Debt
          </div>
          <div className="font-mono text-xl font-semibold text-red-600">
            ${totalDebt.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </div>
        </div>

        {/* Last Updated */}
        {lastUpdated && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4" />
            <span>
              {lastUpdated.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
