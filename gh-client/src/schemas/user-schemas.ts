import { z } from "zod";

const sharedFields = {
  firstName: z
    .string({ required_error: "First name is required." })
    .min(1, "First name is required."),
  lastName: z
    .string({ required_error: "Last name is reqiured." })
    .min(1, "Last name is reqiured."),
  dateOfBirth: z.coerce.date({
    required_error: "A date of birth is required.",
  }),
  gender: z.string({ required_error: "Gender is required." }),
  profilePictureFilePath: z.string().optional(),
};

export const traineeScheme = z.object({
  ...sharedFields,
  weight: z.number().min(0, "Weight must be a positive number.").optional(),
  height: z.number().min(0, "Height must be a positive number.").optional(),
  medicalHistory: z
    .string()
    .max(160, "Medical history must have less than 160 characters.")
    .optional(),
});

export const trainerScheme = z.object({
  ...sharedFields,
  contactInfo: z.string().min(1, "Phone number is required.").optional(),
  biography: z
    .string()
    .max(160, "Bio must have less than 160 characters.")
    .optional(),
});
