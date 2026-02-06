"use client"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowDown, ArrowUp, ArrowUpDown, Lock } from "lucide-react"
import { useState } from "react"

type Holding = {
  id: string
  name: string
  ticker: string | null
  currentValue: number
  costBasis: number
  shares: number | null
  isPrivate: boolean
  valuationDate: string | null
  notes: string | null
  assetClassName: string
  assetClassColor: string
  liquidityType: string
  ytdReturn: number | null
  totalReturn: number | null
  unrealizedGain: number
}

type SortField = "name" | "currentValue" | "costBasis" | "ytdReturn" | "totalReturn" | "unrealizedGain"
type SortDirection = "asc" | "desc"

interface HoldingsTableProps {
  holdings: Holding[]
  totalValue: number
}

export function HoldingsTable({ holdings, totalValue }: HoldingsTableProps) {
  const [sortField, setSortField] = useState<SortField>("currentValue")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedHoldings = [...holdings].sort((a, b) => {
    let aVal = a[sortField]
    let bVal = b[sortField]

    // Handle null values
    if (aVal === null) aVal = sortDirection === "asc" ? Infinity : -Infinity
    if (bVal === null) bVal = sortDirection === "asc" ? Infinity : -Infinity

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }

    return sortDirection === "asc"
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number)
  })

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead
      className="cursor-pointer select-none hover:bg-muted/50"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field ? (
          sortDirection === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )
        ) : (
          <ArrowUpDown className="h-4 w-4 opacity-30" />
        )}
      </div>
    </TableHead>
  )

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercent = (value: number | null) => {
    if (value === null) return "—"
    const sign = value >= 0 ? "+" : ""
    return `${sign}${value.toFixed(2)}%`
  }

  const getReturnColor = (value: number | null) => {
    if (value === null) return "text-muted-foreground"
    return value >= 0 ? "text-green-500" : "text-red-500"
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader field="name">Name</SortableHeader>
            <TableHead>Asset Class</TableHead>
            <SortableHeader field="currentValue">Value</SortableHeader>
            <TableHead className="text-right">Weight</TableHead>
            <SortableHeader field="costBasis">Cost Basis</SortableHeader>
            <SortableHeader field="ytdReturn">YTD</SortableHeader>
            <SortableHeader field="totalReturn">Total Return</SortableHeader>
            <SortableHeader field="unrealizedGain">Gain/Loss</SortableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedHoldings.map((holding) => (
            <TableRow key={holding.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-medium flex items-center gap-1">
                      {holding.name}
                      {holding.isPrivate && (
                        <Lock className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    {holding.ticker && (
                      <div className="text-sm text-muted-foreground">
                        {holding.ticker}
                        {holding.shares && ` • ${holding.shares.toLocaleString()} shares`}
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  style={{
                    borderColor: holding.assetClassColor,
                    color: holding.assetClassColor,
                  }}
                >
                  {holding.assetClassName}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">
                {formatCurrency(holding.currentValue)}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {((holding.currentValue / totalValue) * 100).toFixed(1)}%
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatCurrency(holding.costBasis)}
              </TableCell>
              <TableCell className={getReturnColor(holding.ytdReturn)}>
                {formatPercent(holding.ytdReturn)}
              </TableCell>
              <TableCell className={getReturnColor(holding.totalReturn)}>
                {formatPercent(holding.totalReturn)}
              </TableCell>
              <TableCell className={getReturnColor(holding.unrealizedGain)}>
                {holding.unrealizedGain >= 0 ? "+" : ""}
                {formatCurrency(holding.unrealizedGain)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
