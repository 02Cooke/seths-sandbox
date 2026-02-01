import { config } from "dotenv"
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { customers } from "./schema/customers"

config({ path: ".env.local" })

const databaseUrl = process.env.DATABASE_URL

const dbSchema = {
  // tables
  customers
  // relations
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

/** Lazy db: only connects and throws when actually used, so the app can run without DATABASE_URL (e.g. marketing pages). */
export const db = new Proxy({} as Db, {
  get(_, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop]
  }
})
