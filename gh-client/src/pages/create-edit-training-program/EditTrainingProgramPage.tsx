import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditTrainingProgramForm from "./components/EditTrainingProgramForm";
import { toast } from "sonner";
import { getSingleTrainingProgram } from "@/api/services/program-details-service";

export default function EditTrainingProgramPage() {
  const { id } = useParams();
  const [programGeneralInfo, setProgramGeneralInfo] = useState<any>(null);
  const [programExercises, setProgramExercises] = useState<any>(null);
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
          sets: (exercise.exerciseSets ?? []).map((set) => ({
            ...set,
            firstMetricValue:
              typeof set.firstMetricValue === "string"
                ? Number(set.firstMetricValue)
                : set.firstMetricValue,
            secondMetricValue:
              set.secondMetricValue === null
                ? undefined
                : set.secondMetricValue,
            restTime: set.restTime ?? 0,
          })),
        }));
        setProgramGeneralInfo(generalInfo);
        setProgramExercises(transformedExercises);
      } catch (error) {
        toast.error(
          "Unable to load training program data. Please, try again later."
        );
        console.error("Error fetching training program:", error);
        navigate(-1);
      }
    };

    fetchTrainingProgram();
  }, [id]);

  return (
    <div className="container mx-auto relative overflow-hidden sm:px-5 px-4 pt-8 pb-10">
      <div className="space-y-0.5">
        <p className="text-2xl font-bold">Edit Training Program</p>
        <p className="text-muted-foreground text-sm">
          Edit general information about the program or update your workout plan
        </p>
      </div>
      {programGeneralInfo && programExercises ? (
        <EditTrainingProgramForm
          generalInfo={programGeneralInfo}
          exercises={programExercises}
          programId={Number(id)}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
