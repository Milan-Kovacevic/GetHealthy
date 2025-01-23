"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import InputFormField from "@/components/primitives/InputFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import {
  changeEmail,
  changePassword,
  getUserAccount,
} from "@/api/services/user-account-service";
import { toast } from "sonner";
import useAuth from "@/hooks/use-auth";

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
  confirmedPassword: z.string(),
  // .min(8, "Password must be at least 8 characters"),
});

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmedNewPassword: z.string(),
    // .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword !== data.confirmedNewPassword, {
    message: "Passwords don't match",
    path: ["confirmedNewPassword"],
  });

type EmailFormValues = z.infer<typeof emailSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;
interface UserData {
  username: string;
  email: string;
}

export default function AccountForm() {
  const auth = useAuth();
  const userId = auth.getUserId();
  if (!userId) return;

  const [userData, setUserData] = useState<UserData>({
    email: "",
    username: "",
  });
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      const data = await getUserAccount(userId!);

      setUserData({ email: data.email, username: data.username });
    };

    fetchProfileData();
  }, []);

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
      confirmedPassword: "",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmedNewPassword: "",
    },
  });

  async function onEmailSubmit(values: EmailFormValues) {
    setUserData({ ...userData, email: values.email });

    try {
      await changeEmail(values, userId!);
      toast.success("Successfully changed your email!");
      setIsEditingEmail(false);
      emailForm.reset();
    } catch (error) {
      toast.error("Unable to change your email. Please, try again later.");
    }
  }

  async function onPasswordSubmit(values: PasswordFormValues) {
    console.log(values);
    setIsChangingPassword(false);
    passwordForm.reset();
    try {
      await changePassword(values, userId!);
      toast.success("Successfully changed password!");
    } catch (error) {
      toast.error("Couldn't changed password!");
    }
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
                name="confirmedPassword"
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
                name="confirmedNewPassword"
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
