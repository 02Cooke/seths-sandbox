"use client"

import { cn } from "@/lib/utils"

interface PanelCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  action?: React.ReactNode
}

export function PanelCard({
  title,
  subtitle,
  children,
  className,
  action
}: PanelCardProps) {
  return (
    <div className={cn("rounded-xl border bg-card", className)}>
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}
