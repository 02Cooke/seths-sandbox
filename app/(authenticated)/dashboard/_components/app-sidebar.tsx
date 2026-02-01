"use client"

import {
  BarChart3,
  Bell,
  Briefcase,
  LineChart,
  Settings2,
  Star,
  TrendingUp,
  Wallet
} from "lucide-react"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar"
import { NavMain } from "../_components/nav-main"
import { NavUser } from "../_components/nav-user"
import { TeamSwitcher } from "../_components/team-switcher"

export function AppSidebar({
  userData,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  userData: {
    name: string
    email: string
    avatar: string
    membership: string
  }
}) {
  const data = {
    user: userData,
    teams: [
      {
        name: "AlphaWatch",
        logo: TrendingUp,
        plan: userData.membership === "pro" ? "Pro" : "Free"
      }
    ],
    navMain: [
      {
        title: "Markets",
        url: "#",
        icon: LineChart,
        items: [
          {
            title: "All Assets",
            url: "/dashboard"
          },
          {
            title: "Crypto",
            url: "/dashboard/crypto"
          },
          {
            title: "Stocks",
            url: "/dashboard/stocks"
          },
          {
            title: "Commodities",
            url: "/dashboard/commodities"
          }
        ]
      },
      {
        title: "Portfolio",
        url: "#",
        icon: Briefcase,
        items: [
          {
            title: "Holdings",
            url: "/dashboard/holdings"
          },
          {
            title: "Performance",
            url: "/dashboard/performance"
          }
        ]
      },
      {
        title: "Watchlists",
        url: "#",
        icon: Star,
        items: [
          {
            title: "My Watchlist",
            url: "/dashboard/watchlist"
          },
          {
            title: "Top Gainers",
            url: "/dashboard/gainers"
          },
          {
            title: "Top Losers",
            url: "/dashboard/losers"
          }
        ]
      },
      {
        title: "Analytics",
        url: "#",
        icon: BarChart3,
        items: [
          {
            title: "Market Overview",
            url: "/dashboard/analytics"
          },
          {
            title: "Trends",
            url: "/dashboard/trends"
          }
        ]
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "Account",
            url: "/dashboard/account"
          },
          {
            title: "Billing",
            url: "/dashboard/billing"
          },
          {
            title: "Alerts",
            url: "/dashboard/alerts"
          }
        ]
      }
    ]
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
