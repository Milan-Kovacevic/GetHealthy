import InputFormField from "@/components/primitives/InputFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useLoginForm, { LoginFormSchema } from "@/schemas/login-form-schema";
import { Loader2Icon } from "lucide-react";

type LoginFormProps = {
  onLogin: (value: LoginFormSchema) => void;
  enabled: boolean;
};

export default function LoginForm(props: LoginFormProps) {
  const { onLogin, enabled } = props;
  const { loginForm } = useLoginForm();

  function onSubmit(values: LoginFormSchema) {
    onLogin(values);
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-3">
        <InputFormField
          control={loginForm.control}
          name="username"
          type="text"
          description="Enter your username or email."
          display="Username *"
          placeholder="ex. user1"
        />
        <InputFormField
          control={loginForm.control}
          name="password"
          type="password"
          description="Enter your password."
          display="Password *"
          placeholder="ex. 123"
        />
        <div className="pt-2">
          <Button
            disabled={!enabled}
            type="submit"
            className="w-full flex items-center"
          >
            {!enabled && <Loader2Icon className="animate-spin" />}
            <span className="mb-0.5">Log in</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
