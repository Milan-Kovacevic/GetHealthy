import { SingleProgramParticipant } from "@/api/models/program-details";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";

const programs = [
  "Strength Training",
  "Cardio Fitness",
  "Flexibility and Yoga",
  "High-Intensity Interval Training",
];

type MoveParticipantDialogProps = {
  participant: SingleProgramParticipant;
  onCancel: () => void;
  onSubmit: (newProgramId: string) => void;
};

const BREAKPOINT_XL = 1280;

export default function MoveParticipantDialog(
  props: MoveParticipantDialogProps
) {
  const { participant, onCancel, onSubmit } = props;
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>();
  const showDialog = useMediaQuery(BREAKPOINT_XL);
  const handleSubmit = () => {
    if (selectedProgram) {
      onSubmit(selectedProgram);
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
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger id="program">
                <SelectValue placeholder="Select a program" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((program) => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
