import useAuth from "@/hooks/use-auth";
import { TrainingProgramLayout } from "./TrainingProgramLayout";
import usePersonalTrainingPrograms from "./hooks/use-personal-programs";
import { TrainingProgramsLoader } from "./components/TrainingProgramsLoaders";
import NoTrainingProgramsAnimation from "../shared/NoListItemsAnimation";
import { TrainingProgramCard } from "./components/TrainingProgramCard";
import { ManagedProgramCard } from "./components/ManagedProgramCard";

export const PersonalTrainingProgramsPage = () => {
  const auth = useAuth();
  const userId = auth.getUserId();
  if (!userId) return;

  const isTrainer = auth.isTrainer();
  const state = usePersonalTrainingPrograms(userId);

  const TrainingProgramsSection = state.loading ? (
    <TrainingProgramsLoader />
  ) : state.programs.length == 0 ? (
    <NoTrainingProgramsAnimation
      title="No results found"
      description="Please, reload the page and try again later or adjust the filter criteria..."
    />
  ) : (
    <div className="grid mt-5 gap-x-6 gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 flex-1">
      {isTrainer
        ? state.programs.map((item) => (
            <ManagedProgramCard
              key={item.id}
              program={item}
              onRemoveTrainingProgram={state.onRemoveTrainingProgram}
            />
          ))
        : state.programs.map((item) => (
            <TrainingProgramCard key={item.id} program={item} />
          ))}
    </div>
  );

  return (
    <TrainingProgramLayout
      showFeatures={false}
      showCreate={isTrainer}
      state={state}
    >
      {TrainingProgramsSection}
    </TrainingProgramLayout>
  );
};
