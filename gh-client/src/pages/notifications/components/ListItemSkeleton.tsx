import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

type ListItemSkeletonProps = {
  count?: number;
};

export default function ListItemSkeleton({ count }: ListItemSkeletonProps) {
  return (
    <ScrollArea>
      <div className="h-[300px] w-full flex flex-col gap-2 pl-5 pr-4 mr-3 mt-2">
        {Array.of(count).map((_, index) => (
          <Skeleton key={`skeleton-${index}`} className="w-full min-h-16" />
        ))}
      </div>
    </ScrollArea>
  );
}
