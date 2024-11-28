"use client";

import { useState } from "react";
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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Check, ChevronsUpDown, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TimePicker } from "@/components/primitives/TimePicker";

const options = [
  { value: "beginner-strength-training", label: "Beginner Strength Training" },
  { value: "intermediate-hypertrophy", label: "Intermediate Hypertrophy" },
  { value: "advanced-powerlifting", label: "Advanced Powerlifting" },
  { value: "cardio-and-core", label: "Cardio and Core" },
  { value: "flexibility-and-yoga", label: "Flexibility and Yoga" },
] as const;

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const formSchema = z
  .object({
    program: z
      .string({
        required_error: "Please select a program.",
        invalid_type_error: "That's not a valid program.",
      })
      .refine(
        (val) => options.some((option) => option.value === val),
        "Please select a program."
      ),

    day: z.enum(daysOfWeek, {
      required_error: "Please select a day.",
      invalid_type_error: "That's not a valid day.",
    }),

    startTime: z.date().refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Please enter a valid start time.",
    }),

    endTime: z.date().refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Please enter a valid end time.",
    }),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "End time must be after the start time.",
    path: ["endTime"], // This specifies which field the error is associated with
  });

export default function AddProgramToScheduleModal() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      program: "",
      day: undefined,
      startTime: new Date(),
      endTime: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setOpen(false);
  }

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [program, setProgram] = useState("");

  const handleChange = (value: any) => {
    setProgram(value);
    console.log("Selected value:", value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant={"secondary"}
          className="self-center border-primary border w-full"
        >
          <PlusIcon className="" />
          Add program
        </Button>
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
                        <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="justify-between"
                            >
                              {field.value
                                ? options.find(
                                    (option) => option.value === program
                                  )?.label
                                : "Select program..."}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search program..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No program found.</CommandEmpty>
                                <CommandGroup>
                                  {options.map((option: any) => (
                                    <CommandItem
                                      key={option.value}
                                      value={option.value}
                                      onSelect={(currentValue) => {
                                        handleChange(
                                          currentValue === program
                                            ? ""
                                            : currentValue
                                        );
                                        field.onChange(
                                          currentValue === program
                                            ? ""
                                            : currentValue
                                        );
                                        setSearchOpen(false);
                                      }}
                                    >
                                      {option.label}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          program === option.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Day</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-4">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a day" />
                          </SelectTrigger>
                          <SelectContent>
                            {daysOfWeek.map((day) => (
                              <SelectItem key={day} value={day}>
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
              <div className="flex flex-row gap-8">
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
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
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
}
