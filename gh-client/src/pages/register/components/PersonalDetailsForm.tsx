import { Button } from "@/components/ui/button";
import { Form, FormDescription } from "@/components/ui/form";
import InputFormField from "@/components/primitives/InputFormField";

import { AccountType, TRAINER_ACCOUNT_TYPE } from "@/utils/constants";
import {
  TraineeDetailsFormSchema,
  TrainerDetailsFormSchema,
  usePersonalDetailsForm,
} from "@/schemas/register-form-schema";
import { FileInputFormField } from "@/components/primitives/FileInputFormField";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

type PersonalDetailsFormProps = {
  onTraineeDetailsSubmitted: (data: TraineeDetailsFormSchema) => void;
  onTrainerDetailsSubmitted: (data: TrainerDetailsFormSchema) => void;
  onGoBack: () => void;
  hidden?: boolean;
  loading: boolean;
  accountType?: AccountType;
};

export default function PersonalDetailsForm(props: PersonalDetailsFormProps) {
  const {
    onGoBack,
    onTraineeDetailsSubmitted,
    onTrainerDetailsSubmitted,
    hidden,
    loading,
    accountType,
  } = props;
  const isTrainer = accountType == TRAINER_ACCOUNT_TYPE;
  const { trainerForm, traineeForm } = usePersonalDetailsForm();

  function onTrainerFormSubmit(values: TrainerDetailsFormSchema) {
    onTrainerDetailsSubmitted(values);
  }

  function onTraineeFormSubmit(values: TraineeDetailsFormSchema) {
    onTraineeDetailsSubmitted(values);
  }

  return isTrainer ? (
    <TrainerForm
      trainerForm={trainerForm}
      onTrainerFormSubmit={onTrainerFormSubmit}
      hidden={hidden}
      loading={loading}
      onGoBack={onGoBack}
    />
  ) : (
    <TraineeForm
      traineeForm={traineeForm}
      onTraineeFormSubmit={onTraineeFormSubmit}
      hidden={hidden}
      loading={loading}
      onGoBack={onGoBack}
    />
  );
}

const TraineeForm = ({
  traineeForm,
  onTraineeFormSubmit,
  hidden,
  loading,
  onGoBack,
}: any) => {
  return (
    <Form {...traineeForm}>
      <form
        onSubmit={traineeForm.handleSubmit(onTraineeFormSubmit)}
        className={cn("w-full", hidden && "hidden")}
      >
        <div>
          <p className="text-muted-foreground">How should we call you?</p>
        </div>
        <div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <InputFormField
                control={traineeForm.control}
                name="firstName"
                type="text"
                display="First name *"
                placeholder="ex. Marko"
              />
            </div>

            <div className="col-span-6">
              <InputFormField
                control={traineeForm.control}
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
        <div className="pt-4 flex flex-row gap-3">
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={onGoBack}
            disabled={loading}
          >
            Go back
          </Button>
          <Button className="w-full" type="submit" disabled={loading}>
            Get started
          </Button>
        </div>
      </form>
    </Form>
  );
};

const TrainerForm = ({
  trainerForm,
  onTrainerFormSubmit,
  hidden,
  loading,
  onGoBack,
}: any) => {
  return (
    <Form {...trainerForm}>
      <form
        onSubmit={trainerForm.handleSubmit(onTrainerFormSubmit)}
        className={cn("w-full", hidden && "hidden")}
      >
        <div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <InputFormField
                control={trainerForm.control}
                name="firstName"
                type="text"
                display="First name *"
                placeholder="ex. Marko"
              />
            </div>

            <div className="col-span-6">
              <InputFormField
                control={trainerForm.control}
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

        <div className="">
          <div className="flex items-center gap-3 py-2 mt-3">
            <span className="border-t border-dashed flex-1"></span>
            <span className="text-xs text-muted-foreground">
              FOR TRAINERS ONLY
            </span>
          </div>
          <FileInputFormField
            control={trainerForm.control}
            name="qualification"
            title="Upload your qualification"
            className=""
            formats=".doc,.docx,.pdf"
            formatLabel=".pdf | .doc | .docx"
            description="This step is required in order to check for request authenticity."
          />
        </div>
        <div className="pt-4 flex flex-row gap-3">
          <Button
            variant="outline"
            className="w-full"
            type="button"
            disabled={loading}
            onClick={onGoBack}
          >
            <span className="">Go back</span>
          </Button>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading && <Loader2Icon className="animate-spin" />}
            <span className="mb-0.5">Get started</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
