import { Skeleton } from "@/components/ui/skeleton";

export function AnalysisSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-3/4 bg-gray-700" />
      <Skeleton className="h-4 w-full bg-gray-700" />
      <Skeleton className="h-4 w-2/3 bg-gray-700" />
      <Skeleton className="h-4 w-full bg-gray-700" />
      <Skeleton className="h-4 w-1/2 bg-gray-700" />
    </div>
  );
}