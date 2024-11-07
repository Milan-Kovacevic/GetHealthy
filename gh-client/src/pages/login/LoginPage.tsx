import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import {
  CircleBackgroundBlob,
  TopBackgroundBlob,
} from "../shared/BackgroundBlobs";
import InputFormField from "@/components/primitives/InputFormField";
import AuthCardHeader from "../shared/AuthCardHeader";

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

const LoginPage = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
      navigate("/programs");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <section className="h-full relative overflow-hidden">
      <TopBackgroundBlob />
      <CircleBackgroundBlob variant="lighter" />
      <CircleBackgroundBlob
        variant="light"
        className="-bottom-24 -right-16 w-1/3 h-96 left-auto"
      />
      <div className="relative container mx-auto z-10 my-28">
        <div className="flex flex-col gap-4">
          <Card className="mx-auto w-full max-w-md animate-fade-down shadow-md dark:shadow-white/5">
            <AuthCardHeader
              title="Log in with your email or username"
              description="Enter your information to login"
            />
            <CardContent>
              <div className="grid gap-4">
                <Button variant="outline" className="w-full">
                  <Globe className="mr-2 size-4" />
                  Continue with Google
                </Button>
                <div className="flex items-center gap-4">
                  <span className="h-px w-full bg-input"></span>
                  <span className="text-xs text-muted-foreground">OR</span>
                  <span className="h-px w-full bg-input"></span>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3"
                  >
                    <InputFormField
                      control={form.control}
                      name="username"
                      type="text"
                      description="Enter your username or email."
                      display="Username *"
                      placeholder="ex. user1"
                    />
                    <InputFormField
                      control={form.control}
                      name="password"
                      type="password"
                      description="Enter your password."
                      display="Password *"
                      placeholder="ex. 123"
                    />

                    <Button type="submit" className="w-full mt-10">
                      Log in
                    </Button>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
          <div className="mx-auto flex gap-1 text-sm">
            <p>Don&apos;t have an account yet?</p>
            <Link
              to="/register"
              className="underline text-foreground/80 hover:text-foreground"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
