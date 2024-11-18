import InputFormField from "@/components/primitives/InputFormField";
import { MultiSelect } from "@/components/primitives/MultiSelectFormFIeld";
import TextareaFormField from "@/components/primitives/TextareaFormField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  info: z.string().min(1, { message: "Description is required." }),
  categories: z
    .array(z.string())
    .min(1, { message: "At least one category is required." }),
  requirements: z.string().optional(),
});

export default function GeneralInformationForm({
  defaultValues,
  isEdit = false,
}: {
  defaultValues?: z.infer<typeof formSchema>;
  isEdit?: boolean;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      info: "",
      categories: [],
      requirements: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!isEdit) {
        console.log(values);
        toast(
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>
        );
      } else {
        console.log("Updated values:", values);
        toast.success("Changes saved successfully.");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const categoryOptions = [
    { label: "Technical", value: "technical" },
    { label: "Soft Skills", value: "soft-skills" },
    { label: "Leadership", value: "leadership" },
    { label: "Project Management", value: "management" },
    { label: "Design", value: "design" },
  ];

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="w-3 h-3 border-2 border-black rounded-full"></span>
          <span>General Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <InputFormField
                control={form.control}
                name="name"
                type="text"
                description="Enter a training program name."
                placeholder="ex. HIIT"
                display="Name of Training Program"
              />

              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem className="space-y-[2px]">
                    <FormLabel className="">Categories</FormLabel>

                    <FormControl>
                      <MultiSelect
                        className=""
                        options={categoryOptions}
                        value={field.value || []}
                        defaultValue={defaultValues?.categories}
                        onValueChange={(categories) =>
                          field.onChange(categories)
                        }
                        maxCount={3}
                        minCount={1}
                      />
                    </FormControl>
                    <FormDescription className="text-xs ml-0.5">
                      Select one or more categories.
                    </FormDescription>
                    <FormMessage className="text-xs ml-0.5" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 mt-8 md:grid-cols-2">
              <TextareaFormField
                control={form.control}
                name="info"
                display="Description"
                description="Enter a description for training program."
                placeholder="ex. HIIT is a functional training program"
                className="col-span-full w-full"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 mt-8 md:grid-cols-2">
              <TextareaFormField
                control={form.control}
                name="requirements"
                display="Requirements"
                description="Enter requirements for training program."
                placeholder="ex. Not for someone with heart problems"
                className="col-span-full w-full"
              />
            </div>

            <div className="flex justify-end mt-2">
              <CardFooter className="p-0">
                <Button type="submit" variant="secondary">
                  {isEdit ? "Save Changes" : "Submit"}
                </Button>
              </CardFooter>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
