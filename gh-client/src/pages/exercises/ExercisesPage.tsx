import { useState } from "react";
import ExerciseList from "./components/ExerciseList";
import ExerciseMetricsSection from "./components/ExerciseMetricsSection";
import ExercisesTitleSection from "./components/ExercisesTitleSection";
import useExercises from "./hooks/use-exercises";

export default function ExercisesPage() {
  const [showVideos, setShowVideos] = useState(false);
  const {
    exercises,
    loadingExercises,
    firstExercisePage,
    lastExercisePage,
    exercisePage,
    totalExercisePages,
    setExercisePage,
    onSearchExercises,
  } = useExercises();

  return (
    <section className="overflow-hidden relative sm:px-5 px-4 pt-8 pb-10">
      <div className="container mx-auto h-full z-10 relative">
        <div className="py-4">
          <ExercisesTitleSection
            onSearchExercises={onSearchExercises}
            showVideos={showVideos}
            setShowVideos={setShowVideos}
          />
        </div>
        <div className="mt-8 flex flex-col gap-6">
          <ExerciseMetricsSection />
          <ExerciseList
            showVideoEmbedded={showVideos}
            exercises={exercises}
            loading={loadingExercises}
            isFirstPage={firstExercisePage}
            isLastPage={lastExercisePage}
            page={exercisePage}
            totalPages={totalExercisePages}
            onPageChange={setExercisePage}
          />
        </div>
      </div>
    </section>
  );
}
