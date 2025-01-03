import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import WorkoutSummary from "./WorkoutSummary";
import WorkoutCountdownTimer from "./WorkoutCountdownTimer";
import CurrentExerciseView from "./CurrentExerciseView";
import { ArrowRight, SkipForward } from "lucide-react";
import ExerciseSummary from "./ExerciseSummary";
import { useNavigate, useParams } from "react-router-dom";
import { TraineeExercising } from "@/api/models/trainee-exercising";

type TrainingWorkoutFormProps = {
  traineeExercising: TraineeExercising;
};

export default function TrainingWorkoutForm({
  traineeExercising,
}: TrainingWorkoutFormProps) {
  const [workout, setWorkout] = useState<TraineeExercising>(traineeExercising);
  const [showSummary, setShowSummary] = useState(true);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [giveFeedback, setGiveFeedback] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [showExerciseSummary, setShowExerciseSummary] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const startWorkout = () => {
    setShowSummary(false);

    if (currentSetIndex == 0) setShowExerciseSummary(true);
  };

  const continueWorkout = () => {
    setShowSummary(false);

    if (currentSetIndex == 0) setShowExerciseSummary(true);
  };

  const nextSet = () => {
    const updatedWorkout = { ...workout };
    updatedWorkout.exercises[currentExerciseIndex].exerciseSets[
      currentSetIndex
    ].status = "completed";
    setWorkout(updatedWorkout);

    if (
      currentSetIndex ===
        workout.exercises[currentExerciseIndex].exerciseSets.length - 1 &&
      currentExerciseIndex === workout.exercises.length - 1
    )
      setShowSummary(true);
    else setShowRestTimer(true);
  };

  const moveToNextSet = () => {
    const currentExercise = workout.exercises[currentExerciseIndex];
    if (currentSetIndex < currentExercise.exerciseSets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
    } else {
      if (currentExerciseIndex < workout.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setShowExerciseSummary(true);
        setCurrentSetIndex(0);
      } else {
        setShowSummary(true);
        setCurrentExerciseIndex(0);
        setCurrentSetIndex(0);
      }
    }
    setShowFeedback(false);
    setShowRestTimer(false);
  };

  const moveToNextExercise = () => {
    const updatedWorkout = { ...workout };
    updatedWorkout.exercises[currentExerciseIndex].exerciseSets.forEach(
      (s) => (s.status = "skipped")
    );
    setWorkout(updatedWorkout);
    if (currentExerciseIndex < workout.exercises.length - 1) {
      // Next exercise
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setShowExerciseSummary(true);
      setCurrentSetIndex(0);
    } else {
      // Workout completed
      setShowSummary(true);
      setCurrentExerciseIndex(0);
      setCurrentSetIndex(0);
    }
  };

  const handleRestComplete = () => {
    moveToNextSet();
  };

  const handleSkipRest = () => {
    handleRestComplete();
  };

  const skipSet = () => {
    const updatedWorkout = { ...workout };
    updatedWorkout.exercises[currentExerciseIndex].exerciseSets[
      currentSetIndex
    ].status = "skipped";
    setWorkout(updatedWorkout);
    moveToNextSet();
  };

  const handleReturnToSummary = () => {
    setShowExerciseSummary(false);
    setShowSummary(true);
  };

  const handleStartExercise = () => {
    setShowExerciseSummary(false);
  };

  const handleSkipExercise = () => {
    moveToNextExercise();
    setShowExerciseSummary(true);
  };

  const finishWorkout = () => {
    navigate(-1);
  };

  return (
    <div className="w-full flex flex-col">
      <CardContent className="p-0 flex flex-col flex-1">
        {showSummary ? (
          <WorkoutSummary
            workout={workout}
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
        )}
      </CardContent>

      {!showSummary &&
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
        )}
    </div>
  );
}
