/**
 * DEBT ITEMS TABLE
 *
 * Tracks money owed - loans, credit lines, mortgages on investment properties.
 *
 * Why track debt separately from holdings?
 * - Debt reduces your net worth but isn't an "investment"
 * - You need to see gross assets vs net worth
 * - Debt has its own properties (interest rate, lender)
 *
 * Types of debt commonly seen in family offices:
 * - margin: Borrowing against brokerage account (e.g., Schwab margin loan)
 * - loc: Securities-based line of credit (SBLOC)
 * - mortgage: Debt on investment real estate
 * - other: Any other borrowing
 */

import { numeric, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { portfolios } from "./portfolios"

// Fixed set of debt types
export const debtTypeEnum = pgEnum("debt_type", [
  "margin",
  "loc",
  "mortgage",
  "other"
])

export const debtItems = pgTable("debt_items", {
  // Unique identifier
  id: uuid("id").defaultRandom().primaryKey(),

  // Which portfolio does this debt belong to?
  portfolioId: uuid("portfolio_id")
    .notNull()
    .references(() => portfolios.id, { onDelete: "cascade" }),

  // Name/description (e.g., "Schwab Margin Loan")
  name: text("name").notNull(),

  // Type of debt
  debtType: debtTypeEnum("debt_type").notNull(),

  // Current balance owed (positive number)
  balance: numeric("balance", { precision: 18, scale: 2 }).notNull(),

  // Annual interest rate as a percentage (e.g., 6.5 for 6.5%)
  interestRate: numeric("interest_rate", { precision: 5, scale: 2 }),

  // Who is the lender?
  lender: text("lender"),

  // Optional notes
  notes: text("notes"),

  // Record timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export type InsertDebtItem = typeof debtItems.$inferInsert
export type SelectDebtItem = typeof debtItems.$inferSelect
