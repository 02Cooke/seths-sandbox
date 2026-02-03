import { Globe, TrendingDown, TrendingUp } from "lucide-react"
import { PanelCard } from "./panel-card"

interface MacroIndicator {
  name: string
  label: string
  value: number
  date: string
  source: string | null
}

interface MacroPanelProps {
  indicators: MacroIndicator[]
}

export function MacroPanel({ indicators }: MacroPanelProps) {
  // Format indicator value based on type
  const formatValue = (indicator: MacroIndicator) => {
    if (indicator.name === "cpi_yoy") {
      return `${indicator.value.toFixed(1)}%`
    }
    return `${indicator.value.toFixed(2)}%`
  }

  // Determine if the indicator trend is "good" or "bad" based on type
  // Lower is generally better for rates and inflation
  const getIndicatorContext = (indicator: MacroIndicator) => {
    // These are informational - no inherent good/bad
    return {
      description: getDescription(indicator.name),
      icon: indicator.value > 4 ? TrendingUp : TrendingDown
    }
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

  return (
    <PanelCard
      title="Macro Environment"
      subtitle="Key economic indicators"
      action={
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Globe className="size-3" />
          <span>Updated daily</span>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        {indicators.map((indicator) => {
          const context = getIndicatorContext(indicator)
          return (
            <div
              key={indicator.name}
              className="rounded-lg border bg-muted/30 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {indicator.label}
                </span>
              </div>
              <div className="mt-2 font-mono text-2xl font-bold">
                {formatValue(indicator)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {context.description}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  As of {new Date(indicator.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                {indicator.source && <span>{indicator.source}</span>}
              </div>

              {/* Sparkline placeholder */}
              <div className="mt-3 flex h-8 items-end justify-between gap-0.5">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-muted"
                    style={{
                      height: `${Math.random() * 60 + 40}%`,
                      opacity: i === 11 ? 1 : 0.5
                    }}
                  />
                ))}
              </div>
              <div className="mt-1 text-center text-[10px] text-muted-foreground">
                6-month trend (placeholder)
              </div>
            </div>
          )
        })}
      </div>
    </PanelCard>
  )
}
