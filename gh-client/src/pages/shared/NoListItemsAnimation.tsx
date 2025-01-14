import noResults from "@/assets/no-results.png";

type NoListItemsAnimationProps = {
  title: string;
  description: string;
};

export default function NoListItemsAnimation({
  title,
  description,
}: NoListItemsAnimationProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16">
      <img
        src={noResults}
        className="dark:filter-white h-20 w-20 animate-bounce"
      />
      <p className="text-xl font-semibold tracking-tight mt-2">
        {/* No results found */}
        {title}
      </p>
      <p className="text-sm text-muted-foreground tracking-tight mt-1 max-w-sm text-center">
        {/* Please, reload page and try again later or adjust the filter criteria... */}
        {description}
      </p>
    </div>
  );
}
