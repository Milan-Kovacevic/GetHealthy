import CurrentExerciseView from "./CurrentExerciseView";
import ExerciseSummary from "./ExerciseSummary";
import ProgramWorkoutSummary from "./ProgramWorkoutSummary";
import { ScheduleTrainingProgram } from "@/api/models/training-program-on-schedule";
import WorkoutRestTimer from "./WorkoutRestTimer";
import useProgramWorkout from "../hooks/use-program-workout";

type TrainingWorkoutFormProps = {
  scheduleProgram: ScheduleTrainingProgram;
};

export default function TrainingWorkoutForm({
  scheduleProgram,
}: TrainingWorkoutFormProps) {
  const { formState } = useProgramWorkout();

  return (
    <div className="w-full flex flex-col">
      <div className="p-0 flex flex-col flex-1">
        {formState == "summary" && (
          <ProgramWorkoutSummary scheduleProgram={scheduleProgram} />
        )}
        {formState == "exercise-info" && <ExerciseSummary />}
        {formState == "exercise" && <CurrentExerciseView />}
        {formState == "rest-time" && <WorkoutRestTimer />}
      </div>
    </div>
  );
}
