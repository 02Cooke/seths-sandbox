import { getTopAssets } from "@/actions/assets"
import { HeroSection } from "./_components/sections/hero-section"

export default async function MarketingPage() {
  const assets = await getTopAssets(8)

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <HeroSection assets={assets} />
    </main>
  )
}
