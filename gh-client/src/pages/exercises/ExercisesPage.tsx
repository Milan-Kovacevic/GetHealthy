import { useState } from "react";
import ExerciseList from "./components/ExerciseList";
import ExerciseMetricsSection from "./components/ExerciseMetricsSection";
import ExercisesTitleSection from "./components/ExercisesTitleSection";
import useExercises, { ExercisesState } from "./hooks/use-exercises";
import { CircleBackgroundBlob } from "../shared/BackgroundBlobs";
import NoListItemsAnimation from "../shared/NoListItemsAnimation";

export default function ExercisesPage() {
  const [showVideos, setShowVideos] = useState(false);
  const state: ExercisesState = useExercises();

  return (
    <section className="overflow-hidden relative sm:px-5 px-4 pt-8 pb-10 h-full">
      <BackgroundBlurs />
      <div className="container mx-auto h-full z-10 relative flex flex-col">
        <div className="py-4">
          <ExercisesTitleSection
            onSearchExercises={state.onSearch}
            initialValue={state.searchQuery}
            showVideos={showVideos}
            setShowVideos={setShowVideos}
          />
        </div>
        <div className="mt-8 flex flex-col gap-6 flex-1">
          <ExerciseMetricsSection />
          {state.exercises.length == 0 && !state.loading && (
            <NoListItemsAnimation
              className="sm:py-32"
              title="No results found"
              description="Please, reload the page and try again later or adjust the search criteria..."
            />
          )}
          <ExerciseList
            showVideoEmbedded={showVideos}
            exercises={state.exercises}
            loading={state.loading}
            isFirstPage={state.isFirstPage}
            isLastPage={state.isLastPage}
            page={state.currentPage}
            totalPages={state.totalPages}
            onPageChange={state.onPageChange}
          />
        </div>
      </div>
    </section>
  );
}

const BackgroundBlurs = () => {
  return (
    <>
      <CircleBackgroundBlob
        variant="lighter"
        className="-left-52 w-1/4 h-96 -top-56"
      />
      <CircleBackgroundBlob
        variant="lighter"
        className="left-auto -right-32 w-80 h-1/3 top-80"
      />
      <CircleBackgroundBlob
        variant="lightest"
        className="-bottom-40 right-1/2 w-1/3 h-96 left-auto"
      />
    </>
  );
};
