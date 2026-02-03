"use client"

import { useState } from "react"
import { Treemap, ResponsiveContainer, Tooltip } from "recharts"

interface HoldingData {
  id: string
  name: string
  ticker: string | null
  currentValue: number
  assetClassName: string
  assetClassColor?: string
}

interface HoldingsTreemapProps {
  holdings: HoldingData[]
  totalValue: number
}

// Asset class colors
const assetClassColors: Record<string, string> = {
  "Public Equities": "#3B82F6", // Blue
  "Private Investments": "#8B5CF6", // Purple
  "Real Estate": "#F59E0B", // Amber
  "Cash & Equivalents": "#10B981", // Green
  Alternatives: "#EC4899" // Pink
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{
    payload: {
      name: string
      value: number
      assetClass: string
      ticker: string | null
      percentage: number
    }
  }>
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="rounded-lg border bg-popover px-3 py-2 shadow-md">
        <p className="font-medium">{data.name}</p>
        {data.ticker && (
          <p className="text-xs text-muted-foreground">{data.ticker}</p>
        )}
        <p className="mt-1 text-sm">
          ${data.value.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </p>
        <p className="text-xs text-muted-foreground">
          {data.percentage.toFixed(1)}% of portfolio
        </p>
        <p
          className="mt-1 text-xs font-medium"
          style={{ color: assetClassColors[data.assetClass] || "#6B7280" }}
        >
          {data.assetClass}
        </p>
      </div>
    )
  }
  return null
}

interface TreemapContentProps {
  x: number
  y: number
  width: number
  height: number
  name: string
  value: number
  assetClass: string
  percentage: number
  ticker: string | null
}

const CustomTreemapContent = (props: TreemapContentProps) => {
  const { x, y, width, height, name, assetClass, percentage, ticker } = props
  const color = assetClassColors[assetClass] || "#6B7280"

  // Only show text if the cell is large enough
  const showFullText = width > 80 && height > 50
  const showName = width > 50 && height > 30
  const showTicker = width > 60 && height > 40

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        stroke="hsl(var(--background))"
        strokeWidth={2}
        rx={4}
        className="transition-opacity hover:opacity-80"
        style={{ cursor: "pointer" }}
      />
      {showName && (
        <text
          x={x + width / 2}
          y={y + height / 2 - (showFullText ? 8 : 0)}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white text-xs font-medium"
          style={{
            fontSize: Math.min(12, Math.max(8, width / 10)),
            pointerEvents: "none"
          }}
        >
          {name.length > 12 ? name.substring(0, 10) + "..." : name}
        </text>
      )}
      {showTicker && ticker && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white/70 text-xs"
          style={{
            fontSize: Math.min(10, Math.max(7, width / 12)),
            pointerEvents: "none"
          }}
        >
          {ticker}
        </text>
      )}
      {showFullText && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 22}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white/80 text-xs font-mono"
          style={{
            fontSize: Math.min(10, Math.max(7, width / 12)),
            pointerEvents: "none"
          }}
        >
          {percentage.toFixed(1)}%
        </text>
      )}
    </g>
  )
}

export function HoldingsTreemap({ holdings, totalValue }: HoldingsTreemapProps) {
  // Transform data for treemap
  const treemapData = holdings.map((h) => ({
    name: h.name,
    value: h.currentValue,
    assetClass: h.assetClassName,
    ticker: h.ticker,
    percentage: totalValue > 0 ? (h.currentValue / totalValue) * 100 : 0
  }))

  // Get unique asset classes for legend
  const assetClasses = [...new Set(holdings.map((h) => h.assetClassName))]

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium">Position Size Map</div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={treemapData}
            dataKey="value"
            aspectRatio={4 / 3}
            stroke="hsl(var(--background))"
            content={<CustomTreemapContent x={0} y={0} width={0} height={0} name="" value={0} assetClass="" percentage={0} ticker={null} />}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap justify-center gap-3">
        {assetClasses.map((assetClass) => (
          <div key={assetClass} className="flex items-center gap-1.5 text-xs">
            <div
              className="size-3 rounded"
              style={{ backgroundColor: assetClassColors[assetClass] || "#6B7280" }}
            />
            <span className="text-muted-foreground">{assetClass}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
