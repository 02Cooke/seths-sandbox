/**
 * SEED DATA: Debt Items
 *
 * Sample debt that reduces net worth.
 * Common in family offices for tax-efficient borrowing.
 *
 * Types included:
 * - Margin loan: Borrowing against brokerage account
 * - Securities-based line of credit (SBLOC): Lower rate than margin
 * - Mortgage: On investment property
 */

import { InsertDebtItem } from "../../schema/debt-items"
import { MAIN_PORTFOLIO_ID } from "./portfolios"

export const debtItemsData: InsertDebtItem[] = [
  {
    portfolioId: MAIN_PORTFOLIO_ID,
    name: "Schwab Margin Loan",
    debtType: "margin",
    balance: "500000.00",
    interestRate: "6.75",
    lender: "Charles Schwab",
    notes: "Used for opportunistic purchases, secured by brokerage account"
  },
  {
    portfolioId: MAIN_PORTFOLIO_ID,
    name: "Goldman Sachs SBLOC",
    debtType: "loc",
    balance: "1200000.00",
    interestRate: "5.25",
    lender: "Goldman Sachs Private",
    notes: "Securities-based line of credit, SOFR + 1.25%"
  },
  {
    portfolioId: MAIN_PORTFOLIO_ID,
    name: "123 Pacific Heights Mortgage",
    debtType: "mortgage",
    balance: "1800000.00",
    interestRate: "3.25",
    lender: "First Republic Bank",
    notes: "30-year fixed, locked in 2021"
  }
]
