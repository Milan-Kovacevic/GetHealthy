import { Skeleton } from "@/components/ui/skeleton";

export default function ProgramDetailsSkeletonLoader() {
  return (
    <div className="flex flex-col max-w-screen-lg w-full my-3 mb-6">
      <div className="">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="sm:h-20 h-36 w-full mt-3" />
      </div>
      <Skeleton className="h-7 w-1/3 min-w-32 mt-6" />

      <div className="mt-5">
        <Skeleton className="h-8 w-44 mb-3" />
        <div className="max-w-screen-md flex flex-col gap-4">
          <Skeleton className="h-56 w-full" />
          <Skeleton className="h-56 w-full" />
        </div>
      </div>
    </div>
  );
}
