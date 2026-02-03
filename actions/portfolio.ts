"use server"

/**
 * PORTFOLIO SERVER ACTIONS
 *
 * These functions fetch data from the database for the Family Office dashboard.
 *
 * "use server" means these functions:
 * - Run on the server (not in the browser)
 * - Can safely access the database
 * - Are called automatically by React when used in components
 *
 * Each function returns data in a format ready for the UI components.
 */

import { db } from "@/db"
import { assetClasses } from "@/db/schema/asset-classes"
import { debtItems } from "@/db/schema/debt-items"
import { holdings } from "@/db/schema/holdings"
import { macroIndicators } from "@/db/schema/macro-indicators"
import { performanceSnapshots } from "@/db/schema/performance-snapshots"
import { portfolios } from "@/db/schema/portfolios"
import { and, desc, eq, sql } from "drizzle-orm"

// ============================================================
// PORTFOLIO SUMMARY
// ============================================================

/**
 * Get high-level portfolio numbers
 *
 * Returns:
 * - grossAssets: Total value of all holdings
 * - totalDebt: Sum of all debt balances
 * - netWorth: grossAssets - totalDebt
 * - holdingsCount: Number of individual holdings
 */
export async function getPortfolioSummary() {
  // Get total holdings value
  const holdingsResult = await db
    .select({
      total: sql<string>`COALESCE(SUM(${holdings.currentValue}), 0)`,
      count: sql<number>`COUNT(*)`
    })
    .from(holdings)

  // Get total debt
  const debtResult = await db
    .select({
      total: sql<string>`COALESCE(SUM(${debtItems.balance}), 0)`
    })
    .from(debtItems)

  const grossAssets = parseFloat(holdingsResult[0]?.total || "0")
  const totalDebt = parseFloat(debtResult[0]?.total || "0")

  return {
    grossAssets,
    totalDebt,
    netWorth: grossAssets - totalDebt,
    holdingsCount: holdingsResult[0]?.count || 0
  }
}

// ============================================================
// ALLOCATION BREAKDOWN
// ============================================================

/**
 * Get portfolio allocation by asset class
 *
 * Used for the pie chart showing how the portfolio is divided.
 * Returns each asset class with its total value and percentage.
 */
export async function getAllocationBreakdown() {
  // Join holdings with asset classes and sum by class
  const result = await db
    .select({
      id: assetClasses.id,
      name: assetClasses.name,
      color: assetClasses.color,
      liquidityType: assetClasses.liquidityType,
      displayOrder: assetClasses.displayOrder,
      totalValue: sql<string>`COALESCE(SUM(${holdings.currentValue}), 0)`
    })
    .from(assetClasses)
    .leftJoin(holdings, eq(holdings.assetClassId, assetClasses.id))
    .groupBy(assetClasses.id)
    .orderBy(assetClasses.displayOrder)

  // Calculate total for percentages
  const total = result.reduce((sum, item) => sum + parseFloat(item.totalValue), 0)

  // Add percentage to each item
  return result.map(item => ({
    ...item,
    totalValue: parseFloat(item.totalValue),
    percentage: total > 0 ? (parseFloat(item.totalValue) / total) * 100 : 0
  }))
}

// ============================================================
// HOLDINGS WITH RETURNS
// ============================================================

/**
 * Get all holdings with calculated YTD returns
 *
 * For each holding, we:
 * 1. Get the current value
 * 2. Find the Jan 1 snapshot value
 * 3. Calculate YTD return = (current - jan1) / jan1 * 100
 */
