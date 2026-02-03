/**
 * SEED DATA: Performance Snapshots
 *
 * Historical values for calculating returns.
 * We create snapshots for key dates in 2025:
 * - Jan 1, 2025 (start of year - for YTD calculations)
 * - Jan 31, 2025 (most recent)
 *
 * This allows the dashboard to calculate:
 * - YTD return = (current - jan1) / jan1
 * - Monthly return = (jan31 - jan1) / jan1
 */

import { InsertPerformanceSnapshot } from "../../schema/performance-snapshots"
import { HOLDING_IDS } from "./holdings"

// Helper to create snapshots for a holding
function createSnapshots(
  holdingId: string,
  jan1Value: string,
  jan31Value: string
): InsertPerformanceSnapshot[] {
  return [
    {
      holdingId,
      snapshotDate: "2025-01-01",
      value: jan1Value
    },
    {
      holdingId,
      snapshotDate: "2025-01-31",
      value: jan31Value
    }
  ]
}

export const performanceSnapshotsData: InsertPerformanceSnapshot[] = [
  // Public Equities - daily pricing, slight gains/losses
  ...createSnapshots(HOLDING_IDS.aapl, "4100000.00", "4250000.00"), // +3.7%
  ...createSnapshots(HOLDING_IDS.nvda, "3500000.00", "3800000.00"), // +8.6%
  ...createSnapshots(HOLDING_IDS.msft, "2900000.00", "2950000.00"), // +1.7%
  ...createSnapshots(HOLDING_IDS.voo, "2450000.00", "2500000.00"), // +2.0%
  ...createSnapshots(HOLDING_IDS.googl, "1450000.00", "1500000.00"), // +3.4%

  // Fixed Income - stable
  ...createSnapshots(HOLDING_IDS.bnd, "3480000.00", "3500000.00"), // +0.6%
  ...createSnapshots(HOLDING_IDS.treasury, "2490000.00", "2500000.00"), // +0.4%
  ...createSnapshots(HOLDING_IDS.muni, "1990000.00", "2000000.00"), // +0.5%

  // Private Equity - valued quarterly, no change in Jan
  ...createSnapshots(HOLDING_IDS.blackstone, "4500000.00", "4500000.00"),
  ...createSnapshots(HOLDING_IDS.sequoia, "3200000.00", "3200000.00"),
  ...createSnapshots(HOLDING_IDS.kkr, "2300000.00", "2300000.00"),

  // Real Estate - valued quarterly
  ...createSnapshots(HOLDING_IDS.rental1, "3200000.00", "3200000.00"),
  ...createSnapshots(HOLDING_IDS.rental2, "2300000.00", "2300000.00"),
  ...createSnapshots(HOLDING_IDS.reit, "1480000.00", "1500000.00"), // REIT ETF moves

  // Hedge Funds - valued quarterly
  ...createSnapshots(HOLDING_IDS.citadel, "2800000.00", "2800000.00"),
  ...createSnapshots(HOLDING_IDS.bridgewater, "2200000.00", "2200000.00"),

  // Cash - stable (just accrues interest)
  ...createSnapshots(HOLDING_IDS.schwab, "1792000.00", "1800000.00"),
  ...createSnapshots(HOLDING_IDS.treasury_mm, "1195000.00", "1200000.00"),

  // Alternatives
  ...createSnapshots(HOLDING_IDS.bitcoin, "1050000.00", "1200000.00"), // BTC volatility
  ...createSnapshots(HOLDING_IDS.art, "800000.00", "800000.00") // Valued annually
]
