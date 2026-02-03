import {
  getAllocationBreakdown,
  getDebtSummary,
  getHoldingsWithReturns,
  getLiquidityBreakdown,
  getMacroHistory,
  getMacroIndicators,
  getMonthlyReturns,
  getPortfolioInfo,
  getPortfolioSummary
} from "@/actions/portfolio"
import { PortfolioHeader } from "./_components/portfolio-header"
import {
  AllocationPanel,
  LiquidityPanel,
  MacroPanel,
  PerformancePanel,
  RiskPanel
} from "./_components/panels"

export default async function DashboardPage() {
  // Fetch all data in parallel for performance
  const [
    portfolioInfo,
    summary,
    allocation,
    holdings,
    liquidity,
    debt,
    macro,
    macroHistory,
    monthlyReturns
  ] = await Promise.all([
    getPortfolioInfo(),
    getPortfolioSummary(),
    getAllocationBreakdown(),
    getHoldingsWithReturns(),
    getLiquidityBreakdown(),
    getDebtSummary(),
    getMacroIndicators(),
    getMacroHistory(),
    getMonthlyReturns()
  ])

  // Calculate portfolio-level YTD return (weighted average)
  const holdingsWithYtd = holdings.filter((h) => h.ytdReturn !== null)
  const totalValueWithYtd = holdingsWithYtd.reduce(
    (sum, h) => sum + h.currentValue,
    0
  )
  const portfolioYtdReturn =
    totalValueWithYtd > 0
      ? holdingsWithYtd.reduce(
          (sum, h) => sum + (h.ytdReturn ?? 0) * (h.currentValue / totalValueWithYtd),
          0
        )
      : undefined

  // Find cash total from allocation data
  const cashClass = allocation.find((a) => a.name === "Cash & Equivalents")
  const cashTotal = cashClass?.totalValue ?? 0

  return (
    <div className="space-y-6">
      {/* Portfolio Header */}
      <PortfolioHeader
        portfolioName={portfolioInfo?.name ?? "Family Office Portfolio"}
        netWorth={summary.netWorth}
        grossAssets={summary.grossAssets}
        totalDebt={summary.totalDebt}
        holdingsCount={summary.holdingsCount}
        lastUpdated={new Date()}
      />

      {/* Main Panel Grid */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Asset Allocation - Full width on mobile, half on xl */}
        <AllocationPanel data={allocation} />

        {/* Liquidity & Debt */}
        <LiquidityPanel
          liquidityData={liquidity}
          debtData={debt}
          cashTotal={cashTotal}
          grossAssets={summary.grossAssets}
        />
      </div>

      {/* Performance Panel - Full width */}
      <PerformancePanel
        holdings={holdings}
        monthlyReturns={monthlyReturns}
        portfolioYtdReturn={portfolioYtdReturn}
      />

      {/* Risk and Macro Panels */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Risk Snapshot */}
        <RiskPanel
          holdings={holdings}
          liquidityData={liquidity}
          totalValue={summary.grossAssets}
        />

        {/* Macro Environment */}
        <MacroPanel indicators={macro} history={macroHistory} />
      </div>
    </div>
  )
}
