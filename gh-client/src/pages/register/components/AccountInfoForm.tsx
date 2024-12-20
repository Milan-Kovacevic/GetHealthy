"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormDescription } from "@/components/ui/form";
import InputFormField from "@/components/primitives/InputFormField";
import { cn } from "@/lib/utils";
import { GlobeIcon } from "lucide-react";

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

type AccountInfoFormProps = {
  onInfoSubmitted: (data: z.infer<typeof formSchema>) => void;
  onGoBack: () => void;
  className?: string;
};

export default function AccountInfoForm(props: AccountInfoFormProps) {
  const { onGoBack, onInfoSubmitted, className } = props;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      onInfoSubmitted(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-2 mx-auto", className)}
      >
        <InputFormField
          control={form.control}
          name="username"
          type="text"
          description="Enter your username"
          display="Username *"
          placeholder="ex. user1"
        />
        <InputFormField
          control={form.control}
          name="email"
          type="text"
          description="Enter your email"
          display="Email *"
          placeholder="user1@example.com"
        />
        <div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <InputFormField
                control={form.control}
                name="password"
                type="password"
                display="Password *"
                placeholder="ex. 123"
              />
            </div>
            <div className="col-span-6">
              <InputFormField
                control={form.control}
                name="repeatPassword"
                type="password"
                display="Repeat Password *"
                placeholder="ex. 123"
              />
            </div>
          </div>
          <FormDescription className="text-xs ml-0.5 mt-0.5">
            This is your password.
          </FormDescription>
        </div>

        <div className="pb-6">
          <div className="flex items-center gap-4 py-4">
            <span className="h-px flex-1 bg-input"></span>
            <span className="text-xs text-muted-foreground">OR</span>
            <span className="h-px flex-1 bg-input"></span>
          </div>
          <Button variant="secondary" className="w-full border-primary border">
            <GlobeIcon className="mr-2 size-4" />
            Continue with Google
          </Button>
        </div>

        <div className="pt-2 flex flex-row gap-3">
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={onGoBack}
          >
            Go back
          </Button>
          <Button className="w-full" type="submit" variant={"secondary"}>
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
