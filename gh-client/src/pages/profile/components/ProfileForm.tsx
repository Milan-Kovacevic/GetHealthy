import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import DatePickerFormField from "@/components/primitives/DatePickerFormField";
import { FileInputField } from "@/components/primitives/FileInputField";
import InputFormField from "@/components/primitives/InputFormField";
import NumberInputFormField from "@/components/primitives/NumberInputFormField";
import PhoneInputFormField from "@/components/primitives/PhoneInputFormField";
import SelectFormField from "@/components/primitives/SelectFormField";
import TextareaFormField from "@/components/primitives/TextareaFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useState } from "react";

const sharedFields = {
  firstName: z.string({ required_error: "First name is required." }).min(1),
  lastName: z.string({ required_error: "Last name is reqiured." }).min(1),
  dob: z.date({ required_error: "A date of birth is required." }),
  gender: z.string({ required_error: "Gender is required." }),
};

const traineeScheme = z.object({
  ...sharedFields,
  weight: z.number().min(0, "Weight must be a positive number."),
  height: z.number().min(0, "Height must be a positive number."),
  medicHistory: z
    .string()
    .max(160, "Medical history must have less than 160 characters.")
    .min(4, "Medical history must have at least 4 characters."),
});

const trainerScheme = z.object({
  ...sharedFields,
  phone: z.string().nonempty("Phone number is required."),
  bio: z
    .string()
    .max(160, "Bio must have less than 160 characters.")
    .min(4, "Bio must have at least 4 characters."),
});

const profileFormSchema = z.union([traineeScheme, trainerScheme]);

const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  bio: "",
  firstName: "",
  lastName: "",
  weight: 0,
  height: 0,
};

type ProfileFormProps = {
  isTrainer?: boolean;
};

export function ProfileForm(props: ProfileFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    if (props.isTrainer) {
      const trainerData = trainerScheme.parse(data);
      console.log(trainerData);
    } else {
      const traineeData = traineeScheme.parse(data);
      console.log(traineeData);
    }
    console.log(selectedFile);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex flex-wrap gap-4">
          <InputFormField
            control={form.control}
            name="firstName"
            type="text"
            display="First name"
            placeholder="Enter a first name "
            className="flex-1 min-w-[200px]"
            description="This is your first name."
          />
          <InputFormField
            control={form.control}
            name="lastName"
            type="text"
            display="Last name"
            placeholder="Enter a last name "
            className="flex-1 min-w-[200px]"
            description="This is your last name."
          />
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <DatePickerFormField
            control={form.control}
            placeholder="Pick a date"
            name="dob"
            description="Your date of birth is used to calculate your age."
            label="Date of birth"
          />

          <SelectFormField
            control={form.control}
            name="gender"
            options={genders}
            label="Gender"
            placeholder="Select a gender"
            description="You can choose your gender."
          />
        </div>

        {props.isTrainer === false ? (
          <>
            <div className="flex flex-wrap gap-4">
              <NumberInputFormField
                control={form.control}
                name="height"
                label="Height"
                className="flex-1 min-w-[200px]"
                min={0}
                max={300}
                description="Enter your height in cm."
              />
              <NumberInputFormField
                control={form.control}
                name="weight"
                label="Weight"
                min={0}
                max={300}
                className="flex-1 min-w-[200px]"
                description="Enter your weight in kg."
              />
            </div>

            <TextareaFormField
              control={form.control}
              name="medicHistory"
              label="Medical history"
              description="Share a brief summary about your medical history. 
                This is important for the trainer to design a safe and effective training program."
              placeholder="Tell us a little bit about your medical history"
              className=""
            />
          </>
        ) : (
          <>
            <PhoneInputFormField
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="Enter a phone number"
              description="Enter a phone number"
              className="w-[240px]"
            />

            <TextareaFormField
              control={form.control}
              name="bio"
              label="Bio"
              description="Share a brief summary about yourself."
              placeholder="Tell us a little bit about yourself"
              className=""
            />
          </>
        )}

        <FileInputField
          title="Profile image"
          name={props.isTrainer ? "trainerProfileImage" : "traineeProfileImage"}
          description="You can set your profile image."
          formats=""
          onFileSelect={setSelectedFile}
        />

        <Button variant="secondary" type="submit">
          Update profile
        </Button>
      </form>
    </Form>
  );
}
