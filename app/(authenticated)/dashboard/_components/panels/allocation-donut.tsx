"use client"

import { useState, useCallback } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts"

interface AllocationData {
  id: string
  name: string
  color: string
  totalValue: number
  percentage: number
}

interface AllocationDonutProps {
  data: AllocationData[]
  size?: number
}

interface ActiveShapeProps {
  cx: number
  cy: number
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
  fill: string
  payload: AllocationData
  value: number
}

// Custom active shape for hover effect
const renderActiveShape = (props: ActiveShapeProps) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value
  } = props

  return (
    <g>
      {/* Center text */}
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        className="fill-foreground text-sm font-medium"
      >
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        className="fill-foreground text-lg font-bold"
      >
        {payload.percentage.toFixed(1)}%
      </text>
      <text
        x={cx}
        y={cy + 30}
        textAnchor="middle"
        className="fill-muted-foreground text-xs"
      >
        ${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}
      </text>

      {/* Expanded sector on hover */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="drop-shadow-lg"
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 4}
        outerRadius={innerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.3}
      />
    </g>
  )
}

export function AllocationDonut({ data, size = 200 }: AllocationDonutProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const onPieEnter = useCallback((_: unknown, index: number) => {
    setActiveIndex(index)
  }, [])

  const onPieLeave = useCallback(() => {
    setActiveIndex(null)
  }, [])

  // Calculate total for center display when not hovering
  const total = data.reduce((sum, item) => sum + item.totalValue, 0)

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={size * 0.3}
            outerRadius={size * 0.42}
            paddingAngle={2}
            dataKey="totalValue"
            nameKey="name"
            activeShape={(props: unknown) => renderActiveShape(props as ActiveShapeProps)}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.id}
                fill={entry.color}
                className="cursor-pointer transition-opacity"
                stroke="transparent"
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Default center content when not hovering */}
      {activeIndex === null && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground">Total Value</span>
          <span className="text-lg font-bold">
            ${(total / 1000000).toFixed(1)}M
          </span>
        </div>
      )}
    </div>
  )
}
