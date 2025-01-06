import { getAllTrainingProgramsForTrainer } from "@/api/services/training-program-service";
import React, { useEffect, useState } from "react";
import { AnalyticsProgram } from "@/api/models/trainer-analytics";
import { DateRange } from "react-day-picker";
import { TrainerAnalyticsContext } from "../../hooks/use-trainer-analytics";
import { TrainerProgram } from "@/api/models/training-program";
import {
  getAnalyticsProgramExercises,
  getAnalyticsProgramParticipants,
} from "@/api/services/trainer-analytics-service";

type TrainerAnalyticsProviderProps = {
  children: React.ReactNode;
};

export default function TrainerAnalyticsProvider({
  children,
  ...props
}: TrainerAnalyticsProviderProps) {
  const [programs, setPrograms] = useState<TrainerProgram[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<DateRange | undefined>();
  const [selectedAnalyticsProgram, setSelectedAnalyticsProgram] =
    useState<AnalyticsProgram>();
  const [loading, setLoading] = useState(false);

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
    if (!program) {
      setSelectedAnalyticsProgram(undefined);
      return;
    }
    if (program.id == selectedAnalyticsProgram?.id) return;

    setLoading(true);
    Promise.all([
      getAnalyticsProgramExercises(program.id),
      getAnalyticsProgramParticipants(program.id),
    ])
      .then((values) => {
        setSelectedAnalyticsProgram((prev) => {
          return {
            ...prev!,
            ...program,
            exercises: values[0],
            participants: values[1],
          };
        });
      })
      .finally(() => {
        setLoading(false);
      });
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
        selectedProgram: selectedAnalyticsProgram,
        onChangePeriod: changePeriod,
        onChangeProgram: changeProgram,
        loading: loading,
      }}
    >
      {children}
    </TrainerAnalyticsContext.Provider>
  );
}
