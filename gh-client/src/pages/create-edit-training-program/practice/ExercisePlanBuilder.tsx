import { z } from "zod";

const exercises = [
  { id: 1, value: "push-ups", label: "Push-ups", type: "bodyweight" },
  { id: 2, value: "squats", label: "squats", type: "bodyweight" },
  { id: 3, value: "lat-pulldowns", label: "Lat Pulldowns", type: "weighted" },
  { id: 4, value: "bench-press", label: "Bench Press", type: "weighted" },
  { id: 5, value: "running", label: "Running", type: "cardio" },
  { id: 6, value: "plank", label: "Plank", type: "timed" },
];

const setSchema = z.object({
  reps: z.number().min(1, "Reps must be at least one").optional(),
  weight: z.number().min(0, "Weight must be non-negative").optional(),
  time: z.number().min(1, "Time must be at least one second").optional(),
  distance: z.number(),
});

const exerciseSchema = z.object({
  name: z.string(),
  type: z.enum(["bodyweight", "weighted", "cardio", "timed"]),
  sets: z.array(setSchema).min(1, "At least one set is required"),
});

const exercisePlanSchema = z.object({
  exercises: z.array(exerciseSchema).min(1, "Select at least one exercise"),
});

type ExercisePlanValues = z.infer<typeof exercisePlanSchema>;

const ExercisePlanBuilder = () => {
  return <div>ExercisePlanBuilder</div>;
};

export default ExercisePlanBuilder;
