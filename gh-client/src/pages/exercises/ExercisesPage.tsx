import ExerciseList from "./components/ExerciseList";
import ExercisesTitleSection from "./components/ExercisesTitleSection";

export default function ExercisesPage() {
  return (
    <section className="overflow-hidden relative sm:px-5 px-4 pt-8 pb-10">
      <div className="container mx-auto h-full z-10 relative">
        <div className="py-4">
          <ExercisesTitleSection />
        </div>
        <div className="mt-10">
          <ExerciseList showVideoEmbed={true} />
        </div>
      </div>
    </section>
  );
}
