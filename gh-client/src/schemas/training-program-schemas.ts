import { z } from "zod";

const setSchema = z.object({
  reps: z.number().min(1, "Reps must be at least one").optional(),
  weight: z.number().min(0, "Weight must be non-negative").optional(),
  time: z.number().min(1, "Time must be at least one second").optional(),
  distance: z.number().optional(),
  pause: z.number().min(0, "Pause time must be greater than 0"),
});

const exerciseSchema = z.object({
  id: z.number(),
  name: z.string(),
  // type: z.enum(["bodyweight", "weighted", "cardio", "timed"]),
  sets: z
    .array(setSchema)
    .min(1, "At least one set is required")
    .max(3, "Must have less then 4 sets"),
});

export const exercisePlanSchema = z.object({
  exercises: z.array(exerciseSchema).min(1, "Select at least one exercise"),
});

export type ExercisePlanValues = z.infer<typeof exercisePlanSchema>;

export const generalInfoSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  info: z.string().min(1, { message: "Description is required." }),
  categories: z
    .array(
      z.object({
        id: z.number().min(1, { message: "Category ID is required." }),
        categoryName: z
          .string()
          .min(1, { message: "Category name is required." }),
      })
    )
    .min(1, { message: "At least one category is required." }),
  requirements: z.string().optional(),
  difficulty: z.string().min(1, { message: "Program difficulty is required." }),
});
