/**
 * MACRO INDICATORS TABLE
 *
 * Economic data that provides context for portfolio performance.
 *
 * We track:
 * - fed_funds: Federal Reserve's target interest rate
 * - treasury_10y: 10-year Treasury yield (long-term rate expectations)
 * - cpi_yoy: Consumer Price Index year-over-year (inflation)
 *
 * This data is fetched from public APIs (FRED, BLS) and stored here.
 * Not tied to a specific portfolio - it's global economic data.
 *
 * Why store it instead of fetching live?
 * - API rate limits (can only make X requests per minute)
 * - Historical data for charts
 * - Faster page loads (no waiting for external API)
 */

import { date, numeric, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

// The specific indicators we track
export const indicatorNameEnum = pgEnum("indicator_name", [
  "fed_funds",
  "treasury_10y",
  "cpi_yoy"
])

export const macroIndicators = pgTable("macro_indicators", {
  // Unique identifier
  id: uuid("id").defaultRandom().primaryKey(),

  // Which indicator is this?
  indicatorName: indicatorNameEnum("indicator_name").notNull(),

  // The value (e.g., 5.25 for 5.25%)
  value: numeric("value", { precision: 10, scale: 4 }).notNull(),

  // The date this reading applies to
  indicatorDate: date("indicator_date").notNull(),

  // Where did this data come from? (e.g., "FRED", "BLS")
  source: text("source").notNull(),

  // When we fetched/stored this record
  createdAt: timestamp("created_at").defaultNow().notNull()
})

export type InsertMacroIndicator = typeof macroIndicators.$inferInsert
export type SelectMacroIndicator = typeof macroIndicators.$inferSelect
