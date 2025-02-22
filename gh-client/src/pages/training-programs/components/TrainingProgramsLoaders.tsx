import { Skeleton } from "@/components/ui/skeleton";

function TrainingProgramsLoader() {
  return (
    <div className="grid mt-5 gap-x-6 gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 flex-1">
      {Array.from(Array(8).keys()).map((item) => (
        <ProgramCardSkeleton key={item} />
      ))}
    </div>
  );
}

const ProgramCardSkeleton = () => {
  return <Skeleton className="w-full max-w-xl min-h-[400px]" />;
};

const FeaturedProgramCardSkeleton = () => {
  return <Skeleton className="max-w-2xl min-h-[420px] flex-1" />;
};

export { TrainingProgramsLoader, FeaturedProgramCardSkeleton };
