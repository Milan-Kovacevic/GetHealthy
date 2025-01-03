import { AnalyticsExercise, AnalyticsProgram } from "@/api/models/analytics";
import { createContext, useContext } from "react";
import { DateRange } from "react-day-picker";

type TrainerAnalyticsState = {
  programs: AnalyticsProgram[];
  selectedProgram?: AnalyticsProgram;
  selectedPeriod?: DateRange;
  programExercises: AnalyticsExercise[];
  onChangeProgram: (program?: AnalyticsProgram) => void;
  onChangePeriod: (period?: DateRange) => void;
};

export const TrainerAnalyticsContext = createContext<TrainerAnalyticsState>({
  programs: [],
  onChangePeriod: () => {},
  onChangeProgram: () => {},
  programExercises: [],
});

export default function useTrainerAnalytics() {
  const context = useContext(TrainerAnalyticsContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}
