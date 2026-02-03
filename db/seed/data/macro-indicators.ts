/**
 * SEED DATA: Macro Indicators
 *
 * Economic data that provides context for portfolio performance.
 * This data would normally be fetched from FRED (Federal Reserve) API.
 *
 * We track:
 * - fed_funds: Federal Reserve's target interest rate
 * - treasury_10y: 10-year Treasury yield (long-term rate expectations)
 * - cpi_yoy: Consumer Price Index year-over-year (inflation)
 *
 * Sample data for late 2024 / early 2025.
 */

import { InsertMacroIndicator } from "../../schema/macro-indicators"

export const macroIndicatorsData: InsertMacroIndicator[] = [
  // Federal Funds Rate - Fed cut rates in late 2024
  {
    indicatorName: "fed_funds",
    value: "5.50",
    indicatorDate: "2024-07-01",
    source: "FRED"
  },
  {
    indicatorName: "fed_funds",
    value: "5.25",
    indicatorDate: "2024-09-18",
    source: "FRED"
  },
  {
    indicatorName: "fed_funds",
    value: "5.00",
    indicatorDate: "2024-11-07",
    source: "FRED"
  },
  {
    indicatorName: "fed_funds",
    value: "4.75",
    indicatorDate: "2024-12-18",
    source: "FRED"
  },
  {
    indicatorName: "fed_funds",
    value: "4.50",
    indicatorDate: "2025-01-29",
    source: "FRED"
  },

  // 10-Year Treasury Yield - fluctuated with rate expectations
  {
    indicatorName: "treasury_10y",
    value: "4.25",
    indicatorDate: "2024-07-01",
    source: "FRED"
  },
  {
    indicatorName: "treasury_10y",
    value: "3.85",
    indicatorDate: "2024-09-18",
    source: "FRED"
  },
  {
    indicatorName: "treasury_10y",
    value: "4.10",
    indicatorDate: "2024-11-07",
    source: "FRED"
  },
  {
    indicatorName: "treasury_10y",
    value: "4.30",
    indicatorDate: "2024-12-18",
    source: "FRED"
  },
  {
    indicatorName: "treasury_10y",
    value: "4.45",
    indicatorDate: "2025-01-31",
    source: "FRED"
  },

  // CPI Year-over-Year - inflation cooling
  {
    indicatorName: "cpi_yoy",
    value: "3.00",
    indicatorDate: "2024-07-01",
    source: "BLS"
  },
  {
    indicatorName: "cpi_yoy",
    value: "2.60",
    indicatorDate: "2024-09-01",
    source: "BLS"
  },
  {
    indicatorName: "cpi_yoy",
    value: "2.40",
    indicatorDate: "2024-11-01",
    source: "BLS"
  },
  {
    indicatorName: "cpi_yoy",
    value: "2.30",
    indicatorDate: "2025-01-01",
    source: "BLS"
  }
]