export async function getHoldingsWithReturns() {
  // Get all holdings with their asset class info
  const holdingsData = await db
    .select({
      id: holdings.id,
      name: holdings.name,
      ticker: holdings.ticker,
      currentValue: holdings.currentValue,
      costBasis: holdings.costBasis,
      shares: holdings.shares,
      isPrivate: holdings.isPrivate,
      valuationDate: holdings.valuationDate,
      notes: holdings.notes,
      assetClassName: assetClasses.name,
      assetClassColor: assetClasses.color,
      liquidityType: assetClasses.liquidityType
    })
    .from(holdings)
    .innerJoin(assetClasses, eq(holdings.assetClassId, assetClasses.id))
    .orderBy(desc(holdings.currentValue))

  // Get Jan 1 snapshots for YTD calculation
  const jan1Snapshots = await db
    .select({
      holdingId: performanceSnapshots.holdingId,
      value: performanceSnapshots.value
    })
    .from(performanceSnapshots)
    .where(eq(performanceSnapshots.snapshotDate, "2025-01-01"))

  // Create a map for quick lookup
  const jan1Map = new Map(
    jan1Snapshots.map(s => [s.holdingId, parseFloat(s.value)])
  )

  // Calculate returns for each holding
  return holdingsData.map(holding => {
    const currentValue = parseFloat(holding.currentValue)
    const costBasis = parseFloat(holding.costBasis)
    const jan1Value = jan1Map.get(holding.id)

    // YTD return (if we have Jan 1 data)
    const ytdReturn = jan1Value && jan1Value > 0
      ? ((currentValue - jan1Value) / jan1Value) * 100
      : null

    // Total return since purchase
    const totalReturn = costBasis > 0
      ? ((currentValue - costBasis) / costBasis) * 100
      : null

    // Unrealized gain/loss in dollars
    const unrealizedGain = currentValue - costBasis

    return {
      ...holding,
      currentValue,
      costBasis,
      shares: holding.shares ? parseFloat(holding.shares) : null,
      ytdReturn,
      totalReturn,
      unrealizedGain
    }
  })
}

// ============================================================
// LIQUIDITY BREAKDOWN
// ============================================================

/**
 * Get portfolio breakdown by liquidity type
 *
 * Shows how much of the portfolio is:
 * - Liquid (can sell today): Public stocks, ETFs, money market
 * - Semi-liquid (can sell within 90 days): Some hedge funds
 * - Illiquid (locked up): Private equity, real estate
 */
export async function getLiquidityBreakdown() {
  const result = await db
    .select({
      liquidityType: assetClasses.liquidityType,
      totalValue: sql<string>`COALESCE(SUM(${holdings.currentValue}), 0)`
    })
    .from(holdings)
    .innerJoin(assetClasses, eq(holdings.assetClassId, assetClasses.id))
    .groupBy(assetClasses.liquidityType)

  // Calculate total for percentages
  const total = result.reduce((sum, item) => sum + parseFloat(item.totalValue), 0)

  // Format with labels and percentages
  const liquidityLabels: Record<string, string> = {
    liquid: "Liquid",
    semi_liquid: "Semi-Liquid",
    illiquid: "Illiquid"
  }

  const liquidityColors: Record<string, string> = {
    liquid: "#10B981", // Green
    semi_liquid: "#F59E0B", // Amber
    illiquid: "#EF4444" // Red
  }

  return result.map(item => ({
    type: item.liquidityType,
    label: liquidityLabels[item.liquidityType] || item.liquidityType,
    color: liquidityColors[item.liquidityType] || "#6B7280",
    totalValue: parseFloat(item.totalValue),
    percentage: total > 0 ? (parseFloat(item.totalValue) / total) * 100 : 0
  }))
}

// ============================================================
// DEBT SUMMARY
// ============================================================

/**
 * Get all debt items with summary
 *
 * Returns each debt item plus totals.
 * Useful for the debt card showing what's owed and to whom.
 */
export async function getDebtSummary() {
  const debts = await db
    .select()
    .from(debtItems)
    .orderBy(desc(debtItems.balance))

  const totalDebt = debts.reduce(
    (sum, debt) => sum + parseFloat(debt.balance),
    0
  )

  // Calculate weighted average interest rate
  const weightedInterest = debts.reduce((sum, debt) => {
    const balance = parseFloat(debt.balance)
    const rate = debt.interestRate ? parseFloat(debt.interestRate) : 0
    return sum + (balance * rate)
  }, 0)

  const avgInterestRate = totalDebt > 0 ? weightedInterest / totalDebt : 0

  return {
    items: debts.map(debt => ({
      ...debt,
      balance: parseFloat(debt.balance),
      interestRate: debt.interestRate ? parseFloat(debt.interestRate) : null
    })),
    totalDebt,
    avgInterestRate,
    count: debts.length
  }
}

// ============================================================
// MACRO INDICATORS
// ============================================================

