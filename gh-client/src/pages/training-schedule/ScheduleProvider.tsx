// src/context/ScheduleProvider.tsx
import { ProgramDifficulty } from "@/api/enums/program-difficulty";
import { TrainingProgramOnSchedule } from "@/api/models/training-program-on-schedule";
import { ScheduleContext } from "@/hooks/use-schedule";
import { startOfWeek } from "date-fns";
import React, { useEffect, useState } from "react";

type ScheduleProviderProps = {
  children: React.ReactNode;
};

const testData: TrainingProgramOnSchedule[] = [
  {
    id: 1,
    dayOfWeek: 1, // Monday
    startTime: "08:00",
    trainingDuration: 60,
    program: {
      id: 101,
      name: "Morning Yoga",
      createdAt: "2025-01-01T07:00:00Z",
      description: "A relaxing yoga session to start your day.",
      trainerFirstName: "Alice",
      trainerLastName: "Smith",
      difficulty: ProgramDifficulty.BEGINNER,
      categories: [
        { categoryId: 1, name: "Yoga" },
        { categoryId: 2, name: "Wellness" },
      ],
    },
  },
  {
    id: 2,
    dayOfWeek: 3, // Wednesday
    startTime: "18:30",
    trainingDuration: 120,
    program: {
      id: 102,
      name: "Strength Training",
      createdAt: "2024-12-15T14:30:00Z",
      description: "A high-intensity strength training session.",
      trainerFirstName: "John",
      trainerLastName: "Doe",
      difficulty: ProgramDifficulty.ADVANCED,
      categories: [
        { categoryId: 3, name: "Strength" },
        { categoryId: 4, name: "Fitness" },
      ],
    },
  },
  {
    id: 3,
    dayOfWeek: 5, // Friday
    startTime: "07:00",
    trainingDuration: 45,
    program: {
      id: 103,
      name: "HIIT Workout",
      createdAt: "2025-01-10T10:00:00Z",
      description: "A fast-paced, high-intensity interval training session.",
      trainerFirstName: "Michael",
      trainerLastName: "Johnson",
      difficulty: ProgramDifficulty.INTERMEDIATE,
      categories: [
        { categoryId: 5, name: "HIIT" },
        { categoryId: 6, name: "Cardio" },
      ],
    },
  },
  {
    id: 4,
    dayOfWeek: 6, // Saturday
    startTime: "10:00",
    trainingDuration: 120,
    program: {
      id: 104,
      name: "Pilates Core",
      createdAt: "2025-01-12T09:00:00Z",
      description: "A Pilates session focusing on core strength.",
      trainerFirstName: "Emily",
      trainerLastName: "Brown",
      difficulty: ProgramDifficulty.BEGINNER,
      categories: [
        { categoryId: 7, name: "Pilates" },
        { categoryId: 8, name: "Core" },
      ],
    },
  },
];

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [programs, setPrograms] = useState<TrainingProgramOnSchedule[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // fetch prgorams from backend
    const sortedPrograms = [...testData].sort((a, b) => {
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
