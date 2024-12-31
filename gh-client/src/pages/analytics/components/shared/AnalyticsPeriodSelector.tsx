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

export default function AnalyticsPeriodSelector() {
  const [selectedDate, setSelectedDate] = React.useState<DateRange | undefined>(
    {
      from: new Date(2022, 0, 20),
      to: addDays(new Date(2022, 0, 20), 20),
    }
  );

  return (
    <div className="flex lg:flex-row sm:flex-row-reverse flex-col-reverse lg:mr-0 gap-2 sm:mr-auto">
      <PeriodShortcutButtons onPeriodChange={setSelectedDate} />
      <RangedDatePicker
        date={selectedDate}
        onDateChange={setSelectedDate}
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
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("week");

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
    console.log(`Selected period: ${period}`);
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