/**
 * Get the latest macro economic indicators
 *
 * Returns the most recent values for:
 * - Fed Funds Rate
 * - 10-Year Treasury Yield
 * - CPI Year-over-Year (inflation)
 */
export async function getMacroIndicators() {
  // Get the most recent value for each indicator
  const indicators = ["fed_funds", "treasury_10y", "cpi_yoy"] as const

  const results = await Promise.all(
    indicators.map(async (indicatorName) => {
      const result = await db
        .select()
        .from(macroIndicators)
        .where(eq(macroIndicators.indicatorName, indicatorName))
        .orderBy(desc(macroIndicators.indicatorDate))
        .limit(1)

      return result[0] || null
    })
  )

  // Format for display
  const labels: Record<string, string> = {
    fed_funds: "Fed Funds Rate",
    treasury_10y: "10Y Treasury",
    cpi_yoy: "CPI (YoY)"
  }

  return results
    .filter(Boolean)
    .map(indicator => ({
      name: indicator!.indicatorName,
      label: labels[indicator!.indicatorName] || indicator!.indicatorName,
      value: parseFloat(indicator!.value),
      date: indicator!.indicatorDate,
      source: indicator!.source
    }))
}

// ============================================================
// MACRO HISTORY
// ============================================================

/**
 * Get historical macro indicator data for sparklines
 *
 * Returns arrays of historical values for each indicator,
 * sorted chronologically for charting.
 */
export async function getMacroHistory() {
  const indicators = ["fed_funds", "treasury_10y", "cpi_yoy"] as const

  const results = await Promise.all(
    indicators.map(async (indicatorName) => {
      const history = await db
        .select({
          value: macroIndicators.value,
          date: macroIndicators.indicatorDate
        })
        .from(macroIndicators)
        .where(eq(macroIndicators.indicatorName, indicatorName))
        .orderBy(macroIndicators.indicatorDate)

      return {
        name: indicatorName,
        history: history.map((h) => ({
          value: parseFloat(h.value),
          date: h.date
        }))
      }
    })
  )

  // Convert to a map for easy lookup
  return Object.fromEntries(results.map((r) => [r.name, r.history])) as Record<
    string,
    Array<{ value: number; date: string }>
  >
}

// ============================================================
// MONTHLY RETURNS
// ============================================================

/**
 * Get monthly portfolio returns for charting
 *
 * Returns an array of monthly returns with:
 * - month: "Jan", "Feb", etc.
 * - year: 2025
 * - return: percentage return for that month
 *
 * Note: In production, this would calculate from actual snapshots.
 * For now, we generate realistic sample data based on the portfolio composition.
 */
export async function getMonthlyReturns() {
  // Get portfolio allocation to inform realistic returns
  const allocation = await getAllocationBreakdown()

  // Calculate weighted volatility based on asset mix
  // Public equities: ~2% monthly vol, Private: ~0.5%, RE: ~0.3%, Cash: ~0.1%
  const volatilityByClass: Record<string, number> = {
    "Public Equities": 0.025,
    "Private Investments": 0.005,
    "Real Estate": 0.003,
    "Cash & Equivalents": 0.001,
    "Alternatives": 0.015
  }

  const totalValue = allocation.reduce((sum, a) => sum + a.totalValue, 0)
  const weightedVol = allocation.reduce((sum, a) => {
    const vol = volatilityByClass[a.name] || 0.01
    return sum + vol * (a.totalValue / totalValue)
  }, 0)

  // Generate monthly returns for 2025 (with slight positive drift)
  // Seed with consistent values for demo purposes
  const monthlySeeds = [0.8, 1.2, -0.5, 0.9, 1.5, -0.3, 0.7, 1.1, -0.8, 0.6, 1.3, 0.4]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Only return data up to current month (simulating real data)
  const currentMonth = new Date().getMonth() // 0-indexed

  return months.slice(0, currentMonth + 1).map((month, index) => ({
    month,
    year: 2025,
    return: monthlySeeds[index] * (weightedVol / 0.015) // Scale by portfolio volatility
  }))
}

// ============================================================
// PORTFOLIO INFO
// ============================================================

/**
 * Get basic portfolio info (name, description)
 */
export async function getPortfolioInfo() {
  const result = await db.select().from(portfolios).limit(1)
  return result[0] || null
}
