import { getAllTrainingProgramsForTrainer } from "@/api/services/training-program-service";
import React, { useEffect, useState } from "react";
import { AnalyticsExercise, AnalyticsProgram } from "@/api/models/analytics";
import { DateRange } from "react-day-picker";
import { TrainerAnalyticsContext } from "../../hooks/use-trainer-analytics";

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
  const [programs, setPrograms] = useState<AnalyticsProgram[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<DateRange | undefined>();
  const [selectedProgram, setSelectedProgram] = useState<AnalyticsProgram>();
  const [programExercises, setProgramExercises] = useState<AnalyticsExercise[]>(
    []
  );

  const userId = 2;
  useEffect(() => {
    getAllTrainingProgramsForTrainer(userId).then((programs) => {
      setPrograms(programs);
    });
  }, []);

  const changePeriod = (period?: DateRange) => {
    setSelectedPeriod(period);
  };

  const changeProgram = (program?: AnalyticsProgram) => {
    setSelectedProgram(program);
  };

  useEffect(() => {
    // Mocked
    if (!selectedProgram) {
      setProgramExercises([]);
      return;
    }
    setProgramExercises(exercises.slice((selectedProgram?.id ?? 0) % 3));
  }, [selectedProgram]);

  return (
    <TrainerAnalyticsContext.Provider
      {...props}
      value={{
        programs: programs,
        programExercises: programExercises,
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
