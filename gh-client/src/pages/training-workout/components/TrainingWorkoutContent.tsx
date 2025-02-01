import { useEffect, useState } from "react";
import TrainingWorkoutForm from "./TrainingWorkoutForm";
import WorkoutContentLoader from "./WorkoutContentLoader";
import { TrainingProgramOnSchedule } from "@/api/models/training-program-on-schedule";
import { WorkoutSummary } from "@/api/models/trainee-exercising";
import { getWorkoutSummary } from "@/api/services/trainee-exercising-service";
import { toast } from "sonner";
import ProgramWorkoutProvider from "../ProgramWorkoutProvider";
import useAuth from "@/hooks/use-auth";

type TrainingWorkoutContentProps = {
  scheduleProgram: TrainingProgramOnSchedule;
  onWorkoutFinished: () => void;
};

export default function TrainingWorkoutContent(
  props: TrainingWorkoutContentProps
) {
  const { getUserId } = useAuth();
  var userId = getUserId();
  if (!userId) return;

  const { scheduleProgram, onWorkoutFinished } = props;
  const [loadingWorkout, setLoadingWorkout] = useState(true);
  const [workout, setWorkout] = useState<WorkoutSummary>();

  const programId = scheduleProgram.id;
  useEffect(() => {
    setLoadingWorkout(true);
    getWorkoutSummary(userId!, programId)
      .then((value) => {
        setWorkout({ ...value });
      })
      .catch(() => {
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
        <ProgramWorkoutProvider
          userId={userId}
          workout={workout}
          onWorkoutFinished={onWorkoutFinished}
        >
          <TrainingWorkoutForm scheduleProgram={scheduleProgram.program} />
        </ProgramWorkoutProvider>
      )}
    </>
  );
}
