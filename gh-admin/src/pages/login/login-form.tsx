import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@refinedev/core";
import appIcon from "@/assets/applogo.png";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  username: z
    .string({ required_error: "Username is required." })
    .min(1, "Username is required.")
    .max(64),
  password: z
    .string({ required_error: "Password is required." })
    .min(1, "Password is required.")
    .max(64),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<ILoginRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutateAsync: loginAsync, isLoading } = useLogin<ILoginRequest>();
  function onSubmit(values: ILoginRequest) {
    try {
      loginAsync(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
              <img
                src={appIcon}
                className="dark:filter-white h-20"
                alt="logo"
              />
              <h1 className="text-2xl font-bold mt-1.5">
                Welcome to Get Healthy
              </h1>
              <p className="text-center text-base mt-0.5 font-medium text-muted-foreground">
                Admin Application
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      <FormLabel>Username *</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your username or email
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      <FormLabel>Password *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex. 123 :)"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Enter your password</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading && (
                  <Loader2Icon className="text-primary-foreground animate-spin" />
                )}
                Login
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
