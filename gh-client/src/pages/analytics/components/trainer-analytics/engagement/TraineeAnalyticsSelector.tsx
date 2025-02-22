import { AnalyticsProgramParticipant } from "@/api/models/analytics";
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
import { format, formatDistanceToNow } from "date-fns";
import { ChevronsUpDownIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

type TraineeAnalyticsSelectorProps = {
  onParticipantSelected: (participant?: AnalyticsProgramParticipant) => void;
  participants: AnalyticsProgramParticipant[];
  text: string;
  placeholder: string;
  className?: string;
  initialParticipant?: AnalyticsProgramParticipant;
};

export default function TraineeAnalyticsSelector(
  props: TraineeAnalyticsSelectorProps
) {
  const {
    onParticipantSelected,
    text,
    placeholder,
    participants,
    className,
    initialParticipant,
  } = props;
  const [open, setOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<
    AnalyticsProgramParticipant | undefined
  >(initialParticipant);

  const handeParticipantSelected = (
    participant?: AnalyticsProgramParticipant
  ) => {
    setOpen(false);
    onParticipantSelected(participant);
    setSelectedParticipant(participant);
  };
  useEffect(() => {}, [selectedParticipant]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between font-normal truncate", className)}
        >
          {text}

          {selectedParticipant ? (
            <div
              className="px-0 opacity-50 hover:opacity-75"
              onClick={() => handeParticipantSelected(undefined)}
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
          {participants.length > 0 && (
            <CommandInput placeholder="Search for programs ..." />
          )}
          <CommandList className="w-[320px]">
            <CommandEmpty className="text-sm font-mediun italic text-muted-foreground p-3 px-4">
              {placeholder}
            </CommandEmpty>
            <CommandGroup>
              <ScrollArea>
                <div className="max-h-[200px] w-full">
                  <div className="flex w-full flex-col items-center">
                    {participants.map((participant) => (
                      <CommandItem
                        key={participant.id}
                        value={`${participant.firstName} ${participant.lastName}`}
                        onSelect={() => {
                          handeParticipantSelected(participant);
                        }}
                        className={cn(
                          "w-full cursor-pointer",
                          selectedParticipant?.id == participant.id &&
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
                              {participant.gender}{" "}
                              {participant.dateOfBirth &&
                                `| ${format(
                                  participant.dateOfBirth!,
                                  "dd.MM.yyyy"
                                )}`}
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
