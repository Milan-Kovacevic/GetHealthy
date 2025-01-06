import { z } from "zod";

const sharedFields = {
  firstName: z.string({ required_error: "First name is required." }).min(1),
  lastName: z.string({ required_error: "Last name is reqiured." }).min(1),
  dateOfBirth: z.date({ required_error: "A date of birth is required." }),
  gender: z.string({ required_error: "Gender is required." }),
  profilePictureFilePath: z.string().optional(),
};

export const traineeScheme = z.object({
  ...sharedFields,
  weight: z.number().min(0, "Weight must be a positive number."),
  height: z.number().min(0, "Height must be a positive number."),
  medicalHistory: z
    .string()
    .max(160, "Medical history must have less than 160 characters.")
    .min(4, "Medical history must have at least 4 characters."),
});

export const trainerScheme = z.object({
  ...sharedFields,
  contactInfo: z.string().nonempty("Phone number is required."),
  biography: z
    .string()
    .max(160, "Bio must have less than 160 characters.")
    .min(4, "Bio must have at least 4 characters."),
});
