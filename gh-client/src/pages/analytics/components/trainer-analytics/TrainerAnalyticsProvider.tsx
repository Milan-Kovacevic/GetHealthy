import { getAllTrainingProgramsForTrainer } from "@/api/services/training-program-service";
import React, { useEffect, useState } from "react";
import {
  AnalyticsProgramExercise,
  AnalyticsProgram,
} from "@/api/models/analytics";
import { DateRange } from "react-day-picker";
import { TrainerAnalyticsContext } from "../../hooks/use-trainer-analytics";
import { TrainerProgram } from "@/api/models/training-program";

const exercises = [
  {
    id: 1,
    name: "Bench Press",
  },
  {
    id: 2,
    name: "Deadlift",
  },
  {
    id: 3,
    name: "Overhead Press",
  },
  {
    id: 4,
    name: "Pull-Up",
  },
];

type TrainerAnalyticsProviderProps = {
  children: React.ReactNode;
};

export default function TrainerAnalyticsProvider({
  children,
  ...props
}: TrainerAnalyticsProviderProps) {
  const [programs, setPrograms] = useState<TrainerProgram[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<DateRange | undefined>();
  const [selectedProgram, setSelectedProgram] = useState<AnalyticsProgram>();

  const userId = 2;
  useEffect(() => {
    getAllTrainingProgramsForTrainer(userId).then((programs) => {
      setPrograms(programs);
    });
  }, []);

  const changePeriod = (period?: DateRange) => {
    setSelectedPeriod(period);
  };

  const changeProgram = (program?: TrainerProgram) => {
    // TODO: fetch program participants and exercises for advanced analytics
    var mockExercises = exercises.slice((selectedProgram?.id ?? 0) % 3);
    setSelectedProgram(
      program
        ? {
            ...program,
            participants: [
              {
                id: 1,
                firstName: "Alex",
                lastName: "Doe",
                joinDate: "01/01/2025",
                dateOfBirth: "01/01/2001",
                gender: "MALE",
              },
              {
                id: 1,
                firstName: "Jhon",
                lastName: "Stock",
                joinDate: "02/01/2025",
                dateOfBirth: "01/01/2002",
                gender: "MALE",
              },
            ],
            exercises: mockExercises,
          }
        : undefined
    );
  };

  useEffect(() => {
    // Mocked
  }, [selectedPeriod]);

  return (
    <TrainerAnalyticsContext.Provider
      {...props}
      value={{
        programs: programs,
        selectedPeriod: selectedPeriod,
        selectedProgram: selectedProgram,
        onChangePeriod: changePeriod,
        onChangeProgram: changeProgram,
      }}
    >
      {children}
    </TrainerAnalyticsContext.Provider>
  );
}
