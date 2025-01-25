import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getProfile, updateUserProfile } from "@/api/services/user-service";
import DatePickerFormField from "@/components/primitives/DatePickerFormField";
import { PictureInputField } from "@/components/primitives/PictureInputField";
import InputFormField from "@/components/primitives/InputFormField";
import NumberInputFormField from "@/components/primitives/NumberInputFormField";
import PhoneInputFormField from "@/components/primitives/PhoneInputFormField";
import SelectFormField from "@/components/primitives/SelectFormField";
import TextareaFormField from "@/components/primitives/TextareaFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { traineeScheme, trainerScheme } from "@/schemas/user-schemas";
import { UserRole } from "@/api/enums/user-role";
import { toast } from "sonner";
import useAuth from "@/hooks/use-auth";

type TraineeProfileFormValues = z.infer<typeof traineeScheme>;
type TrainerProfileFormValues = z.infer<typeof trainerScheme>;

const genders = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

const defaultValues: Partial<
  TraineeProfileFormValues | TrainerProfileFormValues
> = {
  biography: "",
  firstName: "",
  lastName: "",
};

export function ProfileForm() {
  const auth = useAuth();
  const isTrainer = auth.isTrainer();
  const userId = auth.getUserId();

  if (userId == null) return;

  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState<
    TraineeProfileFormValues | TrainerProfileFormValues | null
  >(null);
  const [initialPicture, setInitialPicture] = useState<string | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    const fetchProfileData = async () => {
      let data: ProfileFormValues | null = null;
      const pdata = await getProfile(userId);
      data = pdata;

      if (data) {
        const result = Object.entries(data).reduce((acc: any, [key, item]) => {
          acc[key] = item ?? undefined;

          return acc;
        }, {});

        setInitialValues(result);
        setInitialPicture(result?.profilePictureFilePath);
        form.reset({ ...result });
      }
    };

    fetchProfileData();
  }, [isTrainer]);

  const profileFormSchema = isTrainer ? trainerScheme : traineeScheme;

  type ProfileFormValues = typeof profileFormSchema extends typeof trainerScheme
    ? TrainerProfileFormValues
    : TraineeProfileFormValues;

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
      setFileName("");
      setSelectedFile(undefined);
    }
    setIsEditing((prev) => !prev);
  };

  const handleFileSelection = (file: File | undefined) => {
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      form.setValue("profilePictureFilePath", file.name);
    } else {
      setSelectedFile(undefined);
      setFileName("");
      form.setValue("profilePictureFilePath", "");
    }
  };

  async function onSubmit(data: ProfileFormValues) {
    try {
      let requestData: any;
      if (isTrainer) {
        const pom = trainerScheme.parse(data);
        requestData = {
          ...pom,
          role: UserRole.TRAINER,
        };
      } else {
        const pom = traineeScheme.parse(data);
        requestData = {
          ...pom,
          role: UserRole.TRAINEE,
        };
      }

      const formData = new FormData();

      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      formData.append(
        "request",
        new Blob([JSON.stringify(requestData)], { type: "application/json" })
      );
      await updateUserProfile(userId!, formData);

      setIsEditing(false);
      setSelectedFile(undefined);
      setInitialValues(requestData);
      toast.success("Successfully updated your profile!");
    } catch (error) {
      console.error("Error updating profile or profile picture:", error);
      toast.error("Couldn't update your profile. Please, try again later");
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

        <div className="flex sm:flex-row flex-col gap-4 mt-4">
          <div className="flex-1 basis-1/2">
            <DatePickerFormField
              control={form.control}
              placeholder="Pick a date"
              name="dateOfBirth"
              description="Your date of birth is used to calculate your age."
              label="Date of birth"
              disabled={!isEditing}
              className="w-auto"
            />
          </div>

          <SelectFormField
            control={form.control}
            name="gender"
            options={genders}
            label="Gender"
            placeholder="Select a gender"
            description="You can choose your gender."
            className="flex-1 basis-1/2"
            disabled={!isEditing}
          />
        </div>

        {isTrainer == false ? (
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
              description="Enter your phone number"
              className="w-[320px]"
              disabled={!isEditing}
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

        <PictureInputField
          title="Profile image"
          name={isTrainer ? "trainerProfileImage" : "traineeProfileImage"}
          description="You can set your profile image."
          initialPicture={initialPicture}
          onFileSelect={handleFileSelection}
          disabled={!isEditing}
          fileName={fileName}
        />

        {isEditing && (
          <Button type="submit" className="mr-4" disabled={!hasUnsavedChanges}>
            Update Profile
          </Button>
        )}
        <Button
          variant={isEditing ? "outline" : "secondary"}
          type="button"
          className="min-w-32"
          onClick={toggleEditMode}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </form>
    </Form>
  );
}
