"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
  ReferenceLine
} from "recharts"

interface MonthlyReturn {
  month: string
  year: number
  return: number
}

interface MonthlyReturnsChartProps {
  data: MonthlyReturn[]
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{ payload: MonthlyReturn }>
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const isPositive = data.return >= 0
    return (
      <div className="rounded-lg border bg-popover px-3 py-2 shadow-md">
        <p className="font-medium">
          {data.month} {data.year}
        </p>
        <p
          className={`font-mono text-sm font-semibold ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? "+" : ""}
          {data.return.toFixed(2)}%
        </p>
      </div>
    )
  }
  return null
}

export function MonthlyReturnsChart({ data }: MonthlyReturnsChartProps) {
  // Calculate YTD return (cumulative)
  const ytdReturn = data.reduce((acc, month) => {
    return acc * (1 + month.return / 100)
  }, 1)
  const ytdPercent = (ytdReturn - 1) * 100

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Monthly Returns</div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">YTD Cumulative: </span>
          <span
            className={`font-mono text-sm font-semibold ${
              ytdPercent >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {ytdPercent >= 0 ? "+" : ""}
            {ytdPercent.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, bottom: 0, left: -20 }}
          >
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => `${value}%`}
              domain={["auto", "auto"]}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <ReferenceLine y={0} stroke="hsl(var(--border))" strokeWidth={1} />
            <Bar dataKey="return" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.return >= 0 ? "#10B981" : "#EF4444"}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
