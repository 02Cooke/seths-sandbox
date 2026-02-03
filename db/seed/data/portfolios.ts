/**
 * SEED DATA: Portfolios
 *
 * We create one portfolio to hold all investments.
 * Using a fixed UUID so holdings can reference it.
 */

import { InsertPortfolio } from "../../schema/portfolios"

// Fixed UUID so other seed data can reference this portfolio
export const MAIN_PORTFOLIO_ID = "11111111-1111-1111-1111-111111111111"

export const portfoliosData: InsertPortfolio[] = [
  {
    id: MAIN_PORTFOLIO_ID,
    name: "Family Office Portfolio",
    description: "Consolidated view of all family assets and investments"
  }
]
