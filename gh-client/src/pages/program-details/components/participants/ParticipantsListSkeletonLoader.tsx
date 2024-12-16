import { Skeleton } from "@/components/ui/skeleton";

export default function ParticipantsListSkeletonLoader() {
  return (
    <div className="w-full">
      <Skeleton className="w-full max-w-xl h-10" />
      <div className="flex flex-col gap-3 max-w-3xl xl:max-w-4xl mt-5">
        {Array.from(Array(6).keys()).map((item) => (
          <Skeleton key={item} className="h-20 w-full" />
        ))}
      </div>
    </div>
  );
}
