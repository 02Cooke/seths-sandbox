/**
 * ASSET CLASSES TABLE
 *
 * Categories for organizing holdings. Each holding belongs to one asset class.
 *
 * Asset classes are pre-defined categories like:
 * - Public Equities (stocks you can buy/sell on exchanges)
 * - Private Investments (PE funds, VC, direct investments)
 * - Real Estate (properties, REITs)
 * - Cash & Equivalents (bank accounts, money market, T-bills)
 * - Alternatives (hedge funds, commodities, crypto)
 *
 * The liquidity_type helps us calculate risk metrics:
 * - "liquid": Can sell in 1-3 days (public stocks, ETFs)
 * - "semi_liquid": Can sell in weeks/months (some hedge funds, REITs)
 * - "illiquid": Locked up for years (PE funds, direct real estate)
 */

import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core"

// Enum = a fixed set of allowed values (like a dropdown)
export const liquidityTypeEnum = pgEnum("liquidity_type", [
  "liquid",
  "semi_liquid",
  "illiquid"
])

export const assetClasses = pgTable("asset_classes", {
  // Unique identifier
  id: uuid("id").defaultRandom().primaryKey(),

  // Name of the asset class (e.g., "Public Equities")
  name: text("name").notNull().unique(),

  // How liquid is this asset class?
  liquidityType: liquidityTypeEnum("liquidity_type").notNull(),

  // Order to display in charts/lists (1 = first, 2 = second, etc.)
  displayOrder: integer("display_order").notNull(),

  // Color for charts (hex code like "#4F46E5" for indigo)
  color: text("color").notNull(),

  // Icon name from Lucide icons (optional)
  icon: text("icon")
})

export type InsertAssetClass = typeof assetClasses.$inferInsert
export type SelectAssetClass = typeof assetClasses.$inferSelect
