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
import { ChevronsDownIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

type TraineeAnalyticsSelectorProps = {
  onParticipantSelected: (participant?: AnalyticsProgramParticipant) => void;
  participants: AnalyticsProgramParticipant[];
  text: string;
  placeholder: string;
  className?: string;
};

export default function TraineeAnalyticsSelector(
  props: TraineeAnalyticsSelectorProps
) {
  const { onParticipantSelected, text, placeholder, participants, className } =
    props;
  const [open, setOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] =
    useState<AnalyticsProgramParticipant>();

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
            <ChevronsDownIcon className="opacity-50" />
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
              <ScrollArea className="h-[200px] max-h-[200px]">
                {participants.map((participant) => (
                  <CommandItem
                    key={participant.id}
                    value={`${participant.firstName} ${participant.lastName}`}
                    onSelect={() => {
                      handeParticipantSelected(participant);
                    }}
                  >
                    {`${participant.firstName} ${participant.lastName}`}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
