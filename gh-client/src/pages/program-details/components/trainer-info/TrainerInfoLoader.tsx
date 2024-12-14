import { Skeleton } from "@/components/ui/skeleton";

export default function TrainerInfoLoader() {
  return (
    <div className="my-6 mt-5 relative p-4">
      <div className="flex flex-col md:flex-row md:gap-6 gap-3">
        <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full" />
        <div>
          <Skeleton className="w-44 h-8" />
          <Skeleton className="w-36 h-5 mt-1.5" />

          <Skeleton className="w-52 h-14 mt-3" />

          <Skeleton className="md:w-48 w-10 h-10 mt-3 absolute -top-2 right-4" />
        </div>
      </div>

      <Skeleton className="w-full h-32 mt-4 max-w-screen-lg" />
    </div>
  );
}
