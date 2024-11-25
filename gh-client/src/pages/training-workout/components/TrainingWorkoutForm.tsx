import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import WorkoutSummary from "./WorkoutSummary";
import FeedbackSurvey from "./FeedbackSurvey";
import WorkoutCountdownTimer from "./WorkoutCountdownTimer";
import CurrentExerciseView from "./CurrentExerciseView";
import ExerciseSummary from "./ExerciseSummary";

// Define types
type Exercise = {
  name: string;
  sets: Array<{
    reps: number;
    weight: number;
    restTime: number;
  }>;
  description: string;
  videoLink: string;
};

type WorkoutProgram = {
  name: string;
  categories: string[];
  difficulty: string;
  exercises: Exercise[];
  estimatedTime: number;
};

const sampleProgram: WorkoutProgram = {
  name: "Full Body Strength",
  categories: ["Strength", "Endurance"],
  difficulty: "Intermediate",
  exercises: [
    {
      name: "Squats",
      sets: [
        { reps: 10, weight: 100, restTime: 60 },
        { reps: 10, weight: 100, restTime: 60 },
        { reps: 10, weight: 100, restTime: 60 },
      ],
      description:
        "Stand with feet shoulder-width apart, lower your body as if sitting back into a chair, then push back up. ",
      videoLink: "https://example.com/squat-video",
    },
    {
      name: "Bench Press",
      sets: [
        { reps: 8, weight: 135, restTime: 90 },
        { reps: 8, weight: 135, restTime: 90 },
        { reps: 8, weight: 135, restTime: 90 },
      ],
      description:
        "Lie on a bench, lower the barbell to your chest, then push it back up to starting position.",
      videoLink: "https://example.com/bench-press-video",
    },
  ],
  estimatedTime: 45,
};

export default function TrainingWorkoutForm() {
  const [program] = useState<WorkoutProgram>(sampleProgram);
  const [showSummary, setShowSummary] = useState(true);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [giveFeedback, setGiveFeedback] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [showExerciseSummary, setShowExerciseSummary] = useState(false);

  const startWorkout = (feedback: boolean) => {
    setGiveFeedback(feedback);
    setShowSummary(false);
    setShowExerciseSummary(true);
  };

  const nextSet = () => {
    if (
      currentSetIndex ===
        program.exercises[currentExerciseIndex].sets.length - 1 &&
      currentExerciseIndex === program.exercises.length - 1
    )
      setShowSummary(true);
    else setShowRestTimer(true);
  };

  const moveToNextSet = () => {
    const currentExercise = program.exercises[currentExerciseIndex];
    if (currentSetIndex < currentExercise.sets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
    } else {
      if (currentExerciseIndex < program.exercises.length - 1) {
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
    }
    setShowFeedback(false);
    setShowRestTimer(false);
  };

  const handleRestComplete = () => {
    moveToNextSet();
  };

  const handleSkipRest = () => {
    handleRestComplete();
  };

  const handleStartExercise = () => {
    setShowExerciseSummary(false);
  };

  const handleSkipExercise = () => {
    setShowExerciseSummary(false);
  };

  return (
    <div className="w-full flex flex-col">
      <CardContent className="p-0 flex flex-col flex-1">
        {showSummary ? (
          <WorkoutSummary program={program} onStart={startWorkout} />
        ) : showRestTimer ? (
          <WorkoutCountdownTimer
            duration={
              program.exercises[currentExerciseIndex].sets[currentSetIndex]
                .restTime
            }
            onComplete={handleRestComplete}
            onSkip={handleSkipRest}
            showFeedback={giveFeedback}
          />
        ) : showExerciseSummary ? (
          <ExerciseSummary
            onStart={handleStartExercise}
            onSkip={handleSkipExercise}
            exerciseIndex={currentExerciseIndex}
            exercise={program.exercises[currentExerciseIndex]}
          />
        ) : (
          <CurrentExerciseView
            exercise={program.exercises[currentExerciseIndex]}
            exerciseIndex={currentExerciseIndex}
            currentSet={currentSetIndex + 1}
            totalSets={program.exercises[currentExerciseIndex].sets.length}
          />
        )}
      </CardContent>
      <CardFooter className="p-0">
        {!showExerciseSummary &&
          !showSummary &&
          !showRestTimer &&
          !showFeedback && (
            <Button onClick={nextSet} className="w-full" variant="secondary">
              {currentSetIndex ===
                program.exercises[currentExerciseIndex].sets.length - 1 &&
              currentExerciseIndex === program.exercises.length - 1
                ? "Finish Workout"
                : "Next Set"}
            </Button>
          )}
      </CardFooter>
    </div>
  );
}
