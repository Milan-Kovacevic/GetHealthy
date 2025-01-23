import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditTrainingProgramForm from "./components/EditTrainingProgramForm";
import { toast } from "sonner";
import { getSingleTrainingProgram } from "@/api/services/program-details-service";
import { GeneralInfoFormSchema } from "@/schemas/training-program-schema";
import { ExercisePlanItem } from "@/api/models/exercise";
import PageHeadingLayout from "@/layouts/PageHeadingLayout";
import EditTrainingProgramLoader from "./components/EditTrainingProgramFormLoader";

export default function EditTrainingProgramPage() {
  const { id } = useParams();
  const [programGeneralInfo, setProgramGeneralInfo] =
    useState<GeneralInfoFormSchema | null>(null);
  const [programExercises, setProgramExercises] = useState<ExercisePlanItem[]>(
    []
  );
  const [programPicture, setProgramPicture] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainingProgram = async () => {
      if (!id) return;

      try {
        const data = await getSingleTrainingProgram(parseInt(id));
        const { exercises, ...generalInfo } = data;
        const transformedExercises = exercises.map((exercise) => ({
          ...exercise,
          sets: exercise.exerciseSets.map((set) => ({
            ...set,
          })),
        }));
        setTimeout(() => {
          setProgramGeneralInfo(generalInfo);
          setProgramExercises(transformedExercises);
          setProgramPicture(data.imageFilePath);
        }, 5000); // Kašnjenje od 2 sekunde
      } catch (error) {
        console.error("Error fetching training program:", error);
        navigate(-1);
        toast.error(
          "Unable to load training program data. Please, try again later."
        );
      }
    };

    fetchTrainingProgram();
  }, [id]);

  const loading = !programGeneralInfo || !programExercises;
  return (
    <PageHeadingLayout
      title="Edit Training Program"
      description="Edit general information about the program or update your workout
            plan"
    >
      {programGeneralInfo && programExercises ? (
        <EditTrainingProgramForm
          generalInfo={programGeneralInfo}
          exercises={programExercises}
          programPicture={programPicture}
          programId={Number(id)}
        />
      ) : (
        // <p className="">Loading...</p>
        <EditTrainingProgramLoader />
      )}
    </PageHeadingLayout>
  );
}
