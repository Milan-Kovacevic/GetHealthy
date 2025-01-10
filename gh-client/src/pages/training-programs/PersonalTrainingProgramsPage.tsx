import useAuth from "@/hooks/use-auth";
import { TrainingProgramLayout } from "./TrainingProgramLayout";
import { UserRole } from "@/api/enums/user-role";

export const PersonalTrainingProgramsPage = () => {
  const auth = useAuth();
  const isTrainer = auth.getUserRole() == UserRole.TRAINER;

  return <TrainingProgramLayout showFeatures={false} editable={isTrainer} />;
};
