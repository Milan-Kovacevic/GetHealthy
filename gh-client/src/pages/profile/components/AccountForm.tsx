"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import InputFormField from "@/components/primitives/InputFormField";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type EmailFormValues = z.infer<typeof emailSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;
interface UserData {
  username: string;
  email: string;
}

export default function AccountForm() {
  const [userData, setUserData] = useState<UserData>({
    username: "johndoe",
    email: "johndoe@example.com",
  });
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onEmailSubmit(values: EmailFormValues) {
    console.log(values);
    setIsEditingEmail(false);
    setUserData({ ...userData, email: values.email });
    emailForm.reset();
  }

  function onPasswordSubmit(values: PasswordFormValues) {
    console.log(values);
    setIsChangingPassword(false);
    passwordForm.reset();
  }

  return (
    <div className="space-y-8">
      {userData && (
        <div>
          <div className="mb-4">
            <Label>Username</Label>
            <Input value={userData?.username} disabled />
          </div>
          <div className="mb-4">
            <Label>Email</Label>
            <Input value={userData?.email} readOnly />
          </div>
        </div>
      )}

      {!isEditingEmail && !isChangingPassword && (
        <div className="flex space-x-3 mb-4">
          <Button variant="secondary" onClick={() => setIsEditingEmail(true)}>
            Edit Email
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsChangingPassword(true)}
          >
            Change Password
          </Button>
        </div>
      )}

      {isEditingEmail && (
        <div className="space-y-4">
          <Separator />
          <p className="text-lg font-medium tracking-tight text-foreground/90">
            Update your account info
          </p>
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
              className="space-y-4"
            >
              <InputFormField
                control={emailForm.control}
                name="email"
                type="text"
                display="Email *"
                placeholder="Enter new email"
              />

              <InputFormField
                control={emailForm.control}
                name="password"
                type="password"
                display="Confirm password *"
                placeholder="Enter your password"
              />

              <div className="flex space-x-2 pt-2">
                <Button type="submit">Save Email</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditingEmail(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {isChangingPassword && (
        <div className="space-y-4">
          <Separator />
          <p className="text-lg font-medium tracking-tight text-foreground/90">
            Change your password
          </p>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <InputFormField
                control={passwordForm.control}
                name="currentPassword"
                type="password"
                display="Current password *"
                placeholder="Enter current password"
              />
              <InputFormField
                control={passwordForm.control}
                name="newPassword"
                type="password"
                display="New password *"
                placeholder="Enter new password"
              />

              <InputFormField
                control={passwordForm.control}
                name="confirmPassword"
                type="password"
                display="Confirm new password *"
                placeholder="Confirm your new password"
              />

              <div className="flex space-x-2 pt-2">
                <Button type="submit">Change Password</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsChangingPassword(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
