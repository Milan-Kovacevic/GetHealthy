"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import SearchableSelect from './SearchableSelect';


const options = [
  { value: "beginner-strength-training", label: "Beginner Strength Training" },
  { value: "intermediate-hypertrophy", label: "Intermediate Hypertrophy" },
  { value: "advanced-powerlifting", label: "Advanced Powerlifting" },
  { value: "cardio-and-core", label: "Cardio and Core" },
  { value: "flexibility-and-yoga", label: "Flexibility and Yoga" },
];

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
]

export default function TrainingProgramModal() {
  const [open, setOpen] = useState(false)
  const [program, setProgram] = useState("")
  const [startDay, setStartDay] = useState("")
  const [startTime, setStartTime] = useState("")

  const handleConfirm = () => {
    console.log("Selected Program:", program)
    console.log("Start Day:", startDay)
    console.log("Start Time:", startTime)
    setOpen(false)
  }

  const handleChange = (value:any) => {
    console.log('Selected value:', value);
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
            Choose your training program, start day, and time. Click confirm when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="program" className="text-right">
              Program
            </Label>
            <SearchableSelect className="col-span-3" options={options} onValueChange={handleChange}>

            </SearchableSelect>

          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDay" className="text-right">
              Start Day
            </Label>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startTime" className="text-right">
              Start Time
            </Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}