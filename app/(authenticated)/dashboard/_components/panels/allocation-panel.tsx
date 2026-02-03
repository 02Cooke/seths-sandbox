"use client"

import { PanelCard } from "./panel-card"
import { AllocationDonut } from "./allocation-donut"

interface AllocationData {
  id: string
  name: string
  color: string
  totalValue: number
  percentage: number
}

interface AllocationPanelProps {
  data: AllocationData[]
}

export function AllocationPanel({ data }: AllocationPanelProps) {
  return (
    <PanelCard
      title="Asset Allocation"
      subtitle="Capital deployment by asset class"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        {/* Interactive Donut Chart */}
        <div className="flex flex-shrink-0 justify-center">
          <AllocationDonut data={data} size={220} />
        </div>

        {/* Asset class breakdown */}
        <div className="flex-1 space-y-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3 transition-colors hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <div
                  className="size-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="font-mono font-semibold">
                  ${item.totalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.percentage.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PanelCard>
  )
}
