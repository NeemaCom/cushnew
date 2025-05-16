import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-5 w-[350px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="space-y-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[100px] w-full rounded-md" />
          ))}
      </div>

      <div className="flex justify-center">
        <Skeleton className="h-10 w-[150px]" />
      </div>
    </div>
  )
}
