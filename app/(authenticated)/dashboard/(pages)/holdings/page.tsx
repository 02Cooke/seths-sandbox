import { getHoldingsWithReturns, getPortfolioSummary } from "@/actions/portfolio"
import { HoldingsTable } from "./_components/holdings-table"

export const dynamic = "force-dynamic"

export default async function HoldingsPage() {
  const holdings = await getHoldingsWithReturns()
  const summary = await getPortfolioSummary()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Holdings</h1>
        <p className="text-muted-foreground">
          All positions in your portfolio
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Total Holdings</div>
          <div className="mt-1 text-2xl font-bold">{holdings.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Gross Assets</div>
          <div className="mt-1 text-2xl font-bold">
            ${summary.grossAssets.toLocaleString()}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Total Cost Basis</div>
          <div className="mt-1 text-2xl font-bold">
            ${holdings.reduce((sum, h) => sum + h.costBasis, 0).toLocaleString()}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Unrealized Gain</div>
          <div className={`mt-1 text-2xl font-bold ${
            holdings.reduce((sum, h) => sum + h.unrealizedGain, 0) >= 0
              ? "text-green-500"
              : "text-red-500"
          }`}>
            {holdings.reduce((sum, h) => sum + h.unrealizedGain, 0) >= 0 ? "+" : ""}
            ${holdings.reduce((sum, h) => sum + h.unrealizedGain, 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <HoldingsTable holdings={holdings} totalValue={summary.grossAssets} />
    </div>
  )
}
