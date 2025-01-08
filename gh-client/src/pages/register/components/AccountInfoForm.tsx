import { Button } from "@/components/ui/button";
import { Form, FormDescription } from "@/components/ui/form";
import InputFormField from "@/components/primitives/InputFormField";
import { cn } from "@/lib/utils";
import { GlobeIcon } from "lucide-react";
import {
  AccountInfoFormSchema,
  useAccountInfoForm,
} from "@/schemas/register-form-schema";

type AccountInfoFormProps = {
  onInfoSubmitted: (data: AccountInfoFormSchema) => void;
  onGoBack: () => void;
  className?: string;
};

export default function AccountInfoForm(props: AccountInfoFormProps) {
  const { onGoBack, onInfoSubmitted, className } = props;
  const { accountInfoForm } = useAccountInfoForm();

  function onSubmit(values: AccountInfoFormSchema) {
    onInfoSubmitted(values);
  }

  return (
    <Form {...accountInfoForm}>
      <form
        onSubmit={accountInfoForm.handleSubmit(onSubmit)}
        className={cn("space-y-2 mx-auto", className)}
      >
        <InputFormField
          control={accountInfoForm.control}
          name="username"
          type="text"
          description="Enter your username"
          display="Username *"
          placeholder="ex. user1"
        />
        <InputFormField
          control={accountInfoForm.control}
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
                control={accountInfoForm.control}
                name="password"
                type="password"
                display="Password *"
                placeholder="ex. 123"
              />
            </div>
            <div className="col-span-6">
              <InputFormField
                control={accountInfoForm.control}
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

        {/* <SocialRegistrationOption /> */}

        <div className="flex flex-row gap-3 pt-5">
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

const SocialRegistrationOption = () => {
  return (
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
  );
};
