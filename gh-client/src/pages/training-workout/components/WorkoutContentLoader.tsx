import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function WorkoutContentLoader() {
  return (
    <div className="flex flex-col gap-y-1 text-center sm:text-left">
      {/* <div className="flex items-center justify-between pb-1">
        <div className="flex items-center flex-1 gap-2.5 flex-wrap mb-0.5">
          <p className="text-2xl animate-pulse font-semibold tracking-tight">
            Loading workout ...
          </p>
          <Skeleton className="h-8 w-8" />
        </div>
        <Skeleton className="h-8 w-8" />
      </div>

      <Separator className="my-4" /> */}
      <div className="pt-0 flex flex-col pb-1">
        <Skeleton className="max-w-60 w-full h-6 mb-1.5" />
        <div className="flex flex-wrap gap-2 mb-3">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-7 w-32 mb-0" />
      </div>

      <Skeleton className="h-80 w-full" />

      <Skeleton className="h-6 w-full max-w-56 mt-0.5" />
      <Skeleton className="h-8 w-full max-w-64 mt-1.5" />
      <div className="pt-0.5">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
