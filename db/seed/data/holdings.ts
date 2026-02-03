/**
 * SEED DATA: Holdings
 *
 * Sample investments across all asset classes.
 * Total portfolio value: ~$50M (realistic for a family office)
 *
 * Each holding has:
 * - currentValue: What it's worth today
 * - costBasis: What was paid for it (to calculate gains/losses)
 * - valuationDate: When this value was last updated
 * - isPrivate: True for illiquid investments (valued quarterly)
 */

import { InsertHolding } from "../../schema/holdings"
import { ASSET_CLASS_IDS } from "./asset-classes"
import { MAIN_PORTFOLIO_ID } from "./portfolios"

// Fixed UUIDs for holdings (needed for performance snapshots)
export const HOLDING_IDS = {
  aapl: "33333333-3333-3333-3333-333333333301",
  nvda: "33333333-3333-3333-3333-333333333302",
  msft: "33333333-3333-3333-3333-333333333303",
  voo: "33333333-3333-3333-3333-333333333304",
  googl: "33333333-3333-3333-3333-333333333305",
  bnd: "33333333-3333-3333-3333-333333333306",
  treasury: "33333333-3333-3333-3333-333333333307",
  muni: "33333333-3333-3333-3333-333333333308",
  blackstone: "33333333-3333-3333-3333-333333333309",
  sequoia: "33333333-3333-3333-3333-333333333310",
  kkr: "33333333-3333-3333-3333-333333333311",
  rental1: "33333333-3333-3333-3333-333333333312",
  rental2: "33333333-3333-3333-3333-333333333313",
  reit: "33333333-3333-3333-3333-333333333314",
  citadel: "33333333-3333-3333-3333-333333333315",
  bridgewater: "33333333-3333-3333-3333-333333333316",
  schwab: "33333333-3333-3333-3333-333333333317",
  treasury_mm: "33333333-3333-3333-3333-333333333318",
  bitcoin: "33333333-3333-3333-3333-333333333319",
  art: "33333333-3333-3333-3333-333333333320"
}

