import {
  ManageTrainingProgramOnSchedule,
  TrainingProgramOnSchedule,
} from "@/api/models/training-program-on-schedule";
import { fetchTrainingProgamsOnSchedule } from "@/api/services/training-program-on-schedule-service";
import { ScheduleContext } from "@/pages/training-schedule/hooks/use-schedule";
import { startOfWeek } from "date-fns";
import React, { useEffect, useState } from "react";

type ScheduleProviderProps = {
  children: React.ReactNode;
};

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [programs, setPrograms] = useState<TrainingProgramOnSchedule[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchAndSortPrograms = async () => {
      try {
        const fetchedPrograms = await fetchTrainingProgamsOnSchedule();
        const sortedPrograms = fetchedPrograms.sort((a, b) => {
          const [aHours, aMinutes] = a.startTime.split(":").map(Number);
          const [bHours, bMinutes] = b.startTime.split(":").map(Number);
          const aTime = aHours * 60 + aMinutes;
          const bTime = bHours * 60 + bMinutes;
          return aTime - bTime;
        });

        setPrograms(sortedPrograms);
      } catch (error) {
        console.error("Error fetching training programs!", error);
      }
    };

    fetchAndSortPrograms();
  }, []);

  const addProgram = (program: TrainingProgramOnSchedule) => {
    setPrograms((prev) => [...prev, program]);
  };

  const editProgram = (
    id: number,
    updatedProgram: ManageTrainingProgramOnSchedule
  ) => {
    setPrograms((prev) =>
      prev.map((program) =>
        program.id === id
          ? {
              ...program,
              dayOfWeek: updatedProgram.dayOfWeek,
              startTime: updatedProgram.startTime,
            }
          : program
      )
    );
  };

  const removeProgram = (programId: number) => {
    setPrograms((prev) => prev.filter((program) => program.id !== programId));
  };

  const getProgramsForDay = (day: Date) => {
    const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDay = day.getDay() === 0 ? 7 : day.getDay(); // Handle Sunday as 7
    return programs.filter((program) => program.dayOfWeek === weekDay);
  };

  const value = {
    programs,
    currentDate,
    addProgram,
    editProgram,
    removeProgram,
    getProgramsForDay,
    setCurrentDate,
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};
