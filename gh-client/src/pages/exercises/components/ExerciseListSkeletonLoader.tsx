import { Skeleton } from "@/components/ui/skeleton";

export default function ExerciseListSkeletonLoader() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <Skeleton
          key={`item-${index}`}
          className="w-full lg:h-[400px] md:h-[350] h-[380px]"
        />
      ))}
    </div>
  );
}
