"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import InputFormField from "@/components/primitives/InputFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const accountFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(64, {
      message: "Username not be longer than 64 characters.",
    }),
  email: z.string(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  username: "user123",
  email: undefined,
};

export default function AccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputFormField
          control={form.control}
          name="username"
          type="text"
          description="This is your account username."
          display="Username"
          disabled={true}
          placeholder="ex. user1"
        />
        <InputFormField
          control={form.control}
          name="email"
          type="email"
          description="This is your email."
          display="Email *"
          placeholder="ex. 123"
        />

        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
}
