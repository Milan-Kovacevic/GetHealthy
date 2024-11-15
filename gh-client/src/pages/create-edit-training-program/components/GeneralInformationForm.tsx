import InputFormField from "@/components/primitives/InputFormField";
import { MultiSelect } from "@/components/primitives/MultiSelectFormField";
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

export default function GeneralInformationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      info: "",
      categories: [],
      requirements: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>General Information</CardTitle>
      </CardHeader>
      <CardContent className="">
        {" "}
        {/*grid grid-cols-2 gap-4*/}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-5">
              <div className="flex flex-1 flex-col gap-5">
                <InputFormField
                  control={form.control}
                  name="name"
                  type="text"
                  description="Enter a training program name."
                  placeholder="ex. HIIT"
                  display="Name of Training Program"
                />
              </div>
              <div className="flex flex-1 flex-col gap-5">
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
                          value={field.value}
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
            </div>
            <div className="flex flex-wrap gap-5 mt-8">
              <div className="flex flex-1 flex-col gap-5">
                <TextareaFormField
                  control={form.control}
                  name="info"
                  display="Description"
                  description="Enter a description for training program."
                  placeholder="ex. HIIT is a functional training program"
                />
              </div>
              <div className="flex flex-1 flex-col gap-5">
                <TextareaFormField
                  control={form.control}
                  name="requirements"
                  display="Requirements"
                  description="Enter requirements for training program."
                  placeholder="ex. Not for someone with heart problems"
                />
              </div>
              </div>
              <div className="flex justify-end mt-2">
                <CardFooter className="p-0">
                  <Button type="submit">Submit</Button>
                </CardFooter>
              </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
