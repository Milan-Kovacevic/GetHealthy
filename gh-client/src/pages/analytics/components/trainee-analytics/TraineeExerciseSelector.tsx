import { AnalyticsProgramParticipant } from "@/api/models/trainer-analytics";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format, formatDate, formatDistanceToNow } from "date-fns";
import { ChevronsDownIcon, ChevronsUpDownIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

type TraineeExerciseSelectorProps = {
  onExerciseSelected: (participant?: AnalyticsProgramParticipant) => void;
  exercises: AnalyticsProgramParticipant[];
  text: string;
  placeholder: string;
  className?: string;
};

export default function TraineeExerciseSelector(
  props: TraineeExerciseSelectorProps
) {
  const { onExerciseSelected, text, placeholder, exercises, className } = props;
  const [open, setOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] =
    useState<AnalyticsProgramParticipant>();

  const handeExerciseSelected = (participant?: AnalyticsProgramParticipant) => {
    setOpen(false);
    onExerciseSelected(participant);
    setSelectedExercise(participant);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between font-normal truncate", className)}
        >
          {text}

          {selectedExercise ? (
            <div
              className="px-0 opacity-50 hover:opacity-75"
              onClick={() => handeExerciseSelected(undefined)}
            >
              <XIcon />
            </div>
          ) : (
            <ChevronsUpDownIcon className="opacity-50" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command className="">
          {exercises.length > 0 && <CommandInput placeholder={placeholder} />}
          <CommandList className="w-[320px]">
            <CommandEmpty className="text-sm font-mediun italic text-muted-foreground p-3 px-4">
              {placeholder}
            </CommandEmpty>
            <CommandGroup>
              <ScrollArea>
                <div className="max-h-[200px] w-full">
                  <div className="flex w-full flex-col items-center">
                    {exercises.map((participant) => (
                      <CommandItem
                        key={participant.id}
                        value={`${participant.firstName} ${participant.lastName}`}
                        onSelect={() => {
                          handeExerciseSelected(participant);
                        }}
                        className={cn(
                          "w-full cursor-pointer",
                          selectedExercise?.id == participant.id &&
                            "bg-accent/50 text-accent-foreground border-primary border-b rounded-b-none"
                        )}
                      >
                        <div className="p-0.5">
                          <div className="leading-tight flex flex-row gap-1.5 items-center">
                            <p className="font-normal">
                              {`${participant.firstName} ${participant.lastName}`}
                            </p>
                            <span className="text-muted-foreground text-sm">
                              •
                            </span>
                            <span className="lowercase text-muted-foreground text-xs ml-1">
                              {participant.gender} |{" "}
                              {format(participant.dateOfBirth!, "dd.MM.yyyy")}
                            </span>
                          </div>

                          <p className="text-muted-foreground text-[11px]">
                            Joined:{" "}
                            {formatDistanceToNow(participant.joinDate, {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </CommandItem>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
