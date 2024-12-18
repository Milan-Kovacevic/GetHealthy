import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getProfile, updateUserProfile } from "@/api/services/user-service";
import DatePickerFormField from "@/components/primitives/DatePickerFormField";
import { FileInputField } from "@/components/primitives/FileInputField";
import InputFormField from "@/components/primitives/InputFormField";
import NumberInputFormField from "@/components/primitives/NumberInputFormField";
import PhoneInputFormField from "@/components/primitives/PhoneInputFormField";
import SelectFormField from "@/components/primitives/SelectFormField";
import TextareaFormField from "@/components/primitives/TextareaFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { UserRole } from "@/api/models/user";

const sharedFields = {
  firstName: z.string({ required_error: "First name is required." }).min(1),
  lastName: z.string({ required_error: "Last name is reqiured." }).min(1),
  dateOfBirth: z.date({ required_error: "A date of birth is required." }),
  gender: z.string({ required_error: "Gender is required." }),
  profilePictureFilePath: z.string().optional(),
};

const traineeScheme = z.object({
  ...sharedFields,
  weight: z.number().min(0, "Weight must be a positive number."),
  height: z.number().min(0, "Height must be a positive number."),
  medicalHistory: z
    .string()
    .max(160, "Medical history must have less than 160 characters.")
    .min(4, "Medical history must have at least 4 characters."),
});

const trainerScheme = z.object({
  ...sharedFields,
  contactInfo: z.string().nonempty("Phone number is required."),
  biography: z
    .string()
    .max(160, "Bio must have less than 160 characters.")
    .min(4, "Bio must have at least 4 characters."),
});

const profileFormSchema = z.union([traineeScheme, trainerScheme]);

const genders = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  biography: "",
  firstName: "",
  lastName: "",
  weight: 0,
  height: 0,
};

type ProfileFormProps = {
  isTrainer?: boolean;
};

export function ProfileForm(props: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState<ProfileFormValues | null>(
    null
  );
  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  useEffect(() => {
    const fetchProfileData = async () => {
      let data: ProfileFormValues | null = null;
      const pdata = await getProfile(1);

      data = pdata;

      if (data) {
        setInitialValues(data);
        form.reset(data);
      }
    };

    fetchProfileData();
  }, [props.isTrainer]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const watchedValues = form.watch();

  const hasUnsavedChanges = initialValues
    ? JSON.stringify(initialValues) !== JSON.stringify(watchedValues)
    : false;

  const toggleEditMode = () => {
    if (isEditing) {
      form.reset(initialValues!);
    }
    setIsEditing(!isEditing);
  };

  const handleFileSelection = (file: File | undefined) => {
    if (file) {
      setSelectedFile(file);
      form.setValue("profilePictureFilePath", file.name);
    } else {
      setSelectedFile(undefined);
      form.setValue("profilePictureFilePath", "");
    }
  };

  async function onSubmit(data: ProfileFormValues) {
    try {
      let requestData: any;
      if (props.isTrainer) {
        const pom = trainerScheme.parse(data);
        requestData = { ...pom, role: UserRole.TRAINER };
        setInitialValues(requestData);
      } else {
        const pom = traineeScheme.parse(data);
        requestData = { ...pom, role: UserRole.TRAINEE };

        setInitialValues(requestData);
      }

      const formData = new FormData();

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      formData.append(
        "request",
        new Blob([JSON.stringify(requestData)], { type: "application/json" })
      );

      await updateUserProfile(1, formData).catch(() =>
        console.log("Some error happened!")
      );

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile or profile picture:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <InputFormField
            control={form.control}
            name="firstName"
            type="text"
            display="First name"
            placeholder="Enter a first name "
            className="flex-1 min-w-[200px]"
            description="This is your first name."
            disabled={!isEditing}
          />
          <InputFormField
            control={form.control}
            name="lastName"
            type="text"
            display="Last name"
            placeholder="Enter a last name "
            className="flex-1 min-w-[200px]"
            description="This is your last name."
            disabled={!isEditing}
          />
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <DatePickerFormField
            control={form.control}
            placeholder="Pick a date"
            name="dateOfBirth"
            description="Your date of birth is used to calculate your age."
            label="Date of birth"
            disabled={!isEditing}
          />

          <SelectFormField
            control={form.control}
            name="gender"
            options={genders}
            label="Gender"
            placeholder="Select a gender"
            description="You can choose your gender."
            disabled={!isEditing}
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
                disabled={!isEditing}
              />
              <NumberInputFormField
                control={form.control}
                name="weight"
                label="Weight"
                min={0}
                max={300}
                className="flex-1 min-w-[200px]"
                description="Enter your weight in kg."
                disabled={!isEditing}
              />
            </div>

            <TextareaFormField
              control={form.control}
              name="medicalHistory"
              label="Medical history"
              description="Share a brief summary about your medical history. 
                This is important for the trainer to design a safe and effective training program."
              placeholder="Tell us a little bit about your medical history"
              className=""
              disabled={!isEditing}
            />
          </>
        ) : (
          <>
            <PhoneInputFormField
              control={form.control}
              name="contactInfo"
              label="Phone Number"
              placeholder="Enter a phone number"
              description="Enter a phone number"
              className="w-[240px]"
            />

            <TextareaFormField
              control={form.control}
              name="biography"
              label="Bio"
              description="Share a brief summary about yourself."
              placeholder="Tell us a little bit about yourself"
              className=""
              disabled={!isEditing}
            />
          </>
        )}

        <FileInputField
          title="Profile image"
          name={props.isTrainer ? "trainerProfileImage" : "traineeProfileImage"}
          description="You can set your profile image."
          formats=""
          onFileSelect={handleFileSelection}
          disabled={!isEditing}
        />

        {isEditing && (
          <Button type="submit" className="mr-4" disabled={!hasUnsavedChanges}>
            Update Profile
          </Button>
        )}
        <Button
          variant={isEditing ? "outline" : "secondary"}
          type="button"
          className="min-w-24"
          onClick={toggleEditMode}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </form>
    </Form>
  );
}
