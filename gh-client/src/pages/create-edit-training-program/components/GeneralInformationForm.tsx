import { difficultyOptions } from "@/api/enums/program-difficulty";
import { Category } from "@/api/models/category";
import { getAllCategories } from "@/api/services/category-service";
import InputFormField from "@/components/primitives/InputFormField";
import { MultiSelect } from "@/components/primitives/MultiSelectFormFIeld";
import TextareaFormField from "@/components/primitives/TextareaFormField";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleIntegerOnValueChange } from "@/utils/form-input-utils";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import FormSectionTitle from "./FormSectionTitle";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import ImageSelectorWithPreview from "./ImageSelectorWithPreview";
import { Separator } from "@/components/ui/separator";

type GeneralInformationFormProps = {
  isEdit: boolean;
  form: any;
  onSelectFile: (file: File | undefined) => void;
  defaultValueCategories?: Category[];
  defaultPicture?: string;
};

const GeneralInformationForm = ({
  isEdit,
  form,
  onSelectFile,
  defaultValueCategories,
  defaultPicture,
}: GeneralInformationFormProps) => {
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  const formNamePrefix = !isEdit ? "generalInfo" : "";

  useEffect(() => {
    getAllCategories()
      .then((response) => {
        setCategoryOptions(response);
      })
      .catch(() => {
        toast.error("Unable to load program categories");
      });
  }, []);

  const handleFileSelection = (file: File | undefined) => {
    file ? onSelectFile(file) : onSelectFile(undefined);
  };

  return (
    <div className="mt-5 w-full">
      <div className="mb-3">
        <FormSectionTitle title="General information" />
      </div>
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-10">
          <div className="flex flex-col gap-4 lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <InputFormField
                control={form.control}
                name={`${formNamePrefix}.name`}
                type="text"
                description="Enter a training program name."
                placeholder="ex. HIIT"
                display="Program name *"
                className="max-w-lg"
              />
              <FormField
                control={form.control}
                name={`${formNamePrefix}.difficulty`}
                render={({ field }) => (
                  <FormItem className="space-y-0.5 max-w-lg">
                    <FormLabel>Difficulty *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "text-muted-foreground font-normal",
                            field.value && "text-foreground"
                          )}
                        >
                          <SelectValue
                            className=""
                            placeholder="Select an option"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {difficultyOptions.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs ml-0.5">
                      Select program difficulty.
                    </FormDescription>
                    <FormMessage className="text-xs ml-0.5" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name={`${formNamePrefix}.categories`}
                render={({ field }) => (
                  <FormItem className="space-y-0.5 max-w-lg">
                    <FormLabel className="">Categories *</FormLabel>

                    <FormControl>
                      <MultiSelect
                        className="bg-background"
                        options={categoryOptions}
                        defaultValue={defaultValueCategories ?? undefined}
                        onValueChange={(categories) =>
                          field.onChange(categories)
                        }
                        maxCount={3}
                        minCount={1}
                        itemNameKey="name"
                        itemValueKey="categoryId"
                      />
                    </FormControl>
                    <FormDescription className="text-xs ml-0.5">
                      Select one or more categories.
                    </FormDescription>
                    <FormMessage className="text-xs ml-0.5" />
                  </FormItem>
                )}
              />

              <InputFormField
                control={form.control}
                name={`${formNamePrefix}.trainingDuration`}
                type="text"
                description="Enter a duration in minutes."
                placeholder="ex. 100"
                display="Training duration *"
                className="max-w-lg"
                onChange={handleIntegerOnValueChange}
              />
            </div>
            <TextareaFormField
              control={form.control}
              name={`${formNamePrefix}.description`}
              display="Description *"
              label="Description *"
              description="Enter a description for training program."
              placeholder="ex. HIIT is a functional training program"
              className="col-span-full w-full"
            />
            <TextareaFormField
              control={form.control}
              name={`${formNamePrefix}.requirements`}
              display="Requirements"
              label="Requirements"
              description="Enter requirements for training program."
              placeholder="ex. Not for someone with heart problems"
              className="col-span-full w-full"
            />
          </div>
          <div className="lg:col-span-2">
            <ImageSelectorWithPreview
              title="Training program picture *"
              name="files"
              description="Upload a picture for the training program."
              formats=".png, .jpeg, .jpg"
              onFileSelect={handleFileSelection}
              initialPicture={defaultPicture}
            />
          </div>
        </div>
        <div
          className={cn(
            "flex md:flex-row flex-col flex-wrap justify-between md:items-end items-start gap-x-2 gap-y-6 pt-9",
            isEdit && "pt-3"
          )}
        >
          <div className="flex flex-row items-start gap-1">
            <span className="text-xs font-bold text-muted-foreground uppercase">
              note:
            </span>
            <p className="text-muted-foreground text-xs font-medium">
              * indicates the required fields to be filled in order to create
              new training program
            </p>
          </div>
          {isEdit && (
            <div className="flex self-end">
              <Button type="submit" variant="secondary" className="min-w-32">
                <CheckIcon />
                {isEdit ? "Save Changes" : "Submit"}
              </Button>
            </div>
          )}
        </div>
        <Separator className="my-4" />
      </div>
    </div>
  );
};

export default GeneralInformationForm;
