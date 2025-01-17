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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import {
  CreateTrainingProgramOnScheduleDTO,
  EditTrainingProgramOnScheduleDTO,
} from "@/api/contracts/training-program-on-schedule-contract";
import { TrainerProgram } from "@/api/models/training-program";
import { TrainingProgramOnSchedule } from "@/api/models/training-program-on-schedule";
import {
  createTrainingProgramOnSchedule,
  editTrainingProgramOnSchedule,
} from "@/api/services/training-program-on-schedule-service";
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
import { toast } from "sonner";
import { z } from "zod";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const formSchema = z.object({
  program: z
    .object({
      id: z.number(),
      name: z.string(),
      createdAt: z.string(),
      description: z.string(),
      trainerName: z.string(),
    })
    .nullable()
    .refine((val) => val !== null && val.id > 0, {
      message: "Please select a program.",
    }),

  dayOfWeek: z
    .number()
    .min(1)
    .max(7, { message: "Please select a valid day of the week." }),

  startTime: z.date().refine((val) => !isNaN(new Date(val).getTime()), {
    message: "Please enter a valid start time.",
  }),
});

export type CreateEditProgramOnScheduleModalProps = {
  isEdit?: boolean;
  programOnSchedule?: TrainingProgramOnSchedule;
  onEditProgramOnSchedule?: (
    programOnSchedule: TrainingProgramOnSchedule
  ) => void;
};

export const CreateEditProgramOnScheduleModal = ({
  isEdit = false,
  programOnSchedule,
  onEditProgramOnSchedule,
}: CreateEditProgramOnScheduleModalProps) => {
  const defaultText = "Select training program ...";
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(defaultText);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          program: programOnSchedule ? programOnSchedule.program : null,
          dayOfWeek: programOnSchedule?.dayOfWeek ?? undefined,
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
    setOpen(false);
    form.reset({});
    setText(defaultText);

    console.log(
      values.startTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    if (isEdit && programOnSchedule && values.program) {
      programOnSchedule = {
        id: programOnSchedule.id,
        ...values,
        startTime: values.startTime.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        program: {
          ...values.program,
          trainingDuration: programOnSchedule.program.trainingDuration,
        },
      };

      onEditProgramOnSchedule?.(programOnSchedule);
    }

    try {
      isEdit
        ? await editTrainingProgramOnSchedule({
            ...values,
            program: values.program,
            id: programOnSchedule?.id,
          } as EditTrainingProgramOnScheduleDTO)
        : await createTrainingProgramOnSchedule(
            values as CreateTrainingProgramOnScheduleDTO
          );
      toast.success(
        `Successfully ${
          isEdit ? "edited" : "created"
        } training program on schedule!`
      );
    } catch {
      toast.error(
        `Could not ${isEdit ? "edit" : "create"} training program on schedule!`
      );
    }
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

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChangeModal}>
      <DialogTrigger asChild>
        {!isEdit ? (
          <Button
            size="sm"
            variant={"secondary"}
            className="self-center border-primary border w-full"
          >
            <PlusIcon className="" />
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
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Select Training Program</DialogTitle>
            <DialogDescription>
              Choose your training program, start day, and time. Click confirm
              when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-4">
                        <TrainerProgramSelector
                          onProgramSelected={changeProgram}
                          text={text}
                          selectedValue={programOnSchedule?.program}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dayOfWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Day</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-4">
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value?.toString()}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a day" />
                          </SelectTrigger>
                          <SelectContent>
                            {daysOfWeek.map((day, index) => (
                              <SelectItem
                                key={day}
                                value={(index + 1).toString()}
                              >
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row sm:gap-x-8 gap-x-4 flex-wrap">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-4">
                          <TimePicker
                            date={new Date(field.value)}
                            setDate={(date) => field.onChange(date)}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
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
