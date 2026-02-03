"use client"

import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts"

interface SparklineProps {
  data: Array<{ value: number; date: string }>
  color?: string
  height?: number
}

export function Sparkline({
  data,
  color = "#3B82F6",
  height = 40
}: SparklineProps) {
  if (!data || data.length === 0) {
    return (
      <div
        className="flex items-center justify-center text-xs text-muted-foreground"
        style={{ height }}
      >
        No data
      </div>
    )
  }

  // Calculate trend (up or down from first to last)
  const firstValue = data[0]?.value ?? 0
  const lastValue = data[data.length - 1]?.value ?? 0
  const trend = lastValue - firstValue
  const trendColor = trend >= 0 ? "#10B981" : "#EF4444"

  // Calculate min/max for better Y-axis scaling
  const values = data.map((d) => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const padding = (max - min) * 0.1 || 0.1

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <YAxis
            domain={[min - padding, max + padding]}
            hide
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 3,
              fill: color,
              stroke: "hsl(var(--background))",
              strokeWidth: 2
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
