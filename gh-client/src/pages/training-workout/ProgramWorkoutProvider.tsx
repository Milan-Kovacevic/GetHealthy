import React, { useEffect, useState } from "react";
import { FormState, ProgramWorkoutContext } from "./hooks/use-program-workout";
import {
  SendExerciseSetFeedbackRequest,
  WorkoutSummary,
} from "@/api/models/trainee-exercising";
import {
  beginWorkoutExercise,
  giveExerciseSetFeedback,
  skipWorkoutExercise,
  skipWorkoutExerciseSet,
  startProgramWorkout,
} from "@/api/services/trainee-exercising-service";
import { toast } from "sonner";

type ProgramWorkoutProviderProps = {
  workout: WorkoutSummary;
  onWorkoutFinished: () => void;
  children: React.ReactNode;
  userId: number;
};

export default function ProgramWorkoutProvider(
  props: ProgramWorkoutProviderProps
) {
  const { children, workout, userId, onWorkoutFinished } = props;
  const [workoutSummary, setWorkoutSummary] = useState<WorkoutSummary>(workout);
  const [formState, setFormState] = useState<FormState>("summary");
  const [pendingWorkout, setPendingWorkout] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [currentSetIndex, setCurrentSetIndex] = useState<number>(-1);
  const [isWorkoutStarted, setWorkoutStarted] = useState<boolean>(
    workout.workoutId != undefined
  );
  const [isWorkoutFinished, setWorkoutFinished] = useState<boolean>(false);
  const [giveFeedback, setGiveFeedback] = useState(true);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    var lastExerciseIndex = 0;
    var latestDoneSetIndex = -1;
    for (let i = 0; i < workout.programExercises.length; i++) {
      const exercise = workout.programExercises[i];
      if (exercise.skipped) continue;

      for (let j = 0; j < exercise.exerciseSetsFeedback.length; j++) {
        const set = exercise.exerciseSetsFeedback[j];

        if (
          j == exercise.exerciseSetsFeedback.length - 1 &&
          set.setFeedbackId
        ) {
          lastExerciseIndex = Math.min(
            workout.programExercises.length - 1,
            lastExerciseIndex + 1
          );
        }

        if (set.completed || set.skipped) latestDoneSetIndex = j;
      }
    }

    setCurrentExerciseIndex(lastExerciseIndex);
    setCurrentSetIndex(
      workout.programExercises.length > 0
        ? Math.min(
            latestDoneSetIndex == -1 ? 0 : latestDoneSetIndex + 1,
            workout.programExercises[currentExerciseIndex].exerciseSetsFeedback
              .length
          )
        : 0
    );
    setWorkoutFinished(
      workout.programExercises.every((exercise) => {
        return (
          exercise.skipped == true ||
          exercise.exerciseSetsFeedback.every((set) => set.completed === true)
        );
      })
    );
    setWorkoutSummary(workout);
  }, [workout]);

  const moveToNextSet = () => {
    const currentExercise = workout.programExercises[currentExerciseIndex];

    if (currentSetIndex < currentExercise.exerciseSetsFeedback.length - 1) {
      setCurrentSetIndex((prev) => prev + 1);
      setFormState("exercise");
      return;
    }
    if (currentExerciseIndex < workout.programExercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setCurrentSetIndex(0);
      setFormState("exercise-info");
    } else {
      // Handle workout completed
      setFormState("summary");
      setCurrentExerciseIndex(0);
      setCurrentSetIndex(0);
      setWorkoutFinished(true);
    }
  };
  const moveToNextExercise = () => {
    if (currentExerciseIndex < workout.programExercises.length - 1) {
      // Next exercise
      setFormState("exercise-info");
      setCurrentExerciseIndex((prev) => prev + 1);
      setCurrentSetIndex(0);
    } else {
      // Handle workout completed
      setFormState("summary");
      setCurrentExerciseIndex(0);
      setCurrentSetIndex(0);
      setWorkoutFinished(true);
    }
  };

  const handleStartWorkout = async () => {
    if (isWorkoutStarted) return; // Cannot start workout if it is already started...

    if (!giveFeedback) {
      setFormState("exercise-info");
      setWorkoutStarted(true);
      return;
    }

    setPendingWorkout(true);
    startProgramWorkout(userId, workoutSummary.id)
      .then((response) => {
        setWorkoutSummary((prev) => {
          return {
            ...prev,
            workoutId: response.workoutId,
            dateTaken: response.dateTaken,
          };
        });
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
    setCurrentExerciseIndex(0);
    setCurrentSetIndex(0);
    setWorkoutFinished(true);
    onWorkoutFinished();
  };

  const handleSetSkipped = () => {
    const currentExercise =
      workoutSummary.programExercises[currentExerciseIndex];

    if (!giveFeedback) {
      const newWorkout = { ...workoutSummary };
      newWorkout.programExercises[currentExerciseIndex].exerciseSetsFeedback[
        currentSetIndex
      ].skipped = true;
      setWorkoutSummary(newWorkout);
      moveToNextSet();
      return;
    }

    if (!workoutSummary.workoutId || !currentExercise.exerciseFeedbackId)
      return;

    setPendingWorkout(true);
    skipWorkoutExerciseSet(
      workoutSummary.workoutId,
      currentExercise.exerciseFeedbackId,
      currentExercise.exerciseSetsFeedback[currentSetIndex].id
    )
      .then((response) => {
        const newWorkout = { ...workoutSummary };
        const newWorkoutCurrentExercise =
          newWorkout.programExercises[currentExerciseIndex];
        newWorkoutCurrentExercise.exerciseSetsFeedback[
          currentSetIndex
        ].skipped = true;
        newWorkoutCurrentExercise.exerciseSetsFeedback[
          currentSetIndex
        ].setFeedbackId = response.setFeedbackId;
        setWorkoutSummary(newWorkout);
        moveToNextSet();
      })
      .finally(() => {
        setPendingWorkout(false);
      });
  };

  const handleSetCompleted = () => {
    setFormState("rest-time");
  };

  const handleReturnToSummary = () => {
    setFormState("summary");
  };

  const handleBeginExercise = () => {
    if (!giveFeedback) {
      var newWorkout = { ...workoutSummary };
      newWorkout.programExercises[currentExerciseIndex].skipped = false;
      setWorkoutSummary(newWorkout);
      setFormState("exercise");
      return;
    }

    if (!workoutSummary.workoutId) return;

    setPendingWorkout(true);
    beginWorkoutExercise(
      workoutSummary.workoutId,
      workoutSummary.programExercises[currentExerciseIndex].id
    )
      .then((response) => {
        var newWorkout = { ...workoutSummary };
        newWorkout.programExercises[currentExerciseIndex].exerciseFeedbackId =
          response.exerciseFeedbackId;
        newWorkout.programExercises[currentExerciseIndex].skipped = false;
        setWorkoutSummary(newWorkout);
        setFormState("exercise");
      })
      .finally(() => {
        setPendingWorkout(false);
      });
  };

  const handleResumeExercise = () => {
    setFormState("exercise");
  };

  const handleSkipExercise = async () => {
    if (!giveFeedback) {
      var newWorkout = { ...workoutSummary };
      newWorkout.programExercises[currentExerciseIndex].skipped = true;
      newWorkout.programExercises[
        currentExerciseIndex
      ].exerciseSetsFeedback.forEach((set) => {
        if (!set.completed) set.skipped = true;
      });
      setWorkoutSummary(newWorkout);
      moveToNextExercise();
      return;
    }

    if (!workoutSummary.workoutId) return;

    setPendingWorkout(true);
    skipWorkoutExercise(
      workoutSummary.workoutId,
      workoutSummary.programExercises[currentExerciseIndex].id
    )
      .then((response) => {
        var newWorkout = { ...workoutSummary };
        newWorkout.programExercises[currentExerciseIndex].exerciseFeedbackId =
          response.exerciseFeedbackId;
        newWorkout.programExercises[currentExerciseIndex].skipped = true;
        newWorkout.programExercises[
          currentExerciseIndex
        ].exerciseSetsFeedback.forEach((set) => {
          if (!set.completed) set.skipped = true;
        });
        setWorkoutSummary(newWorkout);
        moveToNextExercise();
      })
      .finally(() => {
        setPendingWorkout(false);
      });
  };

  const handleFeedbackSubmit = (data: SendExerciseSetFeedbackRequest) => {
    if (
      !workoutSummary.workoutId ||
      !workoutSummary.programExercises[currentExerciseIndex].exerciseFeedbackId
    )
      return;

    setPendingWorkout(true);
    giveExerciseSetFeedback(
      workoutSummary.workoutId,
      workoutSummary.programExercises[currentExerciseIndex].exerciseFeedbackId,
      data
    )
      .then((response) => {
        const newWorkout = { ...workoutSummary };
        const currentSet =
          newWorkout.programExercises[currentExerciseIndex]
            .exerciseSetsFeedback[currentSetIndex];
        currentSet.firstMetricValueFeedback = data.firstMetricValueFeedback;
        currentSet.secondMetricValueFeedback = data.secondMetricValueFeedback;
        currentSet.completed = data.completed;
        currentSet.skipped = false;
        currentSet.setFeedbackId = response.setFeedbackId;
        setWorkoutSummary(newWorkout);
        setFeedbackSubmitted(true);
      })
      .catch(() => {
        toast.error("Unable to send exercise set feedback...");
      })
      .finally(() => {
        setPendingWorkout(false);
      });
  };

  const handleSetRestFinished = () => {
    if (!giveFeedback) {
      const newWorkout = { ...workoutSummary };
      newWorkout.programExercises[currentExerciseIndex].exerciseSetsFeedback[
        currentSetIndex
      ].completed = true;
      newWorkout.programExercises[currentExerciseIndex].exerciseSetsFeedback[
        currentSetIndex
      ].skipped = false;
      setWorkoutSummary(newWorkout);
      moveToNextSet();
      return;
    }

    setFeedbackSubmitted(false);
    moveToNextSet();
  };

  const handleSetRestSkipped = () => {
    handleSetRestFinished();
  };

  const value = {
    workout: workoutSummary,
    formState: formState,
    giveFeedback: giveFeedback,
    pendingWorkout: pendingWorkout,
    isWorkoutStarted: isWorkoutStarted,
    isWorkoutFinished: isWorkoutFinished,
    currentExerciseIndex: currentExerciseIndex,
    currentSetIndex: currentSetIndex,
    feedbackSubmitted: feedbackSubmitted,
    setGiveFeedback: setGiveFeedback,
    onStartWorkout: handleStartWorkout,
    onContinueWorkout: handleContinueWorkout,
    onBeginExercise: handleBeginExercise,
    onResumeExercise: handleResumeExercise,
    onSkipExercise: handleSkipExercise,
    onReturnToSummary: handleReturnToSummary,
    onSetSkipped: handleSetSkipped,
    onSetCompleted: handleSetCompleted,
    onRestSkipped: handleSetRestSkipped,
    onRestFinished: handleSetRestFinished,
    onFinishWorkout: handleFinishWorkout,
    onFeedbackSubmit: handleFeedbackSubmit,
  };

  return (
    <ProgramWorkoutContext.Provider value={value}>
      {children}
    </ProgramWorkoutContext.Provider>
  );
}
