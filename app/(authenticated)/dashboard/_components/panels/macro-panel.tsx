"use client"

import { ArrowDown, ArrowUp, Globe } from "lucide-react"
import { PanelCard } from "./panel-card"
import { Sparkline } from "./sparkline"

interface MacroIndicator {
  name: string
  label: string
  value: number
  date: string
  source: string | null
}

interface MacroHistory {
  value: number
  date: string
}

interface MacroPanelProps {
  indicators: MacroIndicator[]
  history: Record<string, MacroHistory[]>
}

// Colors for each indicator type
const indicatorColors: Record<string, string> = {
  fed_funds: "#3B82F6", // Blue
  treasury_10y: "#8B5CF6", // Purple
  cpi_yoy: "#F59E0B" // Amber
}

export function MacroPanel({ indicators, history }: MacroPanelProps) {
  // Format indicator value based on type
  const formatValue = (indicator: MacroIndicator) => {
    if (indicator.name === "cpi_yoy") {
      return `${indicator.value.toFixed(1)}%`
    }
    return `${indicator.value.toFixed(2)}%`
  }

  const getDescription = (name: string) => {
    switch (name) {
      case "fed_funds":
        return "Federal Reserve target rate"
      case "treasury_10y":
        return "10-year Treasury yield"
      case "cpi_yoy":
        return "Consumer price inflation"
      default:
        return ""
    }
  }

  // Calculate change from first historical value
  const getChange = (indicator: MacroIndicator) => {
    const indicatorHistory = history[indicator.name]
    if (!indicatorHistory || indicatorHistory.length < 2) return null

    const firstValue = indicatorHistory[0].value
    const change = indicator.value - firstValue
    return change
  }

  return (
    <PanelCard
      title="Macro Environment"
      subtitle="Key economic indicators"
      action={
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Globe className="size-3" />
          <span>Historical trends</span>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        {indicators.map((indicator) => {
          const indicatorHistory = history[indicator.name] || []
          const change = getChange(indicator)
          const color = indicatorColors[indicator.name] || "#6B7280"

          return (
            <div
              key={indicator.name}
              className="rounded-lg border bg-card p-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {indicator.label}
                </span>
                {change !== null && (
                  <div
                    className={`flex items-center gap-0.5 text-xs font-medium ${
                      change > 0 ? "text-red-500" : change < 0 ? "text-green-500" : "text-muted-foreground"
                    }`}
                  >
                    {change > 0 ? (
                      <ArrowUp className="size-3" />
                    ) : change < 0 ? (
                      <ArrowDown className="size-3" />
                    ) : null}
                    {Math.abs(change).toFixed(2)}
                  </div>
                )}
              </div>

              {/* Value */}
              <div className="mt-2 font-mono text-2xl font-bold">
                {formatValue(indicator)}
              </div>

              {/* Description */}
              <div className="mt-1 text-xs text-muted-foreground">
                {getDescription(indicator.name)}
              </div>

              {/* Sparkline */}
              <div className="mt-3">
                <Sparkline data={indicatorHistory} color={color} height={36} />
              </div>

              {/* Footer */}
              <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>
                  {indicatorHistory.length > 0
                    ? `${new Date(indicatorHistory[0].date).toLocaleDateString("en-US", { month: "short", year: "2-digit" })} - ${new Date(indicator.date).toLocaleDateString("en-US", { month: "short", year: "2-digit" })}`
                    : "No history"}
                </span>
                {indicator.source && <span>{indicator.source}</span>}
              </div>
            </div>
          )
        })}
      </div>
    </PanelCard>
  )
}
