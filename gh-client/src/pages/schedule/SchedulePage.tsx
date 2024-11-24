import { Button } from "@/components/ui/button";
import TrainingProgramOnScheduleDialog from "./components/TrainingProgramOnScheduleDialog";
import TrainingWorkoutDialog from "../training-workout/TrainingWorkoutDialog";
import { DumbbellIcon } from "lucide-react";

export default function SchedulePage() {
  return (
    <div>
      <TrainingProgramOnScheduleDialog></TrainingProgramOnScheduleDialog>
      <TrainingWorkoutDialog>
        <Button className="" variant="secondary">
          <DumbbellIcon />
          Begin your workout
        </Button>
      </TrainingWorkoutDialog>
    </div>
  );
}
