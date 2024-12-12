import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserX, UserPlus, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Trainee = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  medicalHistory: string;
};

const initialTrainees: Trainee[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 25,
    gender: "Male",
    medicalHistory: "No significant medical history.",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    age: 30,
    gender: "Female",
    medicalHistory: "Mild asthma, controlled with inhaler.",
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Johnson",
    age: 28,
    gender: "Male",
    medicalHistory: "Previous knee injury, fully recovered.",
  },
];

const programs = [
  "Strength Training",
  "Cardio Fitness",
  "Flexibility and Yoga",
  "High-Intensity Interval Training",
];

export default function ProgramParticipantsList() {
  const [trainees, setTrainees] = useState<Trainee[]>(initialTrainees);
  const [moveParticipant, setMoveParticipant] = useState<Trainee | null>(null);
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>();

  const removeTrainee = (id: number) => {
    setTrainees(trainees.filter((trainee) => trainee.id !== id));
  };

  const moveTrainee = (id: number) => {
    removeTrainee(id);
    setMoveParticipant(null);
    setSelectedTrainee(null);
  };

  const handleSubmit = () => {
    if (selectedProgram && selectedTrainee) {
      moveTrainee(selectedTrainee.id);
    }
  };

  return (
    <div className="container mx-auto w-full">
      <ScrollArea className="w-full">
        <div className="flex xl:flex-row flex-col-reverse justify-between w-full md:gap-8 gap-4">
          <div className="hidden md:block w-full">
            {/* Table view for medium screens and up */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainees.map((trainee) => (
                  <TableRow key={trainee.id}>
                    <TableCell>
                      {trainee.firstName} {trainee.lastName}
                    </TableCell>
                    <TableCell>{trainee.age}</TableCell>
                    <TableCell>{trainee.gender}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() => setSelectedTrainee(trainee)}
                              className="transition-none"
                            >
                              View Medical History
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Medical History</DialogTitle>
                              <DialogDescription>
                                {selectedTrainee?.medicalHistory}
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setMoveParticipant(trainee);
                            setSelectedTrainee(trainee);
                          }}
                          className="transition-none"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Move
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => removeTrainee(trainee.id)}
                          className="transition-none"
                        >
                          <UserX className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="md:hidden space-y-4">
            {/* Card view for small screens */}
            {trainees.map((trainee) => (
              <Card key={trainee.id} className="w-auto">
                <CardHeader>
                  <CardTitle>
                    {trainee.firstName} {trainee.lastName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Age: {trainee.age}</p>
                  <p>Gender: {trainee.gender}</p>
                  <div className="mt-4 space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedTrainee(trainee)}
                          className="w-full transition-none"
                        >
                          View Medical History
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Medical History</DialogTitle>
                          <DialogDescription>
                            {selectedTrainee?.medicalHistory}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setMoveParticipant(trainee);
                        setSelectedTrainee(trainee);
                      }}
                      className="w-full transition-none"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Move
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => removeTrainee(trainee.id)}
                      className="w-full transition-none"
                    >
                      <UserX className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {moveParticipant && selectedTrainee && (
            <Card className="md:w-[550px] w-auto shadow-md dark:shadow-sm dark:shadow-white/15 md:mx-2 md:my-2 bg-card/30">
              <CardHeader>
                <CardTitle className="text-xl">
                  Change Training Program
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  You are about to move this trainee from the current training
                  program
                </p>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="program">
                        Select training program for{" "}
                        <span className="font-semibold">
                          {selectedTrainee.firstName} {selectedTrainee.lastName}
                        </span>
                      </label>
                      <Select
                        value={selectedProgram}
                        onValueChange={setSelectedProgram}
                      >
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
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMoveParticipant(null);
                    setSelectedTrainee(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={handleSubmit}
                  disabled={!selectedProgram}
                >
                  Move to program
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
