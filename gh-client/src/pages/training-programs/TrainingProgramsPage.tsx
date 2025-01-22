import { TrainingProgramLayout } from "./TrainingProgramLayout";
import useTrainingPrograms, {
  TrainingProgramsState,
} from "./hooks/use-training-programs";
import { TrainingProgramsLoader } from "./components/TrainingProgramsLoaders";
import { TrainingProgramCard } from "./components/TrainingProgramCard";
import NoListItemsAnimation from "../shared/NoListItemsAnimation";

export const TrainingProgramsPage = () => {
  const state: TrainingProgramsState = useTrainingPrograms();

  const TrainingProgramsSection = state.loading ? (
    <TrainingProgramsLoader />
  ) : state.programs.length == 0 ? (
    <NoListItemsAnimation
      title="No results found"
      description="Please, reload the page and try again later or adjust the filter criteria..."
    />
  ) : (
    <div className="grid mt-5 gap-x-6 gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 flex-1">
      {state.programs.map((item) => (
        <TrainingProgramCard key={item.id} program={item} />
      ))}
    </div>
  );

  return (
    <TrainingProgramLayout showFeatures={true} showCreate={false} state={state}>
      {TrainingProgramsSection}
    </TrainingProgramLayout>
  );
};
