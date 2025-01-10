import useAuth from "@/hooks/use-auth";
import { TrainingProgramLayout } from "./TrainingProgramLayout";
import { UserRole } from "@/api/enums/user-role";

export const TrainingProgramsPage = () => {
  const auth = useAuth();

  return <TrainingProgramLayout showFeatures={true} editable={false} />;
};
