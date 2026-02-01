"use client"

import { Badge } from "@/components/ui/badge"
import { SelectAsset } from "@/db/schema/assets"
import { motion } from "framer-motion"
import {
  ArrowDownRight,
  ArrowUpRight,
  Coins,
  DollarSign,
  Gem,
  TrendingUp
} from "lucide-react"
import { SectionWrapper } from "./section-wrapper"

interface HeroSectionProps {
  assets: SelectAsset[]
}

const categoryColors = {
  crypto: "from-orange-500 to-yellow-500",
  stock: "from-blue-500 to-cyan-500",
  commodity: "from-amber-500 to-orange-500",
  forex: "from-green-500 to-emerald-500"
}

const categoryIcons = {
  crypto: <Gem className="size-5" />,
  stock: <TrendingUp className="size-5" />,
  commodity: <DollarSign className="size-5" />,
  forex: <Coins className="size-5" />
}

function AssetRow({ asset, index }: { asset: SelectAsset; index: number }) {
  const change = parseFloat(asset.change24h)
  const isPositive = change >= 0
  const price = parseFloat(asset.price)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex items-center justify-between border-b border-white/5 px-4 py-4 transition-colors duration-300 hover:bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className={`flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${categoryColors[asset.category]} text-white shadow-lg`}
            >
              {categoryIcons[asset.category]}
            </div>
            <motion.div
              className={`absolute -right-0.5 -top-0.5 size-2.5 rounded-full ${isPositive ? "bg-green-400" : "bg-red-400"}`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{asset.name}</span>
              <Badge
                variant="outline"
                className="border-white/10 bg-white/5 text-[10px] text-white/50"
              >
                {asset.symbol}
              </Badge>
            </div>
            <div className="text-xs text-white/40">Vol: {asset.volume}</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <motion.div
            className="text-right"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="font-mono text-lg font-semibold text-white">
              ${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </motion.div>

          <div
            className={`flex items-center gap-1 rounded-lg px-3 py-1.5 ${
              isPositive
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="size-4" />
            ) : (
              <ArrowDownRight className="size-4" />
            )}
            <span className="font-mono text-sm font-medium">
              {isPositive ? "+" : ""}
              {change.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function HeroSection({ assets }: HeroSectionProps) {
  return (
    <SectionWrapper className="relative min-h-screen overflow-hidden py-8 sm:py-16">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-1/4 -top-1/4 size-[800px] rounded-full bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 size-[600px] rounded-full bg-gradient-to-tl from-cyan-600/20 via-blue-600/10 to-transparent blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-green-600/10 via-emerald-600/5 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="size-2 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm text-white/70">Live Market Data</span>
          </motion.div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Top Performing
            </span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Global Assets
            </motion.span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-white/50">
            Track the hottest assets across crypto, stocks, and commodities.
            Real-time data. Zero noise.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="mb-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { label: "Total Market Cap", value: "$3.2T" },
            { label: "24h Volume", value: "$142B" },
            { label: "Active Assets", value: "12,847" }
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <motion.div
                className="font-mono text-2xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs uppercase tracking-wider text-white/40">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main watchlist card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Card header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-red-500/80" />
                <div className="size-3 rounded-full bg-yellow-500/80" />
                <div className="size-3 rounded-full bg-green-500/80" />
              </div>
              <span className="font-medium text-white/80">
                Top Performers (24h)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-green-500/30 bg-green-500/10 text-green-400"
              >
                <motion.div
                  className="mr-1 size-1.5 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                Live
              </Badge>
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-2 border-b border-white/5 px-4 py-3 text-xs uppercase tracking-wider text-white/30 sm:grid-cols-3">
            <div>Asset</div>
            <div className="hidden text-right sm:block">Volume</div>
            <div className="text-right">Price / Change</div>
          </div>

          {/* Asset rows */}
          <div className="divide-y divide-white/5">
            {assets.map((asset, index) => (
              <AssetRow key={asset.id} asset={asset} index={index} />
            ))}
          </div>

          {/* Card footer */}
          <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
            <span className="text-sm text-white/40">
              Showing top {assets.length} by 24h performance
            </span>
            <motion.button
              className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Markets
              <ArrowUpRight className="size-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom trust indicators */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {["Real-Time Data", "Multi-Asset Coverage", "Institutional Grade"].map(
            (text) => (
              <div key={text} className="flex items-center gap-2 text-sm">
                <div className="size-1.5 rounded-full bg-indigo-500/50" />
                {text}
              </div>
            )
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
