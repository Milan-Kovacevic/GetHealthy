import { TrainerProgram } from "@/api/models/training-program";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import AnalyticsPeriodSelector from "../shared/AnalyticsPeriodSelector";
import { CircleIcon } from "lucide-react";
import TrainerProgramSelector from "@/pages/shared/TrainerProgramSelector";

type TrainerAnalyticsSelectorProps = {
  programs: TrainerProgram[];
  onPeriodChange: (period?: DateRange) => void;
  onProgramChange: (program: TrainerProgram) => void;
};

export default function TrainerAnalyticsSelector(
  props: TrainerAnalyticsSelectorProps
) {
  const { programs: trainerPrograms, onPeriodChange, onProgramChange } = props;
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>();
  const [selectedProgram, setSelectedProgram] = useState<TrainerProgram>();

  const handleProgamChange = (program: TrainerProgram) => {
    setSelectedProgram(program);
    onProgramChange(program);
  };

  const handlePeriodChange = (period?: DateRange) => {
    setSelectedDate(period);
    onPeriodChange(period);
  };

  return (
    <div className="w-full flex md:flex-row flex-col md:items-center gap-x-5 gap-y-2 mb-3">
      <AnalyticsPeriodSelector
        initialPeriod={selectedDate}
        onPeriodChange={handlePeriodChange}
      />
      {selectedDate && (
        <>
          <CircleIcon className="h-2 w-2 fill-border text-border md:block hidden" />
          <TrainerProgramSelector
            text={
              selectedProgram
                ? selectedProgram.name
                : "Show data for training program..."
            }
            programs={trainerPrograms}
            onProgramSelected={handleProgamChange}
            className="sm:max-w-sm md:max-w-xs max-w-none w-full"
          />
        </>
      )}
    </div>
  );
}
