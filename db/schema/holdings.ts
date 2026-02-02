/**
 * HOLDINGS TABLE
 *
 * Individual investments in the portfolio. This is the core data table.
 *
 * A holding can be:
 * - A public stock (AAPL, NVDA) with a ticker and shares
 * - A private fund (Blackstone Fund IX) with no ticker, valued quarterly
 * - Real estate (123 Main St) with property details
 * - Cash position (Schwab Money Market)
 *
 * Key concepts:
 * - current_value: What it's worth today
 * - cost_basis: What you paid for it (used to calculate gains/losses)
 * - valuation_date: When was this value last updated?
 *   (Important for private assets that aren't priced daily)
 */

import {
  boolean,
  date,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core"
import { assetClasses } from "./asset-classes"
import { portfolios } from "./portfolios"

export const holdings = pgTable("holdings", {
  // Unique identifier
  id: uuid("id").defaultRandom().primaryKey(),

  // Which portfolio does this belong to?
  portfolioId: uuid("portfolio_id")
    .notNull()
    .references(() => portfolios.id, { onDelete: "cascade" }),

  // Which asset class? (Public Equities, Private, etc.)
  assetClassId: uuid("asset_class_id")
    .notNull()
    .references(() => assetClasses.id),

  // Name of the holding (e.g., "Apple Inc." or "Blackstone Fund IX")
  name: text("name").notNull(),

  // Stock ticker (e.g., "AAPL") - null for private investments
  ticker: text("ticker"),

  // Current market value in dollars
  // numeric(18,2) means up to 18 digits with 2 decimal places
  // Supports values up to $9,999,999,999,999,999.99
  currentValue: numeric("current_value", { precision: 18, scale: 2 }).notNull(),

  // Original purchase price (total, not per share)
  costBasis: numeric("cost_basis", { precision: 18, scale: 2 }).notNull(),

  // Number of shares (null for funds valued by NAV)
  shares: numeric("shares", { precision: 18, scale: 6 }),

  // When was this investment acquired?
  acquisitionDate: date("acquisition_date"),

  // Is this a private (illiquid) investment?
  isPrivate: boolean("is_private").default(false).notNull(),

  // When was this value last updated?
  // Critical for private assets that don't have daily prices
  valuationDate: date("valuation_date").notNull(),

  // Optional notes (e.g., "Fund IX - 2021 vintage, 4 years remaining")
  notes: text("notes"),

  // Record timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export type InsertHolding = typeof holdings.$inferInsert
export type SelectHolding = typeof holdings.$inferSelect
