import { RedirectToast } from "@/components/payments/redirect-toast"
import { Footer } from "./_components/footer"
import { HeaderWrapper } from "./_components/header-wrapper"
import { ScrollIndicator } from "./_components/scroll-indicator"

export default async function MarketingLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <HeaderWrapper />
      {children}
      <Footer />
      <ScrollIndicator />
      <RedirectToast />
    </div>
  )
}