export const holdingsData: InsertHolding[] = [
  // ============ PUBLIC EQUITIES (~$15M, 30%) ============
  {
    id: HOLDING_IDS.aapl,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.publicEquities,
    name: "Apple Inc.",
    ticker: "AAPL",
    currentValue: "4250000.00",
    costBasis: "2800000.00",
    shares: "18500.000000",
    acquisitionDate: "2020-03-15",
    isPrivate: false,
    valuationDate: "2025-01-31",
    notes: "Core tech holding, long-term"
  },
  {
    id: HOLDING_IDS.nvda,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.publicEquities,
    name: "NVIDIA Corporation",
    ticker: "NVDA",
    currentValue: "3800000.00",
    costBasis: "1200000.00",
    shares: "5200.000000",
    acquisitionDate: "2021-06-01",
    isPrivate: false,
    valuationDate: "2025-01-31",
    notes: "AI/GPU exposure"
  },
  {
    id: HOLDING_IDS.msft,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.publicEquities,
    name: "Microsoft Corporation",
    ticker: "MSFT",
    currentValue: "2950000.00",
    costBasis: "2100000.00",
    shares: "7000.000000",
    acquisitionDate: "2019-08-20",
    isPrivate: false,
    valuationDate: "2025-01-31"
  },
  {
    id: HOLDING_IDS.voo,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.publicEquities,
    name: "Vanguard S&P 500 ETF",
    ticker: "VOO",
    currentValue: "2500000.00",
    costBasis: "2000000.00",
    shares: "4800.000000",
    acquisitionDate: "2022-01-10",
    isPrivate: false,
    valuationDate: "2025-01-31",
    notes: "Broad market index exposure"
  },
  {
    id: HOLDING_IDS.googl,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.publicEquities,
    name: "Alphabet Inc.",
    ticker: "GOOGL",
    currentValue: "1500000.00",
    costBasis: "1100000.00",
    shares: "8500.000000",
    acquisitionDate: "2020-11-15",
    isPrivate: false,
    valuationDate: "2025-01-31"
  },

  // ============ FIXED INCOME (~$8M, 16%) ============
  {
    id: HOLDING_IDS.bnd,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.fixedIncome,
    name: "Vanguard Total Bond Market ETF",
    ticker: "BND",
    currentValue: "3500000.00",
    costBasis: "3600000.00",
    shares: "45000.000000",
    acquisitionDate: "2023-01-15",
    isPrivate: false,
    valuationDate: "2025-01-31",
    notes: "Core bond allocation"
  },
  {
    id: HOLDING_IDS.treasury,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.fixedIncome,
    name: "US Treasury Notes (5Y)",
    ticker: null,
    currentValue: "2500000.00",
    costBasis: "2500000.00",
    shares: null,
    acquisitionDate: "2024-06-01",
    isPrivate: false,
    valuationDate: "2025-01-31",
    notes: "Laddered treasury position, 4.5% yield"
  },
  {
    id: HOLDING_IDS.muni,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.fixedIncome,
    name: "California Municipal Bonds",
    ticker: null,
    currentValue: "2000000.00",
    costBasis: "2000000.00",
    shares: null,
    acquisitionDate: "2024-03-01",
    isPrivate: false,
    valuationDate: "2025-01-31",
    notes: "Tax-exempt income"
  },

  // ============ PRIVATE EQUITY (~$10M, 20%) ============
  {
    id: HOLDING_IDS.blackstone,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.privateEquity,
    name: "Blackstone Fund IX",
    ticker: null,
    currentValue: "4500000.00",
    costBasis: "3500000.00",
    shares: null,
    acquisitionDate: "2021-09-01",
    isPrivate: true,
    valuationDate: "2024-12-31",
    notes: "Buyout fund, 2021 vintage, 4 years remaining"
  },
  {
    id: HOLDING_IDS.sequoia,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.privateEquity,
    name: "Sequoia Capital Fund XVIII",
    ticker: null,
    currentValue: "3200000.00",
    costBasis: "2500000.00",
    shares: null,
    acquisitionDate: "2022-03-15",
    isPrivate: true,
    valuationDate: "2024-12-31",
    notes: "Venture capital, early stage tech"
  },
  {
    id: HOLDING_IDS.kkr,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.privateEquity,
    name: "KKR Americas XII",
    ticker: null,
    currentValue: "2300000.00",
    costBasis: "2000000.00",
    shares: null,
    acquisitionDate: "2023-01-20",
    isPrivate: true,
    valuationDate: "2024-12-31",
    notes: "Infrastructure focus"
  },

  // ============ REAL ESTATE (~$7M, 14%) ============
  {
    id: HOLDING_IDS.rental1,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.realEstate,
    name: "123 Pacific Heights, SF",
    ticker: null,
    currentValue: "3200000.00",
    costBasis: "2400000.00",
    shares: null,
    acquisitionDate: "2018-05-01",
    isPrivate: true,
    valuationDate: "2024-12-31",
    notes: "Rental property, 4-unit building"
  },
  {
    id: HOLDING_IDS.rental2,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.realEstate,
    name: "456 Marina Blvd, SF",
    ticker: null,
    currentValue: "2300000.00",
    costBasis: "1800000.00",
    shares: null,
    acquisitionDate: "2019-09-15",
    isPrivate: true,
    valuationDate: "2024-12-31",
    notes: "Rental property, 2-unit"
  },
  {
    id: HOLDING_IDS.reit,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.realEstate,
    name: "Vanguard Real Estate ETF",
    ticker: "VNQ",
    currentValue: "1500000.00",
    costBasis: "1400000.00",
    shares: "16500.000000",
    acquisitionDate: "2022-06-01",
    isPrivate: false,
    valuationDate: "2025-01-31",
    notes: "Diversified REIT exposure"
  },

  // ============ HEDGE FUNDS (~$5M, 10%) ============
  {
    id: HOLDING_IDS.citadel,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.hedgeFunds,
    name: "Citadel Wellington Fund",
    ticker: null,
    currentValue: "2800000.00",
    costBasis: "2500000.00",
    shares: null,
    acquisitionDate: "2022-01-01",
    isPrivate: true,
    valuationDate: "2024-12-31",
    notes: "Multi-strategy, quarterly liquidity"
  },
  {
    id: HOLDING_IDS.bridgewater,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.hedgeFunds,
    name: "Bridgewater Pure Alpha",
    ticker: null,
    currentValue: "2200000.00",
    costBasis: "2200000.00",
    shares: null,
    acquisitionDate: "2023-04-01",
    isPrivate: true,
    valuationDate: "2024-12-31",
    notes: "Macro strategy, quarterly liquidity"
  },

  // ============ CASH (~$3M, 6%) ============
  {
    id: HOLDING_IDS.schwab,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.cash,
    name: "Schwab Prime Money Market",
    ticker: "SWVXX",
    currentValue: "1800000.00",
    costBasis: "1800000.00",
    shares: "1800000.000000",
    acquisitionDate: "2024-01-01",
    isPrivate: false,
    valuationDate: "2025-01-31",
    notes: "Operating cash, 5.1% yield"
  },
  {
    id: HOLDING_IDS.treasury_mm,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.cash,
    name: "Fidelity Treasury Money Market",
    ticker: "FZFXX",
    currentValue: "1200000.00",
    costBasis: "1200000.00",
    shares: "1200000.000000",
    acquisitionDate: "2024-06-01",
    isPrivate: false,
    valuationDate: "2025-01-31",
    notes: "Reserve cash"
  },

  // ============ ALTERNATIVES (~$2M, 4%) ============
  {
    id: HOLDING_IDS.bitcoin,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.alternatives,
    name: "Bitcoin (Cold Storage)",
    ticker: "BTC",
    currentValue: "1200000.00",
    costBasis: "400000.00",
    shares: "12.500000",
    acquisitionDate: "2020-12-01",
    isPrivate: false,
    valuationDate: "2025-01-31",
    notes: "Hardware wallet, Coinbase Custody backup"
  },
  {
    id: HOLDING_IDS.art,
    portfolioId: MAIN_PORTFOLIO_ID,
    assetClassId: ASSET_CLASS_IDS.alternatives,
    name: "Art Collection",
    ticker: null,
    currentValue: "800000.00",
    costBasis: "500000.00",
    shares: null,
    acquisitionDate: "2015-01-01",
    isPrivate: true,
    valuationDate: "2024-06-30",
    notes: "Contemporary pieces, last appraised June 2024"
  }
]
