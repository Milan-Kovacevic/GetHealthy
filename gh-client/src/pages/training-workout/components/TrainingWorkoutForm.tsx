import { useState } from "react";
import CurrentExerciseView from "./CurrentExerciseView";
import ExerciseSummary from "./ExerciseSummary";
import { WorkoutSummary } from "@/api/models/trainee-exercising";
import { startProgramWorkout } from "@/api/services/trainee-exercising-service";
import ProgramWorkoutSummary from "./ProgramWorkoutSummary";
import { ScheduleTrainingProgram } from "@/api/models/training-program-on-schedule";
import { toast } from "sonner";
import WorkoutRestTimer from "./WorkoutRestTimer";

type TrainingWorkoutFormProps = {
  workoutSummary: WorkoutSummary;
  scheduleProgram: ScheduleTrainingProgram;
  trainingDuration: number;
  onWorkoutFinished: () => void;
};

type FormState = "summary" | "exercise-info" | "exercise" | "rest-time";

export default function TrainingWorkoutForm({
  workoutSummary,
  scheduleProgram,
  trainingDuration,
  onWorkoutFinished,
}: TrainingWorkoutFormProps) {
  const userId = 2;
  const [formState, setFormState] = useState<FormState>("summary");
  const [workout, setWorkout] = useState<WorkoutSummary>(workoutSummary);
  const [giveFeedback, setGiveFeedback] = useState(true);
  const [pendingWorkout, setPendingWorkout] = useState(false);

  // Based on given summary, if trainee had already started workout,
  // calculate the position of next exercise and/or set
  var lastExerciseIndex = 0;
  var latestDoneSetIndex = -1;
  for (let i = 0; i < workoutSummary.programExercises.length; i++) {
    const exercise = workoutSummary.programExercises[i];
    if (exercise.skipped) continue;

    for (let j = 0; j < exercise.exerciseSetsFeedback.length; j++) {
      const set = exercise.exerciseSetsFeedback[j];

      if (j == exercise.exerciseSetsFeedback.length - 1 && set.setFeedbackId) {
        lastExerciseIndex = Math.min(
          workoutSummary.programExercises.length - 1,
          lastExerciseIndex + 1
        );
      }

      if (set.completed || set.skipped) latestDoneSetIndex = j;
    }
  }

  const [currentExerciseIndex, setCurrentExerciseIndex] =
    useState<number>(lastExerciseIndex);
  const [currentSetIndex, setCurrentSetIndex] = useState<number>(
    Math.min(
      latestDoneSetIndex == -1 ? 0 : latestDoneSetIndex + 1,
      workoutSummary.programExercises[currentExerciseIndex].exerciseSetsFeedback
        .length
    )
  );

  const [isWorkoutStarted, setWorkoutStarted] = useState<boolean>(
    workoutSummary.traineeExercisingId != undefined
  );

  const moveToNextSet = () => {
    const currentExercise =
      workoutSummary.programExercises[currentExerciseIndex];
    if (currentExerciseIndex == -1) {
      setCurrentSetIndex(0);
      return;
    }

    if (currentSetIndex < currentExercise.exerciseSetsFeedback.length - 1) {
      setCurrentSetIndex((prev) => prev + 1);
      return;
    }
    if (currentExerciseIndex < workoutSummary.programExercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setCurrentSetIndex(0);
    } else {
      // Handle workout completed
      setFormState("summary");
      setCurrentExerciseIndex(0);
      setCurrentSetIndex(0);
    }
  };
  const moveToNextExercise = () => {
    if (currentExerciseIndex < workoutSummary.programExercises.length - 1) {
      // Next exercise
      setCurrentExerciseIndex((prev) => prev + 1);
      setCurrentSetIndex(0);
    } else {
      // Handle workout completed
      setFormState("summary");
      setCurrentExerciseIndex(0);
      setCurrentSetIndex(0);
    }
  };

  const handleStartWorkout = async () => {
    if (isWorkoutStarted) return; // Cannot start workout if it is already started...

    setPendingWorkout(true);
    startProgramWorkout(userId, scheduleProgram.id)
      .then(() => {
        setFormState("exercise-info");
        setWorkoutStarted(true);
      })
      .catch(() => {
        toast.error("Unable to start your workout. Please, try again later.");
      })
      .finally(() => {
        setPendingWorkout(false);
      });
  };

  const handleContinueWorkout = () => {
    setFormState("exercise-info");
  };

  const handleFinishWorkout = () => {
    onWorkoutFinished();
  };

  const handleSetRestFinished = () => {
    moveToNextSet();
  };

  const handleSetRestSkipped = () => {
    handleSetRestFinished();
  };

  const handleSetSkipped = () => {
    moveToNextSet();
  };

  const handleSetCompleted = () => {
    setFormState("rest-time");
    // moveToNextSet();
  };

  const handleReturnToSummary = () => {
    setFormState("summary");
  };

  const handleBeginExercise = () => {
    moveToNextSet();
    setFormState("exercise");
  };

  const handleResumeExercise = () => {
    setFormState("exercise");
  };

  const handleSkipExercise = async () => {
    moveToNextExercise();

    set;
    setFormState("exercise-info");
  };

  return (
    <div className="w-full flex flex-col">
      <div className="p-0 flex flex-col flex-1">
        {formState == "summary" && (
          <ProgramWorkoutSummary
            workoutSummary={workoutSummary}
            pending={pendingWorkout}
            scheduleProgram={scheduleProgram}
            trainingDuration={trainingDuration}
            isWorkoutStarted={isWorkoutStarted}
            onStart={handleStartWorkout}
            currentExerciseIndex={currentExerciseIndex}
            onFinish={handleFinishWorkout}
            onContinue={handleContinueWorkout}
            giveFeedback={giveFeedback}
            onFeedbackChecked={setGiveFeedback}
          />
        )}
        {formState == "exercise-info" && (
          <ExerciseSummary
            onStart={handleBeginExercise}
            onResume={handleResumeExercise}
            onSkip={handleSkipExercise}
            onReturnToSummary={handleReturnToSummary}
            exerciseIndex={currentExerciseIndex}
            setIndex={currentSetIndex}
            exercise={workoutSummary.programExercises[currentExerciseIndex]}
          />
        )}
        {formState == "exercise" && (
          <CurrentExerciseView
            exercise={workoutSummary.programExercises[currentExerciseIndex]}
            exerciseIndex={currentExerciseIndex}
            setIndex={currentSetIndex}
            onReturnToSummary={handleReturnToSummary}
            onSkipSet={handleSetSkipped}
            onCompletedSet={handleSetCompleted}
          />
        )}
        {formState == "rest-time" && (
          <WorkoutRestTimer
            exercise={workoutSummary.programExercises[currentExerciseIndex]}
            completedSet={
              workoutSummary.programExercises[currentExerciseIndex]
                .exerciseSetsFeedback[currentSetIndex]
            }
            onComplete={handleSetRestFinished}
            onSkip={handleSetRestSkipped}
            onReturnToSummary={handleReturnToSummary}
            showFeedback={giveFeedback}
          />
        )}
      </div>
    </div>
  );
}
