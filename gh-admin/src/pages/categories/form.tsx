import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2Icon } from "lucide-react";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const CategoryFormSchema = z.object({
  name: z
    .string({ required_error: "Category name is required." })
    .min(1, "Category name is required.")
    .max(96),
});

export function ManageCategoryForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<ICategoryResponse>({
    mode: "onChange",
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
      unit: "",
    },
  });
  const { onFinish, formLoading } = form.refineCore;

  return (
    <div
      className={cn("flex flex-col gap-6 p-1 max-w-xl", className)}
      {...props}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)} className="space-y-6">
          <div className="flex flex-col gap-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Category name *</FormLabel>
                    <FormControl>
                      <Input placeholder="ex. Cardio" type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a name for program category
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <Button
            disabled={formLoading}
            type="submit"
            className="min-w-32 self-end"
          >
            {formLoading && (
              <Loader2Icon className="text-primary-foreground animate-spin" />
            )}
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
