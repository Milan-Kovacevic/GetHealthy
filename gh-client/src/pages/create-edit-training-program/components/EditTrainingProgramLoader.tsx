import { Skeleton } from "@/components/ui/skeleton";

export default function EditTrainingProgramLoader() {
  return (
    <div className="animate-in fade-in-50">
      <div className="mt-5 w-full">
        <Skeleton className="h-7 w-48 mb-3" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-10">
          <div className="flex flex-col gap-4 lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-full max-w-lg" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-full max-w-lg" />
                <Skeleton className="h-4 w-44" />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-10 w-full max-w-lg" />
                <Skeleton className="h-4 w-52" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-10 w-full max-w-lg" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-3 px-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="rounded-lg">
                <Skeleton className="h-[400px] w-full rounded-lg" />
              </div>
              <div className="flex flex-col space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col flex-wrap justify-between md:items-end items-start gap-x-2 gap-y-6 pt-9">
          <div className="flex flex-row items-start gap-1">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-px w-full my-4" />
      </div>

      <div className="mt-8 w-full">
        <Skeleton className="h-7 w-36 mb-4" />
        <div className="flex flex-col lg:flex-row flex-1 sm:space-y-6 space-y-3 lg:space-y-0 gap-2">
          <div className="flex flex-col w-full lg:w-[340px] space-y-4 pr-5">
            <div className="w-full">
              <Skeleton className="h-[42px] w-full rounded-lg" />{" "}
            </div>
            <div className="flex flex-col gap-2 lg:h-[53vh]">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[72px] w-full rounded-lg" />
              ))}
            </div>
          </div>

          <div className="border-2 rounded-lg p-4 flex flex-col w-full">
            <div className="min-h-[400px] h-full w-full" />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
