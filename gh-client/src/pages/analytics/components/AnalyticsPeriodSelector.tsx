import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import {
  CalendarDaysIcon,
  CalendarIcon,
  CalendarRangeIcon,
} from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

export default function AnalyticsPeriodSelector() {
  return (
    <div className="flex lg:flex-row sm:flex-row-reverse flex-col-reverse lg:mr-0 gap-2 sm:mr-auto">
      <ShortcutButtons />
      <RangedDatePicker className="sm:w-[300px] " />
    </div>
  );
}

type Period = "week" | "month";

function ShortcutButtons() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("week");

  const handlePeriodChange = (period: Period) => {
    setSelectedPeriod(period);
    // Add your logic for period change here
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

function RangedDatePicker({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
