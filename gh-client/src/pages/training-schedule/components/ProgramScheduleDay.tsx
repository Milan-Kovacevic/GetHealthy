import { TrainingProgramOnSchedule } from "@/api/models/training-program-on-schedule";
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ScheduleTrainingStatus } from "@/utils/date-time-utils";
import { format, getDayOfYear } from "date-fns";
import TrainingProgramCard from "./TrainingProgramCard";

type ProgramScheduleDayProps = {
  forDay: Date;
  dayOfWeek: number;
  programs: TrainingProgramOnSchedule[];
  getProgramStatus: (
    programOnSchedule: TrainingProgramOnSchedule
  ) => ScheduleTrainingStatus;
  onViewDetails: (id: number) => void;
};

export default function ProgramScheduleDay(props: ProgramScheduleDayProps) {
  const { forDay, dayOfWeek, programs, getProgramStatus, onViewDetails } =
    props;
  const lastDayOfWeek = 7;

  const activeDayOfYear = getDayOfYear(forDay);
  const todaysDayOfYear = getDayOfYear(new Date());
  const isTodaysDay = activeDayOfYear === todaysDayOfYear;

  return (
    <div
      className={cn(
        "flex flex-col rounded-none border border-b-2",
        dayOfWeek === 1 && "border-l-2 rounded-bl-lg",
        dayOfWeek === lastDayOfWeek && "border-r-2 rounded-br-lg",
        isTodaysDay && "border-t-0 bg-secondary/15 dark:bg-secondary/15",
        programs.length == 0 && "opacity-80"
        // activeDayOfYear < todaysDayOfYear && "bg-muted/30 dark:bg-muted/40"
      )}
    >
      <CardContent className="flex-grow p-0 flex flex-col">
        <div
          className={cn(
            "text-lg font-semibold text-center bg-accent/25 dark:bg-accent/70 border border-l-0 border-r-0 border-b-2 p-1",
            isTodaysDay && "border-primary border-2 dark:border-primary/45"
          )}
        >
          <p className="text-muted-foreground font-medium text-sm leading-none pt-1">
            {isTodaysDay && "Today, "}
            {format(forDay, "dd. MMM")}
          </p>
          <p className="text-foreground">{format(forDay, "EEEE")}</p>
        </div>
        <ScrollArea className="p-3.5 flex-1 flex">
          {programs.length == 0 ? (
            <div className="flex items-start justify-center">
              <p className="text-muted-foreground text-center font-light opacity-70 text-lg mt-4 italic">
                Empty
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 flex-1">
              {programs.map((program) => {
                return (
                  <TrainingProgramCard
                    key={program.id}
                    programOnSchedule={program}
                    onViewDetails={() => {
                      onViewDetails(program.id);
                    }}
                    programStatus={getProgramStatus(program)}
                    editable={true}
                  />
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </div>
  );
}
