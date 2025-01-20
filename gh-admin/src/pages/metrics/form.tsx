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

const MetricFormSchema = z.object({
  name: z
    .string({ required_error: "Metric name is required." })
    .min(1, "Metric name is required.")
    .max(96),
  unit: z
    .string({ required_error: "Metric unit is required." })
    .min(1, "Metric unit is required.")
    .max(64),
});

export function ManageMetricForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<IMetricResponse>({
    mode: "onChange",
    resolver: zodResolver(MetricFormSchema),
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
                    <FormLabel>Metric name *</FormLabel>
                    <FormControl>
                      <Input placeholder="ex. Weight" type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Metric unit *</FormLabel>
                    <FormControl>
                      <Input placeholder="ex. kg" type="text" {...field} />
                    </FormControl>
                    <FormDescription>Enter a unit of a metric</FormDescription>
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
