/**
 * DATABASE CONNECTION
 *
 * This file sets up the connection to your Supabase database.
 *
 * Key concepts:
 * - We use Drizzle ORM to interact with the database
 * - The connection is "lazy" - it only connects when you actually need data
 * - This lets pages that don't need the database still work
 */

import { config } from "dotenv"
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js"
import postgres from "postgres"

// Import all table schemas
// These were from the original AlphaWatch setup
import { assets } from "./schema/assets"
import { customers } from "./schema/customers"

// Family Office Command Center tables
import { assetClasses } from "./schema/asset-classes"
import { debtItems } from "./schema/debt-items"
import { holdings } from "./schema/holdings"
import { macroIndicators } from "./schema/macro-indicators"
import { performanceSnapshots } from "./schema/performance-snapshots"
import { portfolios } from "./schema/portfolios"

// Load environment variables from .env.local
config({ path: ".env.local" })

const databaseUrl = process.env.DATABASE_URL

// All tables registered with the database
const dbSchema = {
  // Original tables (keeping for now)
  customers,
  assets,

  // Family Office Command Center tables
  portfolios,
  assetClasses,
  holdings,
  debtItems,
  performanceSnapshots,
  macroIndicators
}

function initializeDb(url: string) {
  const client = postgres(url, { prepare: false })
  return drizzlePostgres(client, { schema: dbSchema })
}

type Db = ReturnType<typeof initializeDb>

let _db: Db | null = null

function getDb(): Db {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set")
  }
  if (!_db) {
    _db = initializeDb(databaseUrl)
  }
  return _db
}

/**
 * Lazy database connection
 *
 * This is a "proxy" that only connects to the database when you actually
 * try to use it. This way, pages that don't need the database (like the
 * marketing pages) can still load even if DATABASE_URL isn't set.
 */
export const db = new Proxy({} as Db, {
  get(_, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop]
  }
})
