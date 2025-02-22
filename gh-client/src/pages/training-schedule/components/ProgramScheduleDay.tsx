import { TrainingProgramOnSchedule } from "@/api/models/training-program-on-schedule";
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format, getDayOfYear } from "date-fns";
import TrainingProgramCard from "./TrainingProgramCard";
import { Skeleton } from "@/components/ui/skeleton";

type ProgramScheduleDayProps = {
  forDay: Date;
  dayOfWeek: number;
  programs: TrainingProgramOnSchedule[];
  onViewDetails: (id: number) => void;
  loading: boolean;
};

export default function ProgramScheduleDay(props: ProgramScheduleDayProps) {
  const { forDay, dayOfWeek, programs, onViewDetails, loading } = props;
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
        // isTodaysDay && "bg-accent/5 dark:bg-accent/10",
        programs.length == 0 && "opacity-80"
      )}
    >
      <CardContent className="flex-grow p-0 flex flex-col">
        <div
          className={cn(
            "text-lg font-medium text-center bg-accent/25 dark:bg-accent/70 border border-l-0 border-r-0 border-b-2 p-1",
            isTodaysDay && "bg-primary/5 dark:bg-primary/5"
          )}
        >
          <p
            className={cn(
              "text-muted-foreground font-normal text-sm leading-none pt-1",
              isTodaysDay && "text-foreground/75"
            )}
          >
            {isTodaysDay && "Today, "}
            {format(forDay, "dd. MMM")}
          </p>
          <p className={cn("text-foreground")}>{format(forDay, "EEEE")}</p>
        </div>
        {!loading ? (
          <ScrollArea className="p-1.5 flex-1 flex">
            {programs.length == 0 ? (
              <div className="flex items-start justify-center">
                <p className="text-muted-foreground text-center font-light opacity-70 text-lg mt-4 italic">
                  Empty
                </p>
              </div>
            ) : (
              <div className="space-y-3 flex-1">
                {programs.map((program) => {
                  return (
                    <TrainingProgramCard
                      key={program.id}
                      isTodaysDay={isTodaysDay}
                      programOnSchedule={program}
                      onViewDetails={() => {
                        onViewDetails(program.program.id);
                      }}
                    />
                  );
                })}
              </div>
            )}
          </ScrollArea>
        ) : (
          <div className={cn("flex-1 flex p-2.5 flex-col gap-2.5")}>
            {[...Array((dayOfWeek % 3) + 1)].map((_, index) => (
              <Skeleton className={cn("w-full md:h-36 h-28")} />
            ))}
          </div>
        )}
      </CardContent>
    </div>
  );
}
