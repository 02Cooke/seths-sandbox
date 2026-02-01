import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core"

export const assetCategory = pgEnum("asset_category", [
  "crypto",
  "stock",
  "commodity",
  "forex"
])

export const assets = pgTable("assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  symbol: text("symbol").unique().notNull(),
  price: numeric("price", { precision: 18, scale: 2 }).notNull(),
  change24h: numeric("change_24h", { precision: 8, scale: 2 }).notNull(),
  volume: text("volume").notNull(),
  marketCap: text("market_cap"),
  category: assetCategory("category").notNull(),
  rank: integer("rank").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export type InsertAsset = typeof assets.$inferInsert
export type SelectAsset = typeof assets.$inferSelect
