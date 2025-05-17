import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-[180px]" />
        <Skeleton className="h-5 w-[400px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-start justify-between p-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="space-y-2 px-4">
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
                <div className="flex gap-1 py-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="px-4 pt-2">
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
