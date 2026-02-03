"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface DebtRatioGaugeProps {
  debtToAssets: number // Percentage (e.g., 5.5 for 5.5%)
  size?: number
}

export function DebtRatioGauge({ debtToAssets, size = 120 }: DebtRatioGaugeProps) {
  // Determine status based on debt-to-assets ratio
  // < 10% = Healthy (green), 10-25% = Moderate (amber), > 25% = High (red)
  const getStatus = (ratio: number) => {
    if (ratio < 10) return { color: "#10B981", label: "Healthy", bg: "bg-green-500/10" }
    if (ratio < 25) return { color: "#F59E0B", label: "Moderate", bg: "bg-amber-500/10" }
    return { color: "#EF4444", label: "Elevated", bg: "bg-red-500/10" }
  }

  const status = getStatus(debtToAssets)

  // Cap at 50% for visual purposes
  const displayRatio = Math.min(debtToAssets, 50)

  // Create data for semi-circle gauge
  // We use 180 degrees (half circle)
  const data = [
    { name: "debt", value: displayRatio },
    { name: "remaining", value: 50 - displayRatio }
  ]

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={size * 0.35}
              outerRadius={size * 0.45}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill={status.color} />
              <Cell fill="hsl(var(--muted))" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute inset-x-0 bottom-0 text-center">
          <div className="font-mono text-2xl font-bold" style={{ color: status.color }}>
            {debtToAssets.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Status label */}
      <div
        className={`mt-1 rounded-full px-3 py-1 text-xs font-medium ${status.bg}`}
        style={{ color: status.color }}
      >
        {status.label}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">Debt-to-Assets</div>
    </div>
  )
}
