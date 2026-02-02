/**
 * PERFORMANCE SNAPSHOTS TABLE
 *
 * Historical value records for each holding. Used to calculate returns.
 *
 * Why do we need this?
 * - To calculate "how much did AAPL return this year?" we need to know
 *   what AAPL was worth on Jan 1 vs today
 * - We store periodic snapshots (daily for public, quarterly for private)
 * - This lets us calculate returns over any time period
 *
 * Think of it like taking a photo of your portfolio value at different points in time.
 */

import { date, numeric, pgTable, timestamp, uuid } from "drizzle-orm/pg-core"
import { holdings } from "./holdings"

export const performanceSnapshots = pgTable("performance_snapshots", {
  // Unique identifier
  id: uuid("id").defaultRandom().primaryKey(),

  // Which holding is this snapshot for?
  holdingId: uuid("holding_id")
    .notNull()
    .references(() => holdings.id, { onDelete: "cascade" }),

  // The date of this snapshot
  snapshotDate: date("snapshot_date").notNull(),

  // The value on this date
  value: numeric("value", { precision: 18, scale: 2 }).notNull(),

  // When this record was created
  createdAt: timestamp("created_at").defaultNow().notNull()
})

export type InsertPerformanceSnapshot = typeof performanceSnapshots.$inferInsert
export type SelectPerformanceSnapshot = typeof performanceSnapshots.$inferSelect
