import noResults from "@/assets/no-results.png";

export default function NoTrainingProgramsAnimation() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <img
        src={noResults}
        className="dark:filter-white h-20 w-20 animate-bounce"
      />
      <p className="text-xl font-semibold tracking-tight mt-2">
        No results found
      </p>
      <p className="text-sm text-muted-foreground tracking-tight mt-1 max-w-sm text-center">
        Please, reload page and try again later or adjust the filter criteria...
      </p>
    </div>
  );
}
