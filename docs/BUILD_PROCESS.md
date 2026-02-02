# Build Process - Family Office Asset Command Center

This document outlines the step-by-step process to build the Command Center. Each phase builds on the previous one.

---

## How to Read This Document

Each phase includes:
- **Goal**: What we're trying to accomplish
- **What Gets Built**: Specific deliverables
- **Technical Concepts**: Terms explained for beginners
- **Steps**: What Claude will do
- **Checkpoint**: How you'll know it worked

---

## Phase 0: Documentation (Current)

### Goal
Create clear documentation before writing any code.

### What Gets Built
- `docs/PROJECT.md` - Complete project description ✓
- `docs/BUILD_PROCESS.md` - This file ✓

### Why This Matters
Documentation prevents scope creep, keeps everyone aligned, and serves as a reference when questions arise later.

### Checkpoint
- [ ] PROJECT.md reviewed and approved
- [ ] BUILD_PROCESS.md reviewed and approved

---

## Phase 1: Database Foundation

### Goal
Create the database structure (tables) that will store all portfolio data.

### What Gets Built

**New Database Tables:**

1. **portfolios** - The top-level container
   ```
   - id: unique identifier
   - name: "Family Office Portfolio"
   - created_at: when it was created
   ```

2. **asset_classes** - Categories for holdings
   ```
   - id: unique identifier
   - name: "Public Equities", "Private Investments", etc.
   - liquidity_type: "liquid", "semi-liquid", or "illiquid"
   - display_order: what order to show them
   - color: for consistent chart colors
   ```

3. **holdings** - Individual investments
   ```
   - id: unique identifier
   - portfolio_id: which portfolio this belongs to
   - asset_class_id: which category
   - name: "Apple Inc." or "Blackstone Fund IX"
   - ticker: "AAPL" (null for private investments)
   - current_value: what it's worth today
   - cost_basis: what you paid for it
   - shares: number of shares (null for funds)
   - acquisition_date: when purchased
   - is_private: true/false
   - valuation_date: when this value was last updated
   - notes: any additional context
   ```

4. **debt_items** - Money owed
   ```
   - id: unique identifier
   - portfolio_id: which portfolio
   - name: "Schwab Margin Loan"
   - debt_type: "margin", "loc", "mortgage", "other"
   - balance: current amount owed
   - interest_rate: annual rate (e.g., 6.5)
   - lender: "Charles Schwab"
   - notes: additional context
   ```

5. **performance_snapshots** - Historical value tracking
   ```
   - id: unique identifier
   - holding_id: which holding
   - date: snapshot date
   - value: value on that date
   - created_at: when this record was created
   ```

6. **macro_indicators** - Economic data
   ```
   - id: unique identifier
   - indicator_name: "fed_funds", "treasury_10y", "cpi_yoy"
   - value: the number (e.g., 5.25)
   - date: when this reading was taken
   - source: "FRED" or "BLS"
   ```

### Technical Concepts Explained

**Database Table**: Think of it like a spreadsheet. The table name is like the sheet name, columns are like column headers, and each row is a record (one holding, one debt item, etc.).

**Primary Key (id)**: A unique identifier for each row. Like a Social Security Number for data - no two rows can have the same one.

**Foreign Key (portfolio_id, asset_class_id)**: A reference to another table. When a holding has `portfolio_id: 1`, it means "this holding belongs to portfolio #1."

**Schema**: The complete blueprint of all tables, their columns, and how they relate to each other.

**Migration**: A versioned change to the database structure. If we need to add a column later, we create a migration so the change is tracked and can be undone if needed.

### Steps
1. Create schema files in `db/schema/` folder
2. Update database index to include new schemas
3. Run `npx drizzle-kit push` to create tables in Supabase
4. Verify tables exist in Supabase dashboard

### Checkpoint
- [ ] All 6 tables visible in Supabase dashboard
- [ ] Tables have correct columns
- [ ] No errors when connecting to database

---

## Phase 2: Mock Data Seeding

### Goal
Populate the database with realistic sample data so we can build and test the dashboard.

### What Gets Built

**Sample Portfolio with ~20 Holdings:**

| Asset Class | Holdings | Values |
|-------------|----------|--------|
| Public Equities | AAPL, NVDA, MSFT, GOOGL, VTI, BND | $3.2M total |
| Private Investments | Blackstone Fund, Sequoia Capital, Direct Investment | $2.1M total |
| Real Estate | 123 Main St (Rental), REIT Fund | $1.8M total |
| Cash & Equivalents | Money Market, T-Bills, Checking | $800K total |
| Alternatives | Hedge Fund, Gold ETF | $600K total |

**Sample Debt:**
| Debt Type | Balance | Rate |
|-----------|---------|------|
| Schwab Margin Loan | $400K | 6.5% |
| Bank Line of Credit | $200K | 7.0% |

