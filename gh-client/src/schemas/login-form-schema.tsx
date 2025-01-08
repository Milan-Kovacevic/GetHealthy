import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export type LoginFormSchema = {
  username: string;
  password: string;
};

export default function useLoginFormSchema(defaultValues?: LoginFormSchema) {
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
    password: z
      .string()
      .min(1, {
        message: "Password is required.",
      })
      .max(64, {
        message: "Maximum password length is 64",
      }),
  });

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      username: "",
      password: "",
    },
  });

  return { loginForm: form };
}
