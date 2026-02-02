/**
 * PORTFOLIOS TABLE
 *
 * The top-level container for a family office portfolio.
 * For now, we support a single portfolio, but the structure
 * allows for multiple portfolios in the future.
 *
 * Think of this like the "account" that holds all your investments.
 */

import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const portfolios = pgTable("portfolios", {
  // Unique identifier - automatically generated
  id: uuid("id").defaultRandom().primaryKey(),

  // Portfolio name (e.g., "Smith Family Office")
  name: text("name").notNull(),

  // Optional description
  description: text("description"),

  // When this portfolio was created in the system
  createdAt: timestamp("created_at").defaultNow().notNull(),

  // When this record was last modified
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

// TypeScript types for inserting and selecting data
// These help catch errors before they happen
export type InsertPortfolio = typeof portfolios.$inferInsert
export type SelectPortfolio = typeof portfolios.$inferSelect
