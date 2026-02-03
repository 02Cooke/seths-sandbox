import { Skeleton } from "@/components/ui/skeleton"

function PanelSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl border bg-card ${className}`}>
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-1 h-4 w-48" />
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-32 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-9 w-64" />
          <Skeleton className="mt-2 h-5 w-48" />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <div className="text-right">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="mt-2 h-9 w-32" />
          </div>
          <div className="text-right">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-2 h-7 w-28" />
          </div>
          <div className="text-right">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="mt-2 h-7 w-24" />
          </div>
        </div>
      </div>

      {/* Main Panel Grid */}
      <div className="grid gap-6 xl:grid-cols-2">
        <PanelSkeleton />
        <PanelSkeleton />
      </div>

      {/* Performance Panel */}
      <PanelSkeleton className="min-h-[400px]" />

      {/* Risk and Macro Panels */}
      <div className="grid gap-6 xl:grid-cols-2">
        <PanelSkeleton />
        <PanelSkeleton />
      </div>
    </div>
  )
}
