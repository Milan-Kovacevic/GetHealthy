import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  exercisePlanSchema,
  generalInfoSchema,
} from "@/schemas/training-program-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GeneralInformationForm from "./GeneralInformationForm";
import { Separator } from "@/components/ui/separator";
import ExercisePlanBuilder from "./ExercisePlanBuilder";
import { useState } from "react";

const EditTrainingProgramForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const editGeneralInfoForm = useForm<z.infer<typeof generalInfoSchema>>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {},
  });

  const editExercisePlanForm = useForm<z.infer<typeof exercisePlanSchema>>({
    resolver: zodResolver(exercisePlanSchema),
    defaultValues: {
      exercises: [],
    },
  });

  const onGeneralInfoSubmit = (data: any) => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    formData.append(
      "request",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    console.log(data);
  };

  const onExercisePlanSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Form {...editGeneralInfoForm}>
        <form
          onSubmit={editGeneralInfoForm.handleSubmit(onGeneralInfoSubmit)}
          className="space-y-8"
        >
          <Separator className="my-4" />
          {/* <GeneralInformationForm form={editGeneralInfoForm} formPath="" /> */}

          <div className="flex w-full justify-end">
            <Button type="submit" variant="secondary">
              Save changes
            </Button>
          </div>
        </form>
      </Form>
      <Form {...editExercisePlanForm}>
        <form
          onSubmit={editExercisePlanForm.handleSubmit(onExercisePlanSubmit)}
          className="space-y-8"
        >
          <Separator className="my-4" />
          <ExercisePlanBuilder form={editExercisePlanForm} formPath="" />
          <div className="flex w-full justify-end">
            <Button type="submit" variant="secondary">
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditTrainingProgramForm;
