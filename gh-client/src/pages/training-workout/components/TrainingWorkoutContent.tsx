import { useEffect, useState } from "react";
import TrainingWorkoutForm from "./TrainingWorkoutForm";
import WorkoutContentLoader from "./WorkoutContentLoader";
import { TrainingProgramOnSchedule } from "@/api/models/training-program-on-schedule";
import { WorkoutSummary } from "@/api/models/trainee-exercising";
import { getWorkoutSummary } from "@/api/services/trainee-exercising-service";
import { toast } from "sonner";

type TrainingWorkoutContentProps = {
  scheduleProgram: TrainingProgramOnSchedule;
  onWorkoutFinished: () => void;
};

export default function TrainingWorkoutContent(
  props: TrainingWorkoutContentProps
) {
  const { scheduleProgram, onWorkoutFinished } = props;
  const [loadingWorkout, setLoadingWorkout] = useState(true);
  const [workout, setWorkout] = useState<WorkoutSummary>();

  // TODO: Hardcoded
  const userId = 2;
  // const programId = scheduleProgram.id;
  const programId = 1;
  useEffect(() => {
    setLoadingWorkout(true);
    getWorkoutSummary(userId, programId)
      .then((value) => {
        setWorkout(value);
      })
      .catch((error) => {
        toast.error("Unable to load program workout, please try again later.");
      })
      .finally(() => {
        setLoadingWorkout(false);
      });
  }, []);

  return (
    <>
      {loadingWorkout && <WorkoutContentLoader />}
      {!loadingWorkout && workout && (
        <TrainingWorkoutForm
          workoutSummary={workout}
          scheduleProgram={scheduleProgram.program}
          trainingDuration={scheduleProgram.trainingDuration}
          onWorkoutFinished={onWorkoutFinished}
        />
      )}
    </>
  );
}
