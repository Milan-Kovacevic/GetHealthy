import {
  SendExerciseSetFeedbackRequest,
  WorkoutSummary,
} from "@/api/models/trainee-exercising";
import { createContext, useContext } from "react";

export type FormState = "summary" | "exercise-info" | "exercise" | "rest-time";

type ProgramWorkoutState = {
  workout: WorkoutSummary;
  formState?: FormState;
  giveFeedback: boolean;
  pendingWorkout: boolean;
  currentExerciseIndex: number;
  currentSetIndex: number;
  isWorkoutStarted: boolean;
  isWorkoutFinished: boolean;
  feedbackSubmitted: boolean;
  setGiveFeedback: (value: boolean) => void;
  onStartWorkout: () => void;
  onContinueWorkout: () => void;
  onBeginExercise: () => void;
  onResumeExercise: () => void;
  onSkipExercise: () => void;
  onReturnToSummary: () => void;
  onSetSkipped: () => void;
  onSetCompleted: () => void;
  onRestSkipped: () => void;
  onRestFinished: () => void;
  onFinishWorkout: () => void;
  onFeedbackSubmit: (feedback: SendExerciseSetFeedbackRequest) => void;
};

export const ProgramWorkoutContext = createContext<ProgramWorkoutState | null>(
  null
);

export default function useProgramWorkout() {
  const context = useContext(ProgramWorkoutContext);

  if (!context) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}
