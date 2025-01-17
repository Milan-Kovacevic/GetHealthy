import {
  ManageTrainingProgramOnSchedule,
  TrainingProgramOnSchedule,
} from "@/api/models/training-program-on-schedule";
import { createContext, useContext } from "react";

type ScheduleContextState = {
  programs: TrainingProgramOnSchedule[];
  currentDate: Date;
  addProgram: (program: TrainingProgramOnSchedule) => void;
  editProgram: (
    id: number,
    updatedProgram: ManageTrainingProgramOnSchedule
  ) => void;
  removeProgram: (programId: number) => void;
  getProgramsForDay: (day: Date) => TrainingProgramOnSchedule[];
  setCurrentDate: (date: Date) => void;
};

export const ScheduleContext = createContext<ScheduleContextState | null>(null);

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
};
