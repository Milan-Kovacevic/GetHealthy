"use client";

import * as React from "react";
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
import { Label } from "@/components/ui/label";

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

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimePicker } from "./TimePicker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const options = [
  { value: "beginner-strength-training", label: "Beginner Strength Training" },
  { value: "intermediate-hypertrophy", label: "Intermediate Hypertrophy" },
  { value: "advanced-powerlifting", label: "Advanced Powerlifting" },
  { value: "cardio-and-core", label: "Cardio and Core" },
  { value: "flexibility-and-yoga", label: "Flexibility and Yoga" },
];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function TrainingProgramModal() {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  const form = useForm();

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [program, setProgram] = useState("");
  const [startDay, setStartDay] = useState("");
  const [startTime, setStartTime] = useState("");

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleConfirm = () => {
    console.log("Selected Program:", program);
    console.log("Start Day:", startDay);
    console.log("Start Time:", startTime);
    setOpen(false);
  };

  const handleChange = (value: any) => {
    setProgram(value);
    console.log("Selected value:", value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Select Training Program</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
              render={() => (
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
                            className="w-[200px] justify-between"
                          >
                            {program
                              ? options.find(
                                  (option) => option.value === program
                                )?.label
                              : "Select program..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="day"
              render={() => (
                <FormItem>
                  <FormLabel>Select Day</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-4">
                      <Select onValueChange={setStartDay} value={startDay}>
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={() => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-4">
                      <TimePicker date={startDate} setDate={setStartDate} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={() => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-4">
                      <TimePicker date={endDate} setDate={setEndDate} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </Form>
        <DialogFooter>
          <Button type="submit" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
