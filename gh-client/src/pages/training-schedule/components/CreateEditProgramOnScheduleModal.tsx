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
import { useEffect, useState } from "react";
import { TrainerProgram } from "@/api/models/training-program";
import {
  ManageTrainingProgramOnSchedule,
  TrainingProgramOnSchedule,
} from "@/api/models/training-program-on-schedule";
import { TimePicker } from "@/components/primitives/TimePicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TrainerProgramSelector from "@/pages/shared/TrainerProgramSelector";
import { parseTimeStringToDate } from "@/utils/date-time-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectFormField from "@/components/primitives/SelectFormField";

const daysOfWeek = [
  { label: "Monday", value: "1" },
  { label: "Tuesday", value: "2" },
  { label: "Wednesday", value: "3" },
  { label: "Thursday", value: "4" },
  { label: "Friday", value: "5" },
  { label: "Saturday", value: "6" },
  { label: "Sunday", value: "7" },
];

const formSchema = z.object({
  program: z
    .object(
      {
        id: z.number(),
        name: z.string(),
        createdAt: z.string(),
        description: z.string(),
        trainerName: z.string(),
      },
      {
        required_error: "Please select program",
        invalid_type_error: "Please select program",
      }
    )
    .nullable()
    .refine((val) => val !== null && val.id > 0, {
      message: "Please select a program.",
    }),

  dayOfWeek: z
    .string({ required_error: "Please select a valid day of the week." })
    .min(1)
    .max(7, { message: "Please select a valid day of the week." }),

  startTime: z
    .date({ required_error: "Start time is required." })
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Please enter a valid start time.",
    }),
});

export type CreateEditProgramOnScheduleModalProps = {
  isEdit?: boolean;
  programOnSchedule?: TrainingProgramOnSchedule;
  onSubmitModal: (
    programOnSchedule: ManageTrainingProgramOnSchedule
  ) => Promise<void>;
};

export const CreateEditProgramOnScheduleModal = ({
  isEdit = false,
  programOnSchedule,
  onSubmitModal,
}: CreateEditProgramOnScheduleModalProps) => {
  const defaultText = "Select training program ...";
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(defaultText);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          program: programOnSchedule
            ? {
                ...programOnSchedule.program,
                trainerName: `${programOnSchedule.program.trainerFirstName} ${programOnSchedule.program.trainerLastName}`,
              }
            : null,
          dayOfWeek: programOnSchedule?.dayOfWeek.toString() ?? undefined,
          startTime: programOnSchedule?.startTime
            ? parseTimeStringToDate(programOnSchedule.startTime)
            : new Date(),
        }
      : {
          program: null,
          dayOfWeek: undefined,
          startTime: new Date(),
        },
  });

  useEffect(() => {
    setText(programOnSchedule?.program.name ?? defaultText);
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.program) return;

    const request: ManageTrainingProgramOnSchedule = {
      ...values,
      program: values.program,
      dayOfWeek: Number(values.dayOfWeek),
    };

    onSubmitModal(request).then(() => {
      setOpen(false);
      form.reset({});
      setText(defaultText);
    });
  };

  const changeProgram = (program?: TrainerProgram) => {
    if (program) {
      form.setValue("program", program, { shouldValidate: true });
      setText(program.name);
    } else {
      form.setValue("program", null, { shouldValidate: true });
      setText(defaultText);
    }
  };

  const handleOnOpenChangeModal = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
      setText(defaultText);
    }
    setOpen(isOpen);
  };

  var trainerProgram: TrainerProgram | undefined;
  if (programOnSchedule) {
    trainerProgram = {
      ...programOnSchedule.program,
      trainerName: `${programOnSchedule.program.trainerFirstName} ${programOnSchedule.program.trainerLastName}`,
    };
  }

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChangeModal}>
      <DialogTrigger asChild>
        {!isEdit ? (
          <Button
            size="sm"
            variant={"secondary"}
            className="self-center w-full"
          >
            <PlusIcon className="text-primary" />
            Add program
          </Button>
        ) : (
          <Button
            className="w-full justify-start rounded-none px-4 py-2 text-xs font-normal"
            size="sm"
            variant="ghost"
          >
            <PencilIcon className="mr-0 h-3.5 w-3.5" />
            Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Select Training Program</DialogTitle>
            <DialogDescription>
              Choose your training program, start day, and time. Click confirm
              when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <div className="space-y-2 py-2 w-[320px] pt-6">
              <FormField
                control={form.control}
                name="program"
                render={({}) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Program *</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-4">
                        <TrainerProgramSelector
                          onProgramSelected={changeProgram}
                          text={text}
                          selectedValue={trainerProgram}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs ml-0.5" />
                  </FormItem>
                )}
              />
              <SelectFormField
                control={form.control}
                name="dayOfWeek"
                label="Select day *"
                placeholder="Select a day"
                options={daysOfWeek}
              />

              <div className="pt-1">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      <FormControl>
                        <div className="flex flex-row items-center gap-1">
                          <TimePicker
                            date={new Date(field.value)}
                            setDate={(date) => field.onChange(date)}
                          />
                          <span className="text-sm mt-5 -translate-y-px">
                            Start time *
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs ml-0.5" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Form>
          <DialogFooter>
            <Button type="submit">Confirm</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditProgramOnScheduleModal;
