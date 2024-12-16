import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import TextareaFormField from "@/components/primitives/TextareaFormField";

type TrainingProgramApplicationModalProps = {
  onSubmit?: (application: string) => void;
};

const formSchema = z.object({
  application: z
    .string()
    .min(1, "Application details are required.")
    .max(500, "Application must be 500 characters or less."),
});

export default function TrainingProgramApplicationModal(
  props: TrainingProgramApplicationModalProps
) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      application: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setOpen(false);
    form.reset();
    props.onSubmit?.(values.application);
  }

  useEffect(() => {
    if (!open) {
      form.clearErrors();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="h-auto items-center min-w-32">
          <UserPlus className="h-5 w-5 text-primary" />
          <span>Join</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for Training Program</DialogTitle>
          <DialogDescription>
            Please provide details about why you want to join this training
            program. Your application will be reviewed by our team.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <TextareaFormField
                control={form.control}
                name="application"
                label="Application Details"
                description="Explain why you want to join this program (max 500 characters)"
                placeholder="I want to join this program because..."
              />
            </div>
            <DialogFooter>
              <Button type="submit">Submit Application</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
