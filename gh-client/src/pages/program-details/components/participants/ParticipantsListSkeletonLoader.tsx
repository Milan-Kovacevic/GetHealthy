import { Skeleton } from "@/components/ui/skeleton";

export default function ParticipantsListSkeletonLoader() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 max-w-3xl xl:max-w-4xl mt-5">
        {Array.from(Array(3).keys()).map((item) => (
          <Skeleton key={item} className="h-20 w-full" />
        ))}
      </div>
      <Skeleton className="w-48 mx-auto h-12 mt-4" />
    </div>
  );
}