**Total Portfolio: ~$8.5M with $600K debt**

**Performance History:**
- Monthly snapshots from January 2025 → Present
- Realistic gains/losses per holding

**Macro Data:**
- Fed Funds, 10Y Treasury, CPI readings for 2025

### Technical Concepts Explained

**Seeding**: The process of inserting initial data into empty tables. Like filling in a template with sample values.

**Seed File**: A script that runs once to populate the database. Located in `db/seed/` folder.

### Steps
1. Create seed data files for each table
2. Update seed script to insert all data
3. Run `npx bun db/seed` to populate database
4. Verify data in Supabase dashboard

### Checkpoint
- [ ] 20 holdings visible in `holdings` table
- [ ] 2 debt items visible in `debt_items` table
- [ ] Performance snapshots for each holding
- [ ] Macro indicators populated

---

## Phase 3: Server Actions & Data Access

### Goal
Create the code that fetches data from the database and calculates metrics.

### What Gets Built

**Server Actions** (in `actions/` folder):

1. **Portfolio Actions**
   - `getPortfolio()` - Get portfolio details
   - `getPortfolioSummary()` - Get total value, debt, net worth

2. **Allocation Actions**
   - `getAllocation()` - Get breakdown by asset class
   - `getAllocationHistory()` - Get quarterly changes

3. **Holdings Actions**
   - `getHoldings()` - Get all holdings
   - `getHoldingsByAssetClass()` - Filter by category
   - `getTopHoldings()` - Largest positions

4. **Performance Actions**
   - `getPerformance()` - Calculate returns for time periods
   - `getAttribution()` - Top/bottom contributors
   - `getPerformanceHistory()` - Monthly return series

5. **Risk Actions**
   - `getConcentration()` - Top 5 holdings analysis
   - `getLiquidityProfile()` - Liquid vs illiquid breakdown

6. **Debt Actions**
   - `getDebtSummary()` - Total debt, by type
   - `getNetLiquidity()` - Cash minus debt

7. **Macro Actions**
   - `getMacroIndicators()` - Current readings
   - `getMacroHistory()` - Historical values for charts

### Technical Concepts Explained

**Server Action**: A function that runs on the server (Vercel), not in the user's browser. This is important for security - the user's browser never directly touches the database.

**"use server"**: A special directive at the top of a file that tells Next.js "run this code on the server only."

**async/await**: A way to handle operations that take time (like database queries). The code "waits" for the result before continuing.

Example:
```typescript
// This is a server action
"use server"

export async function getHoldings() {
  // "await" means "wait for this to finish"
  const holdings = await db.select().from(holdingsTable)
  return holdings
}
```

### Steps
1. Create action files for each domain (portfolio, holdings, etc.)
2. Implement database queries using Drizzle
3. Add calculation logic for derived metrics
4. Test actions by calling them from a test page

### Checkpoint
- [ ] All actions return correct data
- [ ] Performance calculations match manual verification
- [ ] Risk metrics calculate correctly
- [ ] No database errors

---

## Phase 4: Dashboard Layout & Navigation

### Goal
Create the basic page structure and navigation for the dashboard.

### What Gets Built

**New Pages:**
- `/dashboard` - Main command center view (replaces current dashboard)
- `/dashboard/holdings` - Detailed holdings list
- `/dashboard/performance` - Detailed performance analysis
- `/dashboard/settings` - Portfolio settings

