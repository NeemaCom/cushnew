import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
      <div className="space-y-6">
        <div>
          <Skeleton className="mb-2 h-7 w-[150px]" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div>
          <Skeleton className="mb-2 h-7 w-[150px]" />
          <Skeleton className="h-10 w-full" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>

        <div>
          <Skeleton className="mb-2 h-7 w-[150px]" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="h-[600px] rounded-lg border">
        <div className="space-y-2 p-4">
          <Skeleton className="h-7 w-[200px]" />
          <Skeleton className="h-5 w-[300px]" />
        </div>
        <div className="flex-grow space-y-4 p-4">
          <div className="flex justify-start">
            <Skeleton className="h-[80px] w-[80%] rounded-lg" />
          </div>
        </div>
        <div className="mt-auto border-t p-4">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}
