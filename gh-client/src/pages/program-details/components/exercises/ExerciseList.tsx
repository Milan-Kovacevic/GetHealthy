import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DumbbellIcon, PlayCircle } from "lucide-react";
import { ProgramExercise } from "@/api/models/exercise";

// Mock data for exercises
const exercises = [
  {
    id: 1,
    name: "Bench Press",
    description:
      "A compound exercise that primarily targets the chest muscles.",
    sets: 3,
    videoLink: "https://example.com/bench-press",
    setDetails: [
      { reps: 10, weight: 135, restTime: 90 },
      { reps: 8, weight: 155, restTime: 120 },
      { reps: 6, weight: 175, restTime: 150 },
    ],
  },
  {
    id: 2,
    name: "Incline Bench Press",
    description:
      "A compound exercise that primarily targets the chest muscles. A compound exercise that primarily targets the chest muscles. A compound exercise that primarily targets the chest muscles.",
    sets: 2,
    videoLink: "https://example.com/bench-press",
    setDetails: [
      { reps: 10, weight: 135, restTime: 90 },
      { reps: 8, weight: 155, restTime: 120 },
    ],
  },
  {
    id: 3,
    name: "Squats",
    description:
      "A lower body exercise that targets the quadriceps, hamstrings, and glutes.",
    sets: 4,
    videoLink: "https://example.com/squats",
    setDetails: [
      { reps: 12, weight: 185, restTime: 90 },
      { reps: 10, weight: 205, restTime: 120 },
      { reps: 8, weight: 225, restTime: 150 },
      { reps: 6, weight: 245, restTime: 180 },
    ],
  },

  {
    id: 4,
    name: "Bench Press",
    description:
      "A compound exercise that primarily targets the chest muscles.",
    sets: 3,
    videoLink: "https://example.com/bench-press",
    setDetails: [
      { reps: 10, weight: 135, restTime: 90 },
      { reps: 8, weight: 155, restTime: 120 },
      { reps: 6, weight: 175, restTime: 150 },
    ],
  },
];

type ExerciseListProps = {
  exercises: ProgramExercise[];
};

export default function ExerciseList(props: ExerciseListProps) {
  const { exercises } = props;

  return (
    <div className="space-y-3">
      <div className="flex flex-row items-center gap-1.5 ml-1">
        <DumbbellIcon className="h-5 w-5 text-foreground/80" />
        <p className="font-medium text-xl tracking-wide mb-0.5">
          Program exercises
        </p>
      </div>
      <div className="flex flex-row flex-wrap max-w-screen-md">
        {exercises.map((exercise, i) => (
          <div key={exercise.id} className="pb-3 md:pr-3 w-full">
            <Card className="w-full flex flex-col flex-1 shadow-md">
              <CardHeader className="pb-0 pt-4">
                <CardTitle className="text-lg">
                  {i + 1}. {exercise.name}
                </CardTitle>

                <CardDescription>{exercise.description}</CardDescription>
                <p className="text-sm text-muted-foreground mb-2">
                  Number of sets:
                  <span className="text-foreground/85 ml-1 font-medium">
                    {exercise.sets}
                  </span>
                </p>
              </CardHeader>
              <CardContent className="pt-0 mt-auto pb-3">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`item-${exercise.id}`} className="">
                    <AccordionTrigger>View Set Details</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 dark:text-foreground/80 text-foreground/85">
                        {exercise.setDetails.map((set, index) => (
                          <li
                            key={index}
                            className="bg-muted/50 p-2 px-4 rounded-md"
                          >
                            <p className="font-medium text-base">
                              Set {index + 1}
                            </p>
                            <p>
                              Reps:{" "}
                              <span className="font-medium">{set.reps}</span>
                            </p>
                            <p>
                              Weight:{" "}
                              <span className="font-medium">{set.weight} </span>
                              lbs
                            </p>
                            <p>
                              Rest:{" "}
                              <span className="font-medium">
                                {set.restTime}{" "}
                              </span>{" "}
                              seconds
                            </p>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter className="pb-0 mb-5">
                <Button variant="secondary">
                  <PlayCircle className="mr-o h-5 w-5" /> Watch Demo
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
