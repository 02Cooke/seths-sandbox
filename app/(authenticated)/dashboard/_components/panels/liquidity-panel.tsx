"use client"

import { Banknote, CreditCard, Landmark, TrendingDown } from "lucide-react"
import { PanelCard } from "./panel-card"
import { LiquidityBarChart } from "./liquidity-bar-chart"
import { DebtRatioGauge } from "./debt-ratio-gauge"

interface LiquidityData {
  type: string
  label: string
  color: string
  totalValue: number
  percentage: number
}

interface DebtItem {
  id: string
  name: string
  balance: number
  interestRate: number | null
  lender: string | null
}

interface LiquidityPanelProps {
  liquidityData: LiquidityData[]
  debtData: {
    items: DebtItem[]
    totalDebt: number
    avgInterestRate: number
  }
  cashTotal: number
  grossAssets: number
}

export function LiquidityPanel({
  liquidityData,
  debtData,
  cashTotal,
  grossAssets
}: LiquidityPanelProps) {
  const netLiquidity = cashTotal - debtData.totalDebt
  const debtToAssets = grossAssets > 0 ? (debtData.totalDebt / grossAssets) * 100 : 0

  return (
    <PanelCard title="Liquidity & Debt" subtitle="Cash position and obligations">
      <div className="space-y-6">
        {/* Top Section: Summary Cards + Debt Gauge */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Summary Cards */}
          <div className="flex-1 space-y-3">
            {/* Cash Card */}
            <div className="flex items-center justify-between rounded-lg bg-green-500/10 p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-green-500/20">
                  <Banknote className="size-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Cash & Equivalents</div>
                  <div className="font-mono text-xl font-bold text-green-600">
                    ${cashTotal.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
            </div>

            {/* Debt Card */}
            <div className="flex items-center justify-between rounded-lg bg-red-500/10 p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-red-500/20">
                  <CreditCard className="size-5 text-red-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Debt</div>
                  <div className="font-mono text-xl font-bold text-red-600">
                    ${debtData.totalDebt.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Avg Rate</div>
                <div className="font-mono text-sm font-medium text-red-600">
                  {debtData.avgInterestRate.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Net Liquidity Card */}
            <div
              className={`flex items-center justify-between rounded-lg p-4 ${
                netLiquidity >= 0 ? "bg-blue-500/10" : "bg-amber-500/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-10 items-center justify-center rounded-full ${
                    netLiquidity >= 0 ? "bg-blue-500/20" : "bg-amber-500/20"
                  }`}
                >
                  <Landmark
                    className={`size-5 ${netLiquidity >= 0 ? "text-blue-600" : "text-amber-600"}`}
                  />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Net Liquidity</div>
                  <div
                    className={`font-mono text-xl font-bold ${
                      netLiquidity >= 0 ? "text-blue-600" : "text-amber-600"
                    }`}
                  >
                    ${netLiquidity.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Debt-to-Assets Gauge */}
          <div className="flex items-center justify-center lg:w-40">
            <DebtRatioGauge debtToAssets={debtToAssets} size={140} />
          </div>
        </div>

        {/* Liquidity Profile Bar Chart */}
        <div>
          <div className="mb-3 text-sm font-medium">Liquidity Profile</div>
          <LiquidityBarChart data={liquidityData} />
        </div>

        {/* Debt Items */}
        {debtData.items.length > 0 && (
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <TrendingDown className="size-4 text-red-500" />
              Debt Obligations
            </div>
            <div className="space-y-2">
              {debtData.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border bg-card px-4 py-3"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    {item.lender && (
                      <div className="text-xs text-muted-foreground">{item.lender}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-semibold">
                      ${item.balance.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </div>
                    {item.interestRate && (
                      <div className="text-xs text-muted-foreground">
                        {item.interestRate}% APR
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PanelCard>
  )
}
