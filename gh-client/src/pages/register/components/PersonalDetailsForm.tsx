"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormDescription } from "@/components/ui/form";
import InputFormField from "@/components/primitives/InputFormField";
import { cn } from "@/lib/utils";

import {
  AccountType,
  TRAINEE_ACCOUNT_TYPE,
  TRAINER_ACCOUNT_TYPE,
} from "@/utils/constants";
import { FileInputField } from "@/components/primitives/FileInputField";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required.").max(64),
  lastName: z.string().min(1, "Last name is required.").max(64),
});

type PersonalDetailsFormProps = {
  onInfoSubmitted: (data: z.infer<typeof formSchema>) => void;
  onGoBack: () => void;
  className?: string;
  accountType?: AccountType;
};

export default function PersonalDetailsForm(props: PersonalDetailsFormProps) {
  const { onGoBack, onInfoSubmitted, className, accountType } = props;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
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
        {accountType == TRAINEE_ACCOUNT_TYPE && (
          <div>
            <p className="text-muted-foreground">How should we call you?</p>
          </div>
        )}
        <div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <InputFormField
                control={form.control}
                name="firstName"
                type="text"
                display="First name *"
                placeholder="ex. Marko"
              />
            </div>

            <div className="col-span-6">
              <InputFormField
                control={form.control}
                name="lastName"
                type="text"
                display="Last name *"
                placeholder="ex. Markovic"
              />
            </div>
          </div>
          <FormDescription className="text-xs ml-0.5 mt-0.5">
            This is your public display name.
          </FormDescription>
        </div>

        {accountType == TRAINER_ACCOUNT_TYPE && (
          <div className="">
            <div className="flex items-center gap-4 py-2 mt-3">
              <span className="h-px flex-1 bg-input"></span>
              <span className="text-xs text-muted-foreground">
                FOR TRAINERS ONLY
              </span>
            </div>
            <FileInputField
              name="qualification"
              title="Upload your qualification"
              className=""
              formats=".pdf | .doc | docx"
              description="This step is required in order to check for request authenticity."
            />
          </div>
        )}
        <div className="pt-4 flex flex-row gap-3">
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={onGoBack}
          >
            Go back
          </Button>
          <Button className="w-full" type="submit">
            Get started
          </Button>
        </div>
      </form>
    </Form>
  );
}
