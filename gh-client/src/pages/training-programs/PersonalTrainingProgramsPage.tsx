import useAuth from "@/hooks/use-auth";
import { TrainingProgramLayout } from "./TrainingProgramLayout";
import usePersonalTrainingPrograms from "./hooks/use-personal-programs";
import { TrainingProgramsLoader } from "./components/TrainingProgramsLoaders";
import NoTrainingProgramsAnimation from "./components/NoTrainingProgramsAnimation";
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
    <NoTrainingProgramsAnimation />
  ) : (
    <div className="grid mt-5 gap-x-6 gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 flex-1">
      {isTrainer
        ? state.programs.map((item) => (
            <ManagedProgramCard
              program={item}
              onRemoveTrainingProgram={state.onRemoveTrainingProgram}
            />
          ))
        : state.programs.map((item) => <TrainingProgramCard program={item} />)}
    </div>
  );

  return (
    <TrainingProgramLayout
      showFeatures={false}
      showCreate={false}
      state={state}
    >
      {TrainingProgramsSection}
    </TrainingProgramLayout>
  );
};
