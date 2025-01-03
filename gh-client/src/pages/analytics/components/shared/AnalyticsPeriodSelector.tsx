import RangedDatePicker from "@/components/primitives/RangedDatePicker";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { CalendarDaysIcon, CalendarRangeIcon } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

type AnalyticsPeriodSelectorProps = {
  onPeriodChange: (period?: DateRange) => void;
  initialPeriod?: DateRange;
};

export default function AnalyticsPeriodSelector(
  props: AnalyticsPeriodSelectorProps
) {
  const { onPeriodChange, initialPeriod } = props;
  const [selectedDate, setSelectedDate] = React.useState<DateRange | undefined>(
    initialPeriod
  );

  const handlePeriodChange = (date?: DateRange) => {
    setSelectedDate(date);
    onPeriodChange(date);
  };

  return (
    <div className="flex sm:flex-row-reverse flex-col-reverse lg:mr-0 gap-2 sm:mr-auto">
      <PeriodShortcutButtons onPeriodChange={handlePeriodChange} />
      <RangedDatePicker
        placeholder="Select date range..."
        date={selectedDate}
        onDateChange={handlePeriodChange}
        className="sm:w-[300px]"
      />
    </div>
  );
}

type Period = "week" | "month";

type PeriodShortcutButtonsProps = {
  onPeriodChange: (date: DateRange) => void;
};

function PeriodShortcutButtons(props: PeriodShortcutButtonsProps) {
  const { onPeriodChange } = props;
  const [selectedPeriod, setSelectedPeriod] = useState<Period>();

  const currentDate = new Date();

  const handlePeriodChange = (period: Period) => {
    setSelectedPeriod(period);
    if (period == "month") {
      onPeriodChange({
        from: startOfMonth(currentDate),
        to: endOfMonth(currentDate),
      });
    } else if (period == "week") {
      onPeriodChange({
        from: startOfWeek(currentDate, { weekStartsOn: 1 }),
        to: endOfWeek(currentDate, { weekStartsOn: 1 }),
      });
    }
  };

  return (
    <TooltipProvider>
      <div className="flex space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={selectedPeriod === "week" ? "secondary" : "ghost"}
              size="icon"
              className="flex items-center"
              onClick={() => handlePeriodChange("week")}
              aria-label="This Week"
            >
              <CalendarDaysIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Analytics for current week</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={selectedPeriod === "month" ? "secondary" : "ghost"}
              size="icon"
              className="flex items-center"
              onClick={() => handlePeriodChange("month")}
              aria-label="This Month"
            >
              <CalendarRangeIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Analytics for current month</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
