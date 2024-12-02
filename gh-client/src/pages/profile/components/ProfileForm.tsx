import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import DatePickerFormField from "@/components/primitives/DatePickerFormField";
import { FileInputField } from "@/components/primitives/FileInputField";
import InputFormField from "@/components/primitives/InputFormField";
import PhoneInputFormField from "@/components/primitives/PhoneInputFormField";
import SelectFormField from "@/components/primitives/SelectFormField";
import TextareaFormField from "@/components/primitives/TextareaFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
  firstName: z.string({ required_error: "First name is required." }),
  lastName: z.string({ required_error: "Last name is required." }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  weight: z.number().min(1).max(200),
  height: z.number().min(1),
  medicHistory: z.string().max(160).min(4),
  phone: z.string(),
  bio: z.string().max(160).min(4),
  gender: z.string({ required_error: "Gender is required" }),
});

const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
};

type ProfileFormProps = {
  isTrainer?: boolean;
};

export function ProfileForm(props: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <InputFormField
                control={form.control}
                name="weight"
                type="number"
                display="Weight"
                placeholder="Enter a weight"
                className="flex-1 min-w-[200px]"
                description="This is your weight."
              />
              <InputFormField
                control={form.control}
                name="height"
                type="number"
                display="Height"
                placeholder="Enter a height "
                className="flex-1 min-w-[200px]"
                description="This is your height."
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
          name="profileImage"
          description="You can set your profile image."
          formats=""
        />
        <Button variant="secondary" type="submit">
          Update profile
        </Button>
      </form>
    </Form>
  );
}
