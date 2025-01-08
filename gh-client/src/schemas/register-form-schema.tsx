import { ACCOUNT_TYPES, AccountType } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export type AccountSelectorFormSchema = {
  type: AccountType;
};

function useAccountSelectorForm(defaultValues?: AccountSelectorFormSchema) {
  // Used as a hook for future i18n updates ...

  const formSchema = z.object({
    type: z.enum(ACCOUNT_TYPES, {
      required_error: "You need to select an account type to proceed.",
    }),
  });

  const form = useForm<AccountSelectorFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      type: undefined,
    },
  });

  return { accountSelectorForm: form };
}

export type AccountInfoFormSchema = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

function useAccountInfoForm(defaultValues?: AccountInfoFormSchema) {
  // Used as a hook for future i18n updates ...

  const formSchema = z.object({
    username: z
      .string()
      .min(1, {
        message: "Username is required.",
      })
      .max(32, {
        message: "Maximum username length is 32",
      }),
    email: z
      .string()
      .min(1, {
        message: "Email is required.",
      })
      .max(128, {
        message: "Maximum email length is 128",
      }),
    password: z
      .string()
      .min(1, {
        message: "Password is required.",
      })
      .max(64, {
        message: "Maximum password length is 64",
      }),
    repeatPassword: z
      .string()
      .min(1, {
        message: "Passwords must match.",
      })
      .max(64, {
        message: "Maximum password length is 64",
      }),
  });

  const form = useForm<AccountInfoFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  return { accountInfoForm: form };
}

export type TraineeDetailsFormSchema = {
  firstName: string;
  lastName: string;
};
export type TrainerDetailsFormSchema = TraineeDetailsFormSchema & {
  qualification: File;
};

function usePersonalDetailsForm(defaultValues?: TrainerDetailsFormSchema) {
  // Used as a hook for future i18n updates ...

  const trainerFormSchema = z.object({
    firstName: z.string().min(1, "First name is required.").max(64),
    lastName: z.string().min(1, "Last name is required.").max(64),
    qualification: z
      .instanceof(File, { message: "Qualification is required." })
      .refine((file) => file.size < 1000000, {
        message: "Your qualification must be less than 1MB.",
      })
      .refine(
        (file) => {
          var regex = /^.*\.(pdf|doc|docx)$/g;
          return regex.test(file.name);
        },
        {
          message: "Invalid file format",
        }
      ),
  });
  const traineeFormSchema = z.object({
    firstName: z.string().min(1, "First name is required.").max(64),
    lastName: z.string().min(1, "Last name is required.").max(64),
  });

  const traineeForm = useForm<TraineeDetailsFormSchema>({
    resolver: zodResolver(traineeFormSchema),
    defaultValues: defaultValues ?? {
      firstName: "",
      lastName: "",
    },
  });

  const trainerForm = useForm<TrainerDetailsFormSchema>({
    resolver: zodResolver(trainerFormSchema),
    defaultValues: defaultValues ?? {
      firstName: "",
      lastName: "",
      qualification: undefined,
    },
  });

  return { trainerForm: trainerForm, traineeForm: traineeForm };
}

export { useAccountSelectorForm, useAccountInfoForm, usePersonalDetailsForm };
