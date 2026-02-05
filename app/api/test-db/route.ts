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
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const results: Record<string, { success: boolean; elapsed: number; error?: string }> = {}
  const totalStart = Date.now()

  // Test each query individually
  const queries = [
    { name: "getPortfolioInfo", fn: getPortfolioInfo },
    { name: "getPortfolioSummary", fn: getPortfolioSummary },
    { name: "getAllocationBreakdown", fn: getAllocationBreakdown },
    { name: "getHoldingsWithReturns", fn: getHoldingsWithReturns },
    { name: "getLiquidityBreakdown", fn: getLiquidityBreakdown },
    { name: "getDebtSummary", fn: getDebtSummary },
    { name: "getMacroIndicators", fn: getMacroIndicators },
    { name: "getMacroHistory", fn: getMacroHistory },
    { name: "getMonthlyReturns", fn: getMonthlyReturns }
  ]

  for (const { name, fn } of queries) {
    const start = Date.now()
    try {
      console.log(`[test-db] Running ${name}...`)
      await fn()
      results[name] = { success: true, elapsed: Date.now() - start }
      console.log(`[test-db] ${name} succeeded in ${results[name].elapsed}ms`)
    } catch (error) {
      results[name] = {
        success: false,
        elapsed: Date.now() - start,
        error: error instanceof Error ? error.message : String(error)
      }
      console.error(`[test-db] ${name} failed:`, error)
    }
  }

  const totalElapsed = Date.now() - totalStart
  const allSuccess = Object.values(results).every(r => r.success)

  return NextResponse.json({
    success: allSuccess,
    totalElapsed: `${totalElapsed}ms`,
    results
  }, { status: allSuccess ? 200 : 500 })
}
