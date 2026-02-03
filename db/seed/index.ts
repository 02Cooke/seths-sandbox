/**
 * DATABASE SEED SCRIPT
 *
 * This script populates the database with sample data for development.
 * Run it with: npx bun db/seed
 *
 * IMPORTANT: This will DELETE all existing data before inserting!
 *
 * Order matters because of foreign keys:
 * - Tables must be deleted in reverse order (children before parents)
 * - Tables must be inserted in forward order (parents before children)
 */

import process from "process"
import { db } from "../index"

// Original schema (keeping for backward compatibility)
import { assets } from "../schema/assets"
import { customers } from "../schema/customers"

// Family Office Command Center schema
import { assetClasses } from "../schema/asset-classes"
import { debtItems } from "../schema/debt-items"
import { holdings } from "../schema/holdings"
import { macroIndicators } from "../schema/macro-indicators"
import { performanceSnapshots } from "../schema/performance-snapshots"
import { portfolios } from "../schema/portfolios"

// Seed data - original
import { assetsData } from "./data/assets"
import { customersData } from "./data/customers"

// Seed data - Family Office Command Center
import { assetClassesData } from "./data/asset-classes"
import { debtItemsData } from "./data/debt-items"
import { holdingsData } from "./data/holdings"
import { macroIndicatorsData } from "./data/macro-indicators"
import { performanceSnapshotsData } from "./data/performance-snapshots"
import { portfoliosData } from "./data/portfolios"

async function seed() {
  console.warn("🌱 Seeding database...")

  // ============================================================
  // RESET TABLES (reverse order due to foreign key constraints)
  // ============================================================
  console.warn("\n📭 Resetting tables...")

  // Family Office tables (children first)
  console.warn("  - Clearing performance_snapshots...")
  await db.delete(performanceSnapshots)

  console.warn("  - Clearing debt_items...")
  await db.delete(debtItems)

  console.warn("  - Clearing holdings...")
  await db.delete(holdings)

  console.warn("  - Clearing asset_classes...")
  await db.delete(assetClasses)

  console.warn("  - Clearing portfolios...")
  await db.delete(portfolios)

  console.warn("  - Clearing macro_indicators...")
  await db.delete(macroIndicators)

  // Original tables
  console.warn("  - Clearing customers...")
  await db.delete(customers)

  console.warn("  - Clearing assets...")
  await db.delete(assets)

  console.warn("✅ Tables reset complete")

  // ============================================================
  // SEED DATA (forward order - parents first)
  // ============================================================
  console.warn("\n📥 Inserting seed data...")

  // Original tables
  console.warn("  - Seeding customers...")
  await db.insert(customers).values(customersData)

  console.warn("  - Seeding assets...")
  await db.insert(assets).values(assetsData)

  // Family Office tables
  console.warn("  - Seeding portfolios...")
  await db.insert(portfolios).values(portfoliosData)

  console.warn("  - Seeding asset_classes...")
  await db.insert(assetClasses).values(assetClassesData)

  console.warn("  - Seeding holdings...")
  await db.insert(holdings).values(holdingsData)

  console.warn("  - Seeding debt_items...")
  await db.insert(debtItems).values(debtItemsData)

  console.warn("  - Seeding performance_snapshots...")
  await db.insert(performanceSnapshots).values(performanceSnapshotsData)

  console.warn("  - Seeding macro_indicators...")
  await db.insert(macroIndicators).values(macroIndicatorsData)

  console.warn("\n✅ Seeding complete!")

  // Summary
  console.warn("\n📊 Data summary:")
  console.warn(`   - 1 portfolio`)
  console.warn(`   - ${assetClassesData.length} asset classes`)
  console.warn(`   - ${holdingsData.length} holdings`)
  console.warn(`   - ${debtItemsData.length} debt items`)
  console.warn(`   - ${performanceSnapshotsData.length} performance snapshots`)
  console.warn(`   - ${macroIndicatorsData.length} macro indicators`)

  // Close the database connection
  db.$client.end()
}

seed().catch(error => {
  console.error("❌ Error seeding database:", error)
  process.exit(1)
})
