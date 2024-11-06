import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import {
  AccountType,
  ACCOUNT_TYPES,
  TRAINEE_ACCOUNT_TYPE,
  TRAINER_ACCOUNT_TYPE,
} from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlbumIcon, DumbbellIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type AccountTypeSelectorProps = {
  className?: string;
  onAccountSelected: (type: AccountType) => void;
};

const formSchema = z.object({
  type: z.enum(ACCOUNT_TYPES, {
    required_error: "You need to select an account type to proceed.",
  }),
});

function AccountTypeSelector(props: AccountTypeSelectorProps) {
  const { onAccountSelected, className } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      onAccountSelected(data.type);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-center mb-2">
        <p className="font-medium">Select your account type</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-12 flex-row items-center justify-center"
                  >
                    <div className="col-span-6">
                      <RadioGroupItem
                        value={TRAINEE_ACCOUNT_TYPE}
                        id={TRAINEE_ACCOUNT_TYPE}
                        className="peer sr-only"
                        aria-label={TRAINEE_ACCOUNT_TYPE}
                      />
                      <Label
                        htmlFor={TRAINEE_ACCOUNT_TYPE}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <DumbbellIcon className="mb-3 h-10 w-10" />
                        <p className="text-lg -mt-2">Trainee</p>
                        <p className="font-normal text-center mt-2 max-w-40 text-muted-foreground">
                          Browse training programs, exercise and track your
                          progress
                        </p>
                      </Label>
                    </div>
                    <div className="col-span-6">
                      <RadioGroupItem
                        value={TRAINER_ACCOUNT_TYPE}
                        id={TRAINER_ACCOUNT_TYPE}
                        className="peer sr-only"
                        aria-label={TRAINER_ACCOUNT_TYPE}
                      />
                      <Label
                        htmlFor={TRAINER_ACCOUNT_TYPE}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary "
                      >
                        <AlbumIcon className="mb-3 h-6 w-6" />
                        <p className="text-lg -mt-2">Trainer</p>
                        <p className="font-normal text-center mt-2 max-w-40 text-muted-foreground">
                          Manage training programs, exercises and track your
                          engagement
                        </p>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-xs ml-0.5" />
              </FormItem>
            )}
          />
          <div className="pt-5 flex flex-row gap-3 justify-center">
            <Button className="w-full" type="submit" variant="secondary">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AccountTypeSelector;
