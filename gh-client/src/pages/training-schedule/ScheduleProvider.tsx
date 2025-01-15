// src/context/ScheduleProvider.tsx
import { TrainingProgramOnSchedule } from "@/api/models/training-program-on-schedule";
import { ScheduleContext } from "@/hooks/use-schedule";
import { startOfWeek } from "date-fns";
import React, { useEffect, useState } from "react";

type ScheduleProviderProps = {
  children: React.ReactNode;
};

const mockPrograms: TrainingProgramOnSchedule[] = [
  {
    id: 1,
    dayOfWeek: 1,
    startTime: "13:00",
    trainingDuration: 300,
    program: {
      id: 1,
      name: "Morning Yoga",
      createdAt: "2025-01-01T00:00:00.000Z",
      description: "Start your day with energizing yoga",
      trainerName: "Marko Markovic",
    },
  },
  {
    id: 2,
    dayOfWeek: 3,
    startTime: "13:00",
    trainingDuration: 500,
    program: {
      id: 2,
      name: "HIIT Workout",
      createdAt: "2025-01-01T00:00:00.000Z",
      description: "High-intensity interval training",
      trainerName: "Marko Markovic",
    },
  },
  {
    id: 3,
    dayOfWeek: 4,
    startTime: "00:00",
    trainingDuration: 100,
    program: {
      id: 3,
      name: "Strength Training",
      createdAt: "2025-01-01T00:00:00.000Z",
      description: "Build muscle and strength with our structured workout.",
      trainerName: "Anna Smith",
    },
  },
  {
    id: 4,
    dayOfWeek: 6,
    startTime: "20:00",
    trainingDuration: 240,
    program: {
      id: 3,
      name: "Strength Training",
      createdAt: "2025-01-01T00:00:00.000Z",
      description: "Build muscle and strength with our structured workout.",
      trainerName: "Anna Smith",
    },
  },
];

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [programs, setPrograms] = useState<TrainingProgramOnSchedule[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // fetch prgorams from backend
    const sortedPrograms = [...mockPrograms].sort((a, b) => {
      const [aHours, aMinutes] = a.startTime.split(":").map(Number);
      const [bHours, bMinutes] = b.startTime.split(":").map(Number);
      const aTime = aHours * 60 + aMinutes;
      const bTime = bHours * 60 + bMinutes;
      return aTime - bTime;
    });
    setPrograms(sortedPrograms);
  }, []);

  const addProgram = (program: TrainingProgramOnSchedule) => {
    setPrograms((prev) => [...prev, program]);
  };

  const editProgram = (updatedProgram: TrainingProgramOnSchedule) => {
    setPrograms((prev) =>
      prev.map((program) =>
        program.id === updatedProgram.id ? updatedProgram : program
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