**Layout Structure:**
```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Portfolio Name | Last Updated | User Menu          │
├──────────────┬──────────────────────────────────────────────┤
│  SIDEBAR     │  MAIN CONTENT AREA                           │
│  - Overview  │                                              │
│  - Holdings  │  (Dashboard panels go here)                  │
│  - Perform.  │                                              │
│  - Settings  │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

### Technical Concepts Explained

**Layout**: A wrapper component that surrounds page content. The sidebar and header stay constant while the main content changes as you navigate.

**Route**: The URL path. `/dashboard` is a route, `/dashboard/holdings` is another route.

**Component**: A reusable piece of UI. We build small components (buttons, cards) and combine them into bigger ones (panels, pages).

### Steps
1. Update existing dashboard layout for new design
2. Create navigation sidebar with links
3. Create placeholder pages for each route
4. Add header with portfolio selector and timestamps
5. Apply dark theme styling throughout

### Checkpoint
- [ ] Can navigate between all pages
- [ ] Sidebar highlights current page
- [ ] Layout is responsive (works on different screen sizes)
- [ ] Dark theme applied consistently

---

## Phase 5: Asset Allocation Panel

### Goal
Build the primary allocation visualization - the donut chart and breakdown cards.

### What Gets Built

**Components:**
1. **AllocationDonut** - Interactive donut chart showing percentages
2. **AssetClassCard** - Card for each asset class with value, %, change
3. **AllocationPanel** - Container combining chart and cards
4. **HoldingsModal** - Popup showing holdings when you click an asset class

**Features:**
- Donut chart with hover tooltips
- Click asset class segment → see underlying holdings
- Quarterly change indicators (▲ or ▼)
- Color-coded by asset class

### Technical Concepts Explained

**Recharts**: A library for building charts in React. Instead of drawing charts from scratch, we use pre-built components like `<PieChart>` and `<Cell>`.

**useState**: A React "hook" that lets components remember things. When you hover over a chart segment, useState remembers which one is hovered.

**Modal**: A popup window that appears over the page. Used to show details without navigating away.

### Steps
1. Install Recharts library (`npm install recharts`)
2. Create AllocationDonut component
3. Create AssetClassCard component
4. Combine into AllocationPanel
5. Add click-to-drill-down functionality
6. Wire up to real data from server actions

### Checkpoint
- [ ] Donut chart displays with correct percentages
- [ ] Clicking segments shows holdings
- [ ] Cards show accurate values
- [ ] Quarterly changes display correctly

---

## Phase 6: Liquidity & Debt Panel

### Goal
Build the cash/debt visualization showing net liquidity position.

### What Gets Built

**Components:**
1. **LiquidityCard** - Shows cash, debt, and net position
2. **DebtBreakdown** - Lists individual debt items
3. **LiquidityBar** - Visual bar showing liquid vs illiquid split

**Metrics Displayed:**
- Cash & Equivalents total
- Total Debt
- Net Liquidity (Cash - Debt)
- Debt-to-Assets Ratio
- Individual debt items with rates

### Steps
1. Create LiquidityCard component
2. Create DebtBreakdown component
3. Create LiquidityBar visualization
4. Combine into panel
5. Wire up to debt and holdings data

### Checkpoint
- [ ] Cash total is correct
- [ ] Debt total is correct
- [ ] Net liquidity calculates correctly
- [ ] Individual debt items display with rates

---

## Phase 7: Performance Panel

### Goal
Build performance tracking with attribution analysis.

### What Gets Built

**Components:**
1. **PerformanceSummary** - Cards for YTD, 1Y, Inception returns
2. **PerformanceChart** - Monthly return bar chart
3. **AttributionTable** - Top/bottom contributors
4. **TimePeriodSelector** - Toggle between time periods

**Calculations:**
- Time-weighted returns (proper methodology)
- Dollar contribution per holding
- Percentage contribution per holding

### Technical Concepts Explained

**Time-Weighted Return (TWR)**: A calculation method that removes the impact of deposits/withdrawals. If you add $1M mid-year, TWR calculates the return as if that money was always there.

**Attribution**: Breaking total return into pieces. If the portfolio returned 10%, attribution shows that 4% came from NVDA, 3% from Apple, etc.

### Steps
1. Implement TWR calculation in server action
2. Implement attribution calculation
3. Create PerformanceSummary cards
4. Create PerformanceChart with Recharts
5. Create AttributionTable component
6. Add time period toggling

### Checkpoint
- [ ] Returns match manual calculation
- [ ] Attribution sums to total return
- [ ] Chart displays monthly bars
- [ ] Time period toggle works

---

## Phase 8: Risk Snapshot Panel

### Goal
Build risk metrics visualization with concentration and liquidity analysis.

### What Gets Built

**Components:**
1. **ConcentrationCard** - Top 5 holdings percentage
2. **ConcentrationTreemap** - Visual showing position sizes
3. **LiquidityProfile** - Liquid/semi/illiquid breakdown
4. **RiskAlerts** - Warning indicators when thresholds exceeded

**Risk Thresholds:**
| Metric | Green | Amber | Red |
|--------|-------|-------|-----|
| Top 5 Concentration | <30% | 30-50% | >50% |
| Single Position | <10% | 10-20% | >20% |
| Illiquid Exposure | <40% | 40-60% | >60% |

### Technical Concepts Explained

**Treemap**: A chart where each item is a rectangle sized by its value. Bigger rectangles = bigger positions. Makes concentration visually obvious.

**Threshold**: A boundary that triggers different behavior. Below 30% = green, above = amber. Simple rules that highlight when attention is needed.

### Steps
1. Implement concentration calculation
2. Implement liquidity classification
3. Create ConcentrationCard component
4. Create Treemap visualization
5. Create LiquidityProfile bar
6. Add color-coded threshold alerts

### Checkpoint
- [ ] Top 5 percentage is correct
- [ ] Treemap sizes match values
- [ ] Liquidity breakdown is accurate
- [ ] Colors change at thresholds

---

## Phase 9: Macro Overlay Panel

### Goal
Display economic indicators with historical context.

### What Gets Built

**Components:**
1. **MacroCard** - Individual indicator display
2. **MacroSparkline** - Mini 6-month chart
3. **MacroPanel** - Container for all indicators

**Data Integration:**
- FRED API for Fed Funds and Treasury rates
- BLS API for CPI
- Daily update schedule

### Technical Concepts Explained

**API (Application Programming Interface)**: A way for our app to request data from external services. We send a request to FRED, they send back the current Fed Funds rate.

**Cron Job**: A scheduled task that runs automatically. We'll set up a job that fetches macro data once per day.

**Environment Variable**: A secret value (like an API key) stored outside the code. This way, the key isn't visible in GitHub.

### Steps
1. Sign up for FRED API key (free)
2. Create macro data fetching function
3. Store macro data in database
4. Create MacroCard component
5. Create sparkline visualization
6. Set up daily data refresh

### Checkpoint
- [ ] Macro data displays correctly
- [ ] Sparklines show 6-month history
- [ ] Data updates daily
- [ ] Change indicators are accurate

---

## Phase 10: Integration & Polish

### Goal
Combine all panels into final dashboard and polish the experience.

### What Gets Built

**Final Dashboard Assembly:**
- All panels arranged in grid layout
- Responsive design for different screens
- Loading states while data fetches
- Error handling for failed requests

**Additional Features:**
- "Last Updated" timestamp in header
- Print/Export to PDF button
- Refresh data button
- Settings page for preferences

### Technical Concepts Explained

**Loading State**: What the user sees while data is being fetched. Usually a spinner or skeleton placeholder.

**Error Boundary**: A safety net that catches errors and shows a friendly message instead of breaking the whole page.

**Responsive Design**: Making the layout adapt to different screen sizes (desktop, tablet, phone).

### Steps
1. Arrange all panels in main dashboard grid
2. Add loading states for each panel
3. Implement error handling
4. Create print/PDF export
5. Test on different screen sizes
6. Performance optimization

### Checkpoint
- [ ] All panels visible on dashboard
- [ ] Loading states appear correctly
- [ ] Errors handled gracefully
- [ ] Works on desktop and tablet
- [ ] Page loads in under 3 seconds

---

## Phase 11: Data Entry (Future)

### Goal
Enable real data to replace mock data.

### What Gets Built

**CSV Import for Public Equities:**
- Upload CSV from brokerage export
- Map columns to database fields
- Preview before import
- Handle duplicates

**Manual Entry Forms:**
- Add/edit private investments
- Add/edit real estate
- Add/edit debt items

### Steps
1. Create CSV upload component
2. Build column mapping interface
3. Create import preview
4. Build manual entry forms
5. Add edit/delete capabilities

### Checkpoint
- [ ] Can upload and import CSV
- [ ] Manual entry works for all types
- [ ] Can edit existing holdings
- [ ] Can delete holdings

---

## Development Workflow

### How Changes Get Made

1. **Claude writes code** in your sandbox
2. **You review** the changes (Claude explains what was done)
3. **Test locally** using `npm run dev`
4. **Commit to GitHub** using git commands
5. **Vercel auto-deploys** to your live site

### Commands You'll See

| Command | What It Does |
|---------|--------------|
| `npm run dev` | Starts local development server (view at localhost:3000) |
| `npm run build` | Creates production version (tests if it will work on Vercel) |
| `npm run lint` | Checks code for errors |
| `npx drizzle-kit push` | Updates database tables to match schema |
| `npx bun db/seed` | Runs the seed script to populate data |
| `git add .` | Stages all changes for commit |
| `git commit -m "message"` | Saves changes with a description |
| `git push origin main` | Uploads changes to GitHub → triggers Vercel deploy |

---

## Timeline Estimate

| Phase | Description | Estimated Effort |
|-------|-------------|------------------|
| 0 | Documentation | ✓ Complete |
| 1 | Database Foundation | 1 session |
| 2 | Mock Data | 1 session |
| 3 | Server Actions | 1-2 sessions |
| 4 | Layout & Nav | 1 session |
| 5 | Allocation Panel | 1-2 sessions |
| 6 | Liquidity & Debt | 1 session |
| 7 | Performance Panel | 2 sessions |
| 8 | Risk Panel | 1-2 sessions |
| 9 | Macro Panel | 1 session |
| 10 | Integration | 1-2 sessions |

**Total: ~12-15 work sessions**

---

## Questions to Ask During Build

If something doesn't make sense, ask:
- "What does [term] mean?"
- "Why did you do it that way?"
- "Can you explain what this code does?"
- "What would happen if [scenario]?"

Learning is part of the process!

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| 2025-02-02 | Claude + Seth | Initial build process documentation |
