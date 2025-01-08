import { getTrainingProgram } from "@/api/services/training-program-service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditTrainingProgramForm from "./components/EditTrainingProgramForm";
import { TrainingProgram } from "@/api/models/training-program";

export default function EditTrainingProgramPage() {
  const { id } = useParams();
  const [programGeneralInfo, setProgramGeneralInfo] = useState<any>(null);
  const [programExercises, setProgramExercises] = useState<any>(null);

  useEffect(() => {
    const fetchTrainingProgram = async () => {
      if (!id) return;

      try {
        const data: TrainingProgram = await getTrainingProgram(Number(id));
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
        console.error("Error fetching training program:", error);
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
