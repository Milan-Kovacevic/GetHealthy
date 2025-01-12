import { z } from "zod";

// TODO: Fix setSchema???
export type SetFormSchema = z.infer<typeof setSchema>;
export type ExercisePlanFormSchema = z.infer<typeof exercisePlanSchema>;
export type GeneralInfoFormSchema = z.infer<typeof generalInfoSchema>;

const setSchema = z.object({
  reps: z.number().min(1, "Reps must be at least one").optional(),
  weight: z.number().min(0, "Weight must be non-negative").optional(),
  time: z.number().min(1, "Time must be at least one second").optional(),
  distance: z.number().optional(),
  firstMetricValue: z.number().min(1, "Value must greater than 0."),
  secondMetricValue: z.number().optional(),
  restTime: z.number().min(0, "Pause time must be greater than 0"),
});

const exerciseSchema = z.object({
  id: z.number(),
  programExerciseId: z.number().optional(),
  name: z.string(),
  sets: z
    .array(setSchema)
    .min(1, "At least one set is required")
    .max(3, "Must have less then 4 sets"),
});

export const exercisePlanSchema = z.object({
  exercises: z.array(exerciseSchema).min(1, "Select at least one exercise"),
});

export const generalInfoSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  difficulty: z.string().min(1, { message: "Program difficulty is required." }),
  trainingDuration: z
    .number()
    .min(1, { message: "Training duration must be positive number" }),
  description: z.string().min(1, { message: "Description is required." }),
  requirements: z.preprocess(
    (val) => (val === null ? undefined : val),
    z.string().optional()
  ),
  categories: z
    .array(
      z.object({
        categoryId: z.number().min(1, { message: "Category ID is required." }),
        name: z.string().min(1, { message: "Category name is required." }),
      })
    )
    .min(1, { message: "At least one category is required." }),
});
