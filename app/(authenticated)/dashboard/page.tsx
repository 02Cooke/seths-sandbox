import { getTopAssets } from "@/actions/assets"
import { Badge } from "@/components/ui/badge"
import {
  ArrowDownRight,
  ArrowUpRight,
  Gem,
  DollarSign,
  TrendingUp
} from "lucide-react"

const categoryColors = {
  crypto: "from-orange-500 to-yellow-500",
  stock: "from-blue-500 to-cyan-500",
  commodity: "from-amber-500 to-orange-500",
  forex: "from-green-500 to-emerald-500"
}

const categoryIcons = {
  crypto: <Gem className="size-4" />,
  stock: <TrendingUp className="size-4" />,
  commodity: <DollarSign className="size-4" />,
  forex: <DollarSign className="size-4" />
}

export default async function DashboardPage() {
  const assets = await getTopAssets(15)

  const totalMarketCap = assets.reduce((acc, asset) => {
    const cap = asset.marketCap?.replace(/[$T,B,M]/g, "") || "0"
    return acc + parseFloat(cap)
  }, 0)

  const avgChange =
    assets.reduce((acc, asset) => acc + parseFloat(asset.change24h), 0) /
    assets.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Markets</h1>
        <p className="text-muted-foreground mt-2">
          Track top performing assets across all markets
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Total Assets
          </div>
          <div className="mt-2 text-3xl font-bold">{assets.length}</div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Avg 24h Change
          </div>
          <div
            className={`mt-2 flex items-center gap-2 text-3xl font-bold ${avgChange >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {avgChange >= 0 ? (
              <ArrowUpRight className="size-6" />
            ) : (
              <ArrowDownRight className="size-6" />
            )}
            {avgChange.toFixed(2)}%
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Market Status
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="size-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-xl font-semibold">Live</span>
          </div>
        </div>
      </div>

      {/* Assets Table */}
      <div className="rounded-xl border bg-card">
        <div className="border-b px-6 py-4">
          <h2 className="font-semibold">All Assets</h2>
        </div>
        <div className="divide-y">
          {assets.map((asset) => {
            const change = parseFloat(asset.change24h)
            const isPositive = change >= 0
            const price = parseFloat(asset.price)

            return (
              <div
                key={asset.id}
                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center text-muted-foreground">
                    <span className="w-6 text-sm">{asset.rank}</span>
                  </div>
                  <div
                    className={`flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${categoryColors[asset.category]} text-white`}
                  >
                    {categoryIcons[asset.category]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{asset.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {asset.symbol}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {asset.category.charAt(0).toUpperCase() +
                        asset.category.slice(1)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Volume</div>
                    <div className="font-medium">{asset.volume}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      Market Cap
                    </div>
                    <div className="font-medium">{asset.marketCap || "-"}</div>
                  </div>
                  <div className="w-32 text-right">
                    <div className="font-mono text-lg font-semibold">
                      $
                      {price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </div>
                    <div
                      className={`flex items-center justify-end gap-1 text-sm ${
                        isPositive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {isPositive ? (
                        <ArrowUpRight className="size-3" />
                      ) : (
                        <ArrowDownRight className="size-3" />
                      )}
                      {isPositive ? "+" : ""}
                      {change.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
