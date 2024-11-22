import React from "react";
import TrainingProgramOnScheduleDialog from "./components/TrainingProgramOnScheduleDialog";
import { Button } from "@/components/ui/button";

export default function SchedulePage() {
  return (
    <div>
      <TrainingProgramOnScheduleDialog></TrainingProgramOnScheduleDialog>
      <Button>Begin workout</Button>
    </div>
  );
}
