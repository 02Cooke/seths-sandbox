/**
 * SEED DATA: Asset Classes
 *
 * The categories that holdings belong to. Each has:
 * - A liquidity type (how fast can you sell it?)
 * - A display order (how they appear in the UI)
 * - A color (for the allocation pie chart)
 *
 * Using fixed UUIDs so holdings can reference them.
 */

import { InsertAssetClass } from "../../schema/asset-classes"

// Fixed UUIDs for each asset class
export const ASSET_CLASS_IDS = {
  publicEquities: "22222222-2222-2222-2222-222222222201",
  fixedIncome: "22222222-2222-2222-2222-222222222202",
  privateEquity: "22222222-2222-2222-2222-222222222203",
  realEstate: "22222222-2222-2222-2222-222222222204",
  hedgeFunds: "22222222-2222-2222-2222-222222222205",
  cash: "22222222-2222-2222-2222-222222222206",
  alternatives: "22222222-2222-2222-2222-222222222207"
}

export const assetClassesData: InsertAssetClass[] = [
  {
    id: ASSET_CLASS_IDS.publicEquities,
    name: "Public Equities",
    liquidityType: "liquid",
    displayOrder: 1,
    color: "#3B82F6", // Blue
    icon: "trending-up"
  },
  {
    id: ASSET_CLASS_IDS.fixedIncome,
    name: "Fixed Income",
    liquidityType: "liquid",
    displayOrder: 2,
    color: "#10B981", // Green
    icon: "landmark"
  },
  {
    id: ASSET_CLASS_IDS.privateEquity,
    name: "Private Equity",
    liquidityType: "illiquid",
    displayOrder: 3,
    color: "#8B5CF6", // Purple
    icon: "briefcase"
  },
  {
    id: ASSET_CLASS_IDS.realEstate,
    name: "Real Estate",
    liquidityType: "illiquid",
    displayOrder: 4,
    color: "#F59E0B", // Amber
    icon: "building"
  },
  {
    id: ASSET_CLASS_IDS.hedgeFunds,
    name: "Hedge Funds",
    liquidityType: "semi_liquid",
    displayOrder: 5,
    color: "#EC4899", // Pink
    icon: "shield"
  },
  {
    id: ASSET_CLASS_IDS.cash,
    name: "Cash & Equivalents",
    liquidityType: "liquid",
    displayOrder: 6,
    color: "#6B7280", // Gray
    icon: "banknote"
  },
  {
    id: ASSET_CLASS_IDS.alternatives,
    name: "Alternatives",
    liquidityType: "illiquid",
    displayOrder: 7,
    color: "#14B8A6", // Teal
    icon: "gem"
  }
]
