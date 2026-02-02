# Family Office Asset Command Center

## Project Overview

The Family Office Asset Command Center is a consolidated portfolio dashboard designed to give a high-level, decision-oriented view of a multi-asset family office balance sheet.

### What Problem Does This Solve?

Family offices typically track investments across multiple accounts, custodians, and asset types:
- Brokerage accounts with public stocks
- Private equity fund investments
- Real estate holdings
- Cash across multiple banks
- Debt (margin loans, lines of credit)

This information is usually scattered across:
- Monthly statements (PDF)
- Spreadsheets (Excel)
- Custodian portals (multiple logins)
- Private fund reports (quarterly PDFs)

**The Command Center consolidates everything into one view**, answering the questions that matter:
- How is our capital allocated?
- What's actually driving our returns?
- Where are our risks concentrated?
- How do macro conditions affect us?

---

## Target User

**Single Family Office** - One family's wealth management team or principals who need:
- Portfolio oversight (not day trading)
- Investment committee decision support
- Risk awareness
- Macro context

This is NOT a trading platform. It's a **decision-support dashboard** for capital allocation and portfolio health monitoring.

---

## Core Sections

### 1. Asset Allocation Panel (Primary Focus)

The anchor of the dashboard. Shows how capital is deployed across major asset classes.

**Asset Classes Tracked:**
| Asset Class | Examples | Liquidity |
|-------------|----------|-----------|
| Public Equities | AAPL, NVDA, index ETFs | Liquid |
| Private Investments | PE funds, VC funds, direct investments | Illiquid |
| Real Estate | Properties, REITs | Semi-liquid to Illiquid |
| Cash & Equivalents | Bank accounts, money market, T-bills | Liquid |
| Alternatives | Hedge funds, commodities, crypto | Varies |

**What You'll See:**
- Donut chart showing allocation percentages
- Dollar amounts per asset class
- Quarterly change indicators (are we drifting from targets?)
- Drill-down to see individual holdings

**Why This Matters:**
Asset allocation is the #1 driver of long-term returns. This panel answers: "Where is our money?"

---

### 2. Liquidity & Debt Position

Located near Cash, this section shows the **net liquidity picture**.

**Components:**
- **Cash & Equivalents**: Immediately accessible funds
- **Short-Term Debt**: Margin loans, credit lines, any borrowing
- **Net Liquidity**: Cash minus Debt
- **Debt-to-Assets Ratio**: Total debt as percentage of total portfolio

**Why This Matters:**
Knowing gross cash is misleading if you have significant borrowing. A family office with $5M cash but $4M in margin loans has very different flexibility than one with $5M cash and no debt.

**Debt Types Tracked:**
| Debt Type | Description |
|-----------|-------------|
| Margin Loan | Borrowing against brokerage account |
| Securities-Based Line of Credit | Loan secured by portfolio |
| Mortgage (Investment Property) | Debt on real estate holdings |
| Other Credit Lines | Bank lines, private credit |

---

### 3. Performance Overview

Summarizes returns across multiple time horizons and identifies what's driving results.

**Time Horizons:**
| Period | Definition |
|--------|------------|
| YTD (Year-to-Date) | January 1, 2025 → Today |
| QTD (Quarter-to-Date) | Start of current quarter → Today |
| 1-Year | Rolling 365 days back |
| Since Inception | First transaction in system → Today |

**Attribution Analysis:**
- **Top Contributors**: Holdings that added the most value
- **Bottom Contributors**: Holdings that detracted from performance

**Example Attribution:**
```
Top Contributors (YTD)
1. NVDA         +$245,000   (+3.2% contribution)
2. Private Fund  +$180,000   (+2.4% contribution)
3. AAPL         +$95,000    (+1.2% contribution)

Bottom Contributors (YTD)
1. Real Estate A  -$45,000   (-0.6% contribution)
2. Hedge Fund X   -$32,000   (-0.4% contribution)
```

**Why This Matters:**
Headline returns hide the story. Attribution answers: "What actually moved the needle?"

---

### 4. Risk Snapshot

Translates portfolio complexity into simple, actionable risk metrics.

**Concentration Risk:**
- What percentage is in your top 5 holdings?
- Is any single position too large (>10% = caution, >20% = warning)?

**Liquidity Risk:**
- What percentage can you sell tomorrow vs. locked up for years?
- Could you meet a large capital call or unexpected need?

**Visual Indicators:**
| Metric | Green (Healthy) | Amber (Caution) | Red (Warning) |
|--------|-----------------|-----------------|---------------|
| Top 5 Concentration | <30% | 30-50% | >50% |
| Single Position | <10% | 10-20% | >20% |
| Illiquid Exposure | <40% | 40-60% | >60% |

**Why This Matters:**
Returns look great until concentration blows up. This section surfaces hidden risks.

---

### 5. Macro Overlay

Provides economic context without overwhelming the portfolio view.

**Indicators Tracked:**
| Indicator | Source | What It Tells You |
|-----------|--------|-------------------|
| Fed Funds Rate | Federal Reserve | Cost of borrowing, policy direction |
| 10-Year Treasury Yield | Treasury.gov | Long-term rate expectations, bond competition |
| CPI (Year-over-Year) | Bureau of Labor Statistics | Inflation eroding purchasing power |

**Display Format:**
- Current value
- 30-day change
- 6-month sparkline (mini chart)
- Historical context (where in 10-year range?)

