import { SingleProgramParticipant } from "@/api/models/program-details";
import { TrainerProgram } from "@/api/models/training-program";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ChevronsDownIcon, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

type MoveParticipantDialogProps = {
  programs: TrainerProgram[];
  participant: SingleProgramParticipant;
  onCancel: () => void;
  onSubmit: (newProgramId: number) => void;
};

const BREAKPOINT_XL = 1280;

export default function MoveParticipantDialog(
  props: MoveParticipantDialogProps
) {
  const userId = 1; // TODO: Hardcoded for now...
  const { participant, onCancel, onSubmit, programs } = props;
  const [selectedProgram, setSelectedProgram] = useState<TrainerProgram>();
  const showDialog = useMediaQuery(BREAKPOINT_XL);

  const handleSubmit = () => {
    if (selectedProgram) {
      onSubmit(selectedProgram.id);
    }
  };

  const FormActions = () => {
    return (
      <>
        <Button variant="outline" onClick={onCancel} className="min-w-32 px-4">
          Cancel
        </Button>
        <Button
          className="min-w-32 px-4"
          onClick={handleSubmit}
          disabled={!selectedProgram}
        >
          Move to program
        </Button>
      </>
    );
  };

  const FormContent = () => {
    return (
      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="program" className="text-sm">
              Select training program for{" "}
              <span className="font-semibold">
                {participant.firstName} {participant.lastName}
              </span>
            </label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between font-normal"
                >
                  {selectedProgram ? selectedProgram.name : "Select program"}
                  <ChevronsDownIcon className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command className="">
                  {programs.length > 0 && (
                    <CommandInput placeholder="Search for programs ..." />
                  )}
                  <CommandList className="w-[300px]">
                    <CommandEmpty className="text-sm font-mediun italic text-muted-foreground p-3 px-4">
                      No training programs to show.
                    </CommandEmpty>
                    <CommandGroup>
                      {programs.map((program: any) => (
                        <CommandItem
                          key={program.id}
                          value={`${program.name}`}
                          onSelect={() => {
                            setSelectedProgram(program);
                          }}
                        >
                          {program.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {/* <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger id="program">
                <SelectValue placeholder="Select a program" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((program) => (
                  <SelectItem key={program.id} value={`${program.id}`}>
                    {program.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>
        </div>
      </form>
    );
  };

  return showDialog ? (
    <Dialog open={true}>
      <DialogContent className="max-w-[440px]">
        <DialogHeader>
          <DialogTitle>Change Training Program</DialogTitle>
          <DialogDescription>
            {" "}
            You are about to move this trainee from the current training program
          </DialogDescription>
        </DialogHeader>
        <FormContent />
        <DialogFooter className="mt-2 flex justify-end gap-2">
          <FormActions />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Card className="md:min-w-[420px] h-fit max-w-[420px] shadow-md dark:shadow-sm dark:shadow-white/15 md:mx-2 md:my-2 xl:block hidden">
      <CardHeader>
        <CardTitle className="text-xl">Change Training Program</CardTitle>
        <p className="text-muted-foreground text-sm">
          You are about to move this trainee from the current training program
        </p>
      </CardHeader>
      <CardContent>
        <FormContent />
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <FormActions />
      </CardFooter>
    </Card>
  );
}
