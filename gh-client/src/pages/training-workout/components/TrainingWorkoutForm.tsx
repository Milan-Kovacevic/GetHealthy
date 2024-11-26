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
import { ArrowRight, SkipForward } from "lucide-react";
import ExerciseSummary from "./ExerciseSummary";

type Set = {
  reps: number;
  weight: number;
  restTime: number;
  status: "pending" | "completed" | "skipped";
};

type Exercise = {
  name: string;
  sets: Set[];
  description: string;
  videoLink: string;
};

type WorkoutProgram = {
  name: string;
  categories: string[];
  difficulty: string;
  exercises: Exercise[];
  estimatedTime: number;
  trainer: string;
};

const sampleProgram: WorkoutProgram = {
  name: "Full Body Strength",
  categories: ["Strength", "Endurance"],
  difficulty: "Intermediate",
  exercises: [
    {
      name: "Squats",
      sets: [
        { reps: 10, weight: 100, restTime: 60, status: "pending" },
        { reps: 10, weight: 100, restTime: 60, status: "pending" },
        { reps: 10, weight: 100, restTime: 60, status: "pending" },
      ],
      description:
        "Stand with feet shoulder-width apart, lower your body as if sitting back into a chair, then push back up. ",
      videoLink: "https://example.com/squat-video",
    },
    {
      name: "Bench Press",
      sets: [
        { reps: 8, weight: 135, restTime: 90, status: "pending" },
        { reps: 8, weight: 135, restTime: 90, status: "pending" },
        { reps: 8, weight: 135, restTime: 90, status: "pending" },
      ],
      description:
        "Lie on a bench, lower the barbell to your chest, then push it back up to starting position.",
      videoLink: "https://example.com/bench-press-video",
    },
    {
      name: "Squats",
      sets: [
        { reps: 10, weight: 100, restTime: 60, status: "pending" },
        { reps: 10, weight: 100, restTime: 60, status: "pending" },
        { reps: 10, weight: 100, restTime: 60, status: "pending" },
      ],
      description:
        "Stand with feet shoulder-width apart, lower your body as if sitting back into a chair, then push back up.",
      videoLink: "https://example.com/squat-video",
    },
    {
      name: "Bench Press",
      sets: [
        { reps: 8, weight: 135, restTime: 90, status: "pending" },
        { reps: 8, weight: 135, restTime: 90, status: "pending" },
        { reps: 8, weight: 135, restTime: 90, status: "pending" },
      ],
      description:
        "Lie on a bench, lower the barbell to your chest, then push it back up to starting position.",
      videoLink: "https://example.com/bench-press-video",
    },
  ],
  estimatedTime: 45,
  trainer: "Anja Mirkovic",
};

export default function TrainingWorkoutForm() {
  const [program, setProgram] = useState<WorkoutProgram>(sampleProgram);
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
    const updatedProgram = { ...program };
    updatedProgram.exercises[currentExerciseIndex].sets[
      currentSetIndex
    ].status = "completed";
    setProgram(updatedProgram);

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

  const skipSet = () => {
    const updatedProgram = { ...program };
    updatedProgram.exercises[currentExerciseIndex].sets[
      currentSetIndex
    ].status = "skipped";
    setProgram(updatedProgram);
    moveToNextSet();
  };

  const returnToSummary = () => {
    setShowSummary(true);
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
            onReturnToSummary={returnToSummary}
          />
        )}
      </CardContent>

      {!showSummary &&
        !showRestTimer &&
        !showFeedback &&
        !showExerciseSummary && (
          <CardFooter className="p-4">
            <div className="flex w-full gap-4">
              <Button onClick={skipSet} className="flex-1" variant="outline">
                <SkipForward className="w-4 h-4 mr-2" />
                Skip Set
              </Button>
              <Button onClick={nextSet} className="flex-1" variant="secondary">
                <ArrowRight className="w-4 h-4 ml-2" />
                {currentSetIndex ===
                  program.exercises[currentExerciseIndex].sets.length - 1 &&
                currentExerciseIndex === program.exercises.length - 1
                  ? "Finish"
                  : "Next"}
              </Button>
            </div>
          </CardFooter>
        )}
    </div>
  );
}
