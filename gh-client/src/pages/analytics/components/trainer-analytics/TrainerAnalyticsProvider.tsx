import React, { useEffect, useState } from "react";
import { AnalyticsProgram } from "@/api/models/analytics";
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
  const [selectedPeriod, setSelectedPeriod] = useState<DateRange | undefined>();
  const [selectedAnalyticsProgram, setSelectedAnalyticsProgram] =
    useState<AnalyticsProgram>();
  const [loading, setLoading] = useState(false);

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