**Why This Matters:**
Portfolio performance doesn't happen in a vacuum. Rising rates affect valuations. Inflation affects real returns. This section frames the "so what?"

---

## Technical Architecture

### Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | Next.js 15 | The user interface you see in the browser |
| Styling | Tailwind CSS | Makes things look good without writing custom CSS |
| Database | Supabase (PostgreSQL) | Stores all portfolio data in the cloud |
| ORM | Drizzle | Translates between code and database (so we don't write raw SQL) |
| Authentication | Clerk | Handles login/logout securely |
| Hosting | Vercel | Runs the application on the internet |
| Charts | Recharts or Nivo | Creates the visual charts and graphs |

### What is Each Thing?

**Next.js**: A framework for building web applications. Think of it as a pre-built foundation for a house - you don't start from scratch.

**Supabase**: A cloud database. Instead of storing data on your computer (which would only work for you), it's stored on servers that anyone with permission can access from anywhere.

**Drizzle ORM**: "ORM" stands for Object-Relational Mapping. It lets us write code like `getHoldings()` instead of complex database commands like `SELECT * FROM holdings WHERE portfolio_id = 1`.

**Clerk**: Authentication service. Building secure login from scratch is dangerous (easy to make security mistakes). Clerk handles passwords, sessions, and security for us.

**Vercel**: Hosting platform. When you visit the website, Vercel's servers respond. It automatically deploys new versions when we push code.

---

## Data Model Overview

### Core Entities

```
PORTFOLIO
    └── Has many HOLDINGS
            └── Belongs to an ASSET CLASS
            └── Has many PERFORMANCE SNAPSHOTS
            └── Has many TRANSACTIONS

PORTFOLIO
    └── Has many DEBT ITEMS

MACRO INDICATORS (global, not per-portfolio)
```

### Data Flow

1. **Holdings** are entered (manually or CSV import)
2. **Valuations** are updated (daily for public, quarterly for private)
3. **Performance snapshots** are calculated and stored
4. **Dashboard** reads and displays aggregated data
5. **Macro data** is fetched from external APIs automatically

---

## Data Entry Strategy

### Phase 1: Mock Data
We'll create realistic sample data to build and test the dashboard.

### Phase 2: CSV Import (Public Equities)
Upload a spreadsheet exported from your brokerage to bulk-import public holdings.

### Phase 3: Manual Entry (Private & Real Estate)
Form-based entry for:
- Private fund investments (name, vintage, committed capital, current value)
- Real estate (property address, purchase price, current value, debt)
- Debt items (type, balance, rate, lender)

### Future: API Integrations
Eventually could connect to:
- Brokerage APIs (Schwab, Fidelity)
- Accounting systems
- Real estate valuation services

---

## Key Design Principles

### 1. Decision-Oriented, Not Data-Oriented
Every element should answer a question or support a decision. No data for data's sake.

### 2. Appropriate Precision
- Public equities: Daily prices (available and meaningful)
- Private investments: Quarterly values (that's all we get)
- Real estate: Annual or semi-annual (valuations are estimates anyway)

### 3. Risk Awareness Built-In
Don't just show what's happening - surface what could go wrong.

### 4. Macro Context, Not Macro Trading
We observe macro conditions; we don't try to predict or trade them.

### 5. Clean, Professional Interface
Dark theme, minimal clutter, financial precision aesthetic.

---

## Scope Boundaries

### In Scope (Building Now)
- Asset allocation visualization
- Performance tracking (2025 onward)
- Risk concentration metrics
- Liquidity analysis
- Debt tracking
- Macro indicators display
- Single portfolio view

### Out of Scope (Future Enhancements)
- Multi-portfolio / multi-family support
- Scenario analysis ("what if rates rise?")
- Rebalancing recommendations
- Document storage (K-1s, statements)
- Multi-currency support
- Benchmarking vs indices
- Tax lot tracking
- Capital call management

---

## Success Criteria

The dashboard is successful when a user can:

1. **See allocation in 5 seconds**: Glance at donut chart, understand capital deployment
2. **Identify performance drivers in 30 seconds**: See top/bottom contributors
3. **Assess risk in 1 minute**: Understand concentration and liquidity exposure
4. **Get macro context in 30 seconds**: See where rates and inflation stand
5. **Trust the data**: Clear "last updated" timestamps, valuation dates on private assets

---

## Glossary

| Term | Definition |
|------|------------|
| **Asset Class** | A category of investments with similar characteristics (stocks, bonds, real estate, etc.) |
| **Attribution** | Breaking down total return into contributions from individual holdings |
| **Concentration** | Having too much exposure to a single investment or small group |
| **Liquidity** | How quickly an asset can be converted to cash without significant loss |
| **Illiquid** | Assets that cannot be easily sold (private equity, real estate) |
| **YTD** | Year-to-Date: performance from January 1 to today |
| **TWR** | Time-Weighted Return: a way to calculate returns that removes the effect of cash flows |
| **Basis** | The original cost of an investment (used to calculate gains/losses) |
| **NAV** | Net Asset Value: the current value of an investment (especially for funds) |
| **Vintage Year** | The year a private fund started investing (important for PE/VC) |
| **Margin Loan** | Borrowing money from your broker using your portfolio as collateral |
| **SLOC** | Securities-Based Line of Credit: a loan secured by your investment portfolio |

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| 2025-02-02 | Claude + Seth | Initial project documentation |
