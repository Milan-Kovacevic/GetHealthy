import { Skeleton } from "@/components/ui/skeleton";

export default function SingleTrainingProgramLoader() {
  return (
    <div className="my-4 flex flex-col lg:flex-row h-auto py-4 lg:px-0 px-4 relative">
      <div className="w-full lg:w-1/3 mb-4 lg:mb-0 lg:border-2 rounded-xl overflow-hidden">
        <Skeleton className="w-full h-[400px]" />
      </div>

      <div className="w-full lg:w-2/3 pl-0 lg:pl-8 relative flex flex-col">
        <div className="flex md:flex-row flex-col justify-between mt-3 gap-y-6">
          <div className="relative flex items-center gap-5">
            <div>
              <Skeleton className="h-9 w-64 mb-2" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>

        <Skeleton className="h-24 w-full mt-4" />

        <div className="mt-3 text-base gap-2 flex flex-row items-center">
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="pb-4">
          <div className="mt-1 text-sm text-foreground/80 flex items-center">
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="mt-4 flex items-center flex-wrap gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-2 lg:mt-auto mt-4 mb-0.5">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
    </div>
  );
}
