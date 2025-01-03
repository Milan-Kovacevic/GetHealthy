import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export default function ListItemSkeleton() {
  return (
    <ScrollArea>
      <div className="h-[300px] w-full flex flex-col gap-2 pl-5 pr-4 mr-3 mt-2">
        {Array.from(Array(8).keys()).map((item) => (
          <Skeleton className="w-full min-h-16" />
        ))}
      </div>
    </ScrollArea>
  );
}
