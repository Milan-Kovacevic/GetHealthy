import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import WorkoutCountdownTimer from "./WorkoutCountdownTimer";
import CurrentExerciseView from "./CurrentExerciseView";
import { ArrowRight, SkipForward } from "lucide-react";
import ExerciseSummary from "./ExerciseSummary";
import { useNavigate, useParams } from "react-router-dom";
import {
  ExerciseFeedbackRequest,
  WorkoutSummary,
} from "@/api/models/trainee-exercising";
import {} from "@/api/services/trainee-exercising-service";
import ProgramWorkoutSummary from "./ProgramWorkoutSummary";
import { ScheduleTrainingProgram } from "@/api/models/training-program-on-schedule";

type TrainingWorkoutFormProps = {
  workoutSummary: WorkoutSummary;
  scheduleProgram: ScheduleTrainingProgram;
  trainingDuration: number;
};

type FormState = "summary" | "exercise-info" | "exercise" | "rest-time";

export default function TrainingWorkoutForm({
  workoutSummary,
  scheduleProgram,
  trainingDuration,
}: TrainingWorkoutFormProps) {
  const [formState, setFormState] = useState<FormState>("summary");
  const [giveFeedback, setGiveFeedback] = useState(true);

  // TODO: Based on given summary, if trainee had already started workout,
  // calculate the position of next exercise and/or set
  var lastExerciseIndex = 0;

  for (let i = 0; i < workoutSummary.programExercises.length; i++) {
    const exercise = workoutSummary.programExercises[i];
    if (exercise.skipped) continue;

    if (
      exercise.exerciseSetsFeedback[exercise.exerciseSetsFeedback.length - 1]
        .setFeedbackId
    ) {
      lastExerciseIndex = Math.min(
        workoutSummary.programExercises.length - 1,
        lastExerciseIndex + 1
      );
    }
  }

  const currentExerciseIndex = lastExerciseIndex;

  const navigate = useNavigate();
  const params = useParams();

  const isWorkoutStarted = workoutSummary.traineeExercisingId != undefined;

  const startWorkout = async () => {
    // const programId = params["programId"];
    // const userId = params["userId"];
    // if (programId && userId) {
    //   try {
    //     const response = await startWorkout(
    //       parseInt(programId),
    //       parseInt(userId)
    //     );
    //     console.log("Workout started:", response);
    //   } catch (error) {
    //     console.error("Failed to start workout:", error);
    //   }
    // } else {
    //   console.error("Invalid programId or userId");
    // }
    // setShowSummary(false);
    // if (currentSetIndex == 0) setShowExerciseSummary(true);
  };

  const continueWorkout = () => {
    // if (
    //   currentSetIndex <
    //   workout.exercises[currentExerciseIndex].exerciseSets.length - 1
    // ) {
    //   setCurrentSetIndex((prev) => prev + 1);
    //   setShowRestTimer(true);
    //   setShowFeedback(true);
    // } else if (currentExerciseIndex < workout.exercises.length - 1) {
    //   setCurrentExerciseIndex((prev) => prev + 1);
    //   setCurrentSetIndex(0);
    //   setShowExerciseSummary(true);
    //   setShowFeedback(false);
    //   setShowRestTimer(false);
    // } else {
    //   setShowSummary(true);
    //   setShowRestTimer(false);
    //   setShowFeedback(false);
    // }
  };

  // const continueWorkout = () => {
  //   setShowSummary(false);

  //   if (currentSetIndex == 0) setShowExerciseSummary(true);
  // };

  const nextSet = () => {
    // const updatedWorkout = { ...workout };
    // updatedWorkout.exercises[currentExerciseIndex].exerciseSets[
    //   currentSetIndex
    // ].status = "completed";
    // setWorkout(updatedWorkout);
    // if (
    //   currentSetIndex ===
    //     workout.exercises[currentExerciseIndex].exerciseSets.length - 1 &&
    //   currentExerciseIndex === workout.exercises.length - 1
    // )
    //   setShowSummary(true);
    // else setShowRestTimer(true);
  };

  const moveToNextSet = () => {
    // const currentExercise = workout.exercises[currentExerciseIndex];
    // if (currentSetIndex < currentExercise.exerciseSets.length - 1) {
    //   setCurrentSetIndex(currentSetIndex + 1);
    // } else {
    //   if (currentExerciseIndex < workout.exercises.length - 1) {
    //     setCurrentExerciseIndex(currentExerciseIndex + 1);
    //     setShowExerciseSummary(true);
    //     setCurrentSetIndex(0);
    //   } else {
    //     setShowSummary(true);
    //     setCurrentExerciseIndex(0);
    //     setCurrentSetIndex(0);
    //   }
    // }
    // setShowFeedback(false);
    // setShowRestTimer(false);
  };

  const moveToNextExercise = () => {
    // const updatedWorkout = { ...workout };
    // updatedWorkout.exercises[currentExerciseIndex].exerciseSets.forEach(
    //   (s) => (s.status = "skipped")
    // );
    // setWorkout(updatedWorkout);
    // if (currentExerciseIndex < workout.exercises.length - 1) {
    //   // Next exercise
    //   setCurrentExerciseIndex(currentExerciseIndex + 1);
    //   setShowExerciseSummary(true);
    //   setCurrentSetIndex(0);
    // } else {
    //   // Workout completed
    //   setShowSummary(true);
    //   setCurrentExerciseIndex(0);
    //   setCurrentSetIndex(0);
    // }
  };

  const handleRestComplete = () => {
    moveToNextSet();
  };

  const handleSkipRest = () => {
    handleRestComplete();
  };

  const skipSet = () => {
    // const updatedWorkout = { ...workout };
    // updatedWorkout.exercises[currentExerciseIndex].exerciseSets[
    //   currentSetIndex
    // ].status = "skipped";
    // setWorkout(updatedWorkout);
    // moveToNextSet();
  };

  const handleReturnToSummary = () => {
    // setShowExerciseSummary(false);
    // setShowSummary(true);
  };

  const handleStartExercise = () => {
    // setShowExerciseSummary(false);
  };

  const handleSkipExercise = async () => {
    // const feedback: ExerciseFeedbackRequest = {
    //   skipped: true,
    //   traineeExercisingId: 0, //TODOOOOO
    //   exerciseId: workout.exercises[currentExerciseIndex].id,
    //   programExerciseId: currentExerciseIndex, //indeks, ne id???
    // };
    // try {
    //   await giveExerciseFeedback(feedback);
    //   console.log("Feedback sent successfully for skipped exercise");
    // } catch (error) {
    //   console.error("Failed to send feedback for skipped exercise:", error);
    // }
    // moveToNextExercise();
    // setShowExerciseSummary(true);
  };

  const finishWorkout = () => {
    // navigate(-1);
  };

  return (
    <div className="w-full flex flex-col">
      <CardContent className="p-0 flex flex-col flex-1">
        {formState == "summary" && (
          <ProgramWorkoutSummary
            workoutSummary={workoutSummary}
            scheduleProgram={scheduleProgram}
            trainingDuration={trainingDuration}
            isWorkoutStarted={isWorkoutStarted}
            onStart={startWorkout}
            currentExerciseIndex={currentExerciseIndex}
            onFinish={finishWorkout}
            onContinue={continueWorkout}
            giveFeedback={giveFeedback}
            onFeedbackChecked={setGiveFeedback}
          />
        )}

        {/* {showSummary ? (
          <ProgramWorkoutSummary
            workout={workoutSummary}
            onStart={startWorkout}
            currentExerciseIndex={currentExerciseIndex}
            onFinish={finishWorkout}
            onContinue={continueWorkout}
            giveFeedback={giveFeedback}
            onFeedbackChecked={setGiveFeedback}
          />
        ) : showRestTimer ? (
          <WorkoutCountdownTimer
            set={
              workout.exercises[currentExerciseIndex].exerciseSets[
                currentSetIndex
              ]
            }
            //TODOO
            firstMetric={
              workout.exercises[currentExerciseIndex].firstExerciseMetric
            }
            secondMetric={
              workout.exercises[currentExerciseIndex].secondExerciseMetric
            }
            onComplete={handleRestComplete}
            onSkip={handleSkipRest}
            onReturnToSummary={handleReturnToSummary}
            showFeedback={giveFeedback}
          />
        ) : showExerciseSummary ? (
          <ExerciseSummary
            onStart={handleStartExercise}
            onSkip={handleSkipExercise}
            onReturnToSummary={handleReturnToSummary}
            exerciseIndex={currentExerciseIndex}
            exercise={workout.exercises[currentExerciseIndex]}
          />
        ) : (
          <CurrentExerciseView
            exercise={workout.exercises[currentExerciseIndex]}
            exerciseIndex={currentExerciseIndex}
            currentSet={currentSetIndex + 1}
            totalSets={
              workout.exercises[currentExerciseIndex].exerciseSets.length
            }
            onReturnToSummary={handleReturnToSummary}
          />
        )} */}
      </CardContent>

      {/* {!showSummary &&
        !showRestTimer &&
        !showFeedback &&
        !showExerciseSummary && (
          <CardFooter className="p-0">
            <div className="flex w-full gap-4">
              <Button onClick={skipSet} className="flex-1" variant="outline">
                <SkipForward className="w-4 h-4 mr-2" />
                Skip Set
              </Button>
              <Button onClick={nextSet} className="flex-1" variant="secondary">
                <ArrowRight className="w-4 h-4 ml-2" />
                {currentSetIndex ===
                  workout.exercises[currentExerciseIndex].exerciseSets.length -
                    1 && currentExerciseIndex === workout.exercises.length - 1
                  ? "Finish"
                  : "Next"}
              </Button>
            </div>
          </CardFooter>
        )} */}
    </div>
  );
}
