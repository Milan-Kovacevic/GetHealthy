import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditTrainingProgramForm from "./components/EditTrainingProgramForm";
import { toast } from "sonner";
import { getSingleTrainingProgram } from "@/api/services/program-details-service";
import { Separator } from "@/components/ui/separator";
import { GeneralInfoFormSchema } from "@/schemas/training-program-schema";
import { ExercisePlanItem } from "@/api/models/exercise";
import { pictureUrl } from "@/lib/utils";

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
        console.log(data);
        const { exercises, ...generalInfo } = data;
        const transformedExercises = exercises.map((exercise) => ({
          ...exercise,
          sets: exercise.exerciseSets.map((set) => ({
            ...set,
          })),
        }));
        setProgramGeneralInfo(generalInfo);
        setProgramExercises(transformedExercises);
        setProgramPicture(data.imageFilePath);
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

  return (
    <section className="overflow-hidden relative sm:px-5 px-4 md:pt-6 pt-4 pb-10">
      <div className="container mx-auto h-full space-y-5 z-10 relative">
        <div className="space-y-0.5">
          <p className="text-2xl font-bold">Edit Training Program</p>
          <p className="text-muted-foreground text-sm sm:text-base">
            Edit general information about the program or update your workout
            plan
          </p>
        </div>
        <Separator className="my-4" />
        {programGeneralInfo && programExercises ? (
          <EditTrainingProgramForm
            generalInfo={programGeneralInfo}
            exercises={programExercises}
            programPicture={programPicture}
            programId={Number(id)}
          />
        ) : (
          <p className="">Loading...</p>
        )}
      </div>
    </section>
  );
}
