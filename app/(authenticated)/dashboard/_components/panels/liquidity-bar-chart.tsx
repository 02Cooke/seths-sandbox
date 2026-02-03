"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip
} from "recharts"

interface LiquidityData {
  type: string
  label: string
  color: string
  totalValue: number
  percentage: number
}

interface LiquidityBarChartProps {
  data: LiquidityData[]
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{ payload: LiquidityData }>
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="rounded-lg border bg-popover px-3 py-2 shadow-md">
        <p className="font-medium">{data.label}</p>
        <p className="text-sm text-muted-foreground">
          ${data.totalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </p>
        <p className="text-sm text-muted-foreground">
          {data.percentage.toFixed(1)}% of portfolio
        </p>
      </div>
    )
  }
  return null
}

export function LiquidityBarChart({ data }: LiquidityBarChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Sort by liquidity order: liquid, semi-liquid, illiquid
  const sortOrder = { liquid: 0, semi_liquid: 1, illiquid: 2 }
  const sortedData = [...data].sort(
    (a, b) =>
      (sortOrder[a.type as keyof typeof sortOrder] ?? 3) -
      (sortOrder[b.type as keyof typeof sortOrder] ?? 3)
  )

  return (
    <div className="h-24">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis type="category" hide dataKey="label" />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar
            dataKey="percentage"
            radius={[4, 4, 4, 4]}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {sortedData.map((entry, index) => (
              <Cell
                key={entry.type}
                fill={entry.color}
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                className="cursor-pointer transition-opacity"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap justify-center gap-4 text-xs">
        {sortedData.map((item) => (
          <div key={item.type} className="flex items-center gap-1.5">
            <div
              className="size-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">
              {item.label}:{" "}
              <span className="font-medium text-foreground">
                {item.percentage.toFixed(0)}%
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
