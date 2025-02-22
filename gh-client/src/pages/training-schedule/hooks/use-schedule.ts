import {
  ManageTrainingProgramOnSchedule,
  TrainingProgramOnSchedule,
} from "@/api/models/training-program-on-schedule";
import { createContext, useContext } from "react";

type ScheduleContextState = {
  programs: TrainingProgramOnSchedule[];
  loadingSchedule: boolean;
  currentDate: Date;
  onAddProgram: (program: ManageTrainingProgramOnSchedule) => Promise<void>;
  onEditProgram: (
    id: number,
    updatedProgram: ManageTrainingProgramOnSchedule
  ) => Promise<void>;
  onRemoveProgram: (programId: number) => void;
  getProgramsForDay: (day: Date) => TrainingProgramOnSchedule[];
  setCurrentDate: (date: Date) => void;
};

export const ScheduleContext = createContext<ScheduleContextState | null>(null);

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context!;
};
