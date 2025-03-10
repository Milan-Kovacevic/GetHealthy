import { AnalyticsProgram } from "@/api/models/analytics";
import { TrainerProgram } from "@/api/models/training-program";
import { createContext, useContext } from "react";
import { DateRange } from "react-day-picker";

type TrainerAnalyticsState = {
  selectedProgram?: AnalyticsProgram;
  selectedPeriod?: DateRange;
  onChangeProgram: (program?: TrainerProgram) => void;
  onChangePeriod: (period?: DateRange) => void;
  loading: boolean;
};

export const TrainerAnalyticsContext = createContext<TrainerAnalyticsState>({
  onChangePeriod: () => {},
  onChangeProgram: () => {},
  loading: false,
});

export default function useTrainerAnalytics() {
  const context = useContext(TrainerAnalyticsContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}
