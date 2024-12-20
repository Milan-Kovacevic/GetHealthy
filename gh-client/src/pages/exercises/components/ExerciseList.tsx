import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";
import { Link } from "react-router-dom";

const exercises = [
  {
    id: 1,
    exerciseName: "Push-ups",
    description: "Basic chest exercise",
    videoLink: "https://www.youtube.com/embed/IODxDxX7oi4",
    firstMetric: {
      id: 1,
      name: "Reps",
      unit: "",
    },
    secondMetric: {
      id: 2,
      name: "Weight",
      unit: "kg",
    },
  },
  {
    id: 2,
    exerciseName: "Squats",
    description: "Lower body exercise",
    videoLink: "https://www.youtube.com/embed/YaXPRqUwItQ",
    firstMetric: {
      id: 1,
      name: "Reps",
      unit: "",
    },
  },
  {
    id: 3,
    exerciseName: "Plank",
    description: "Core strength exercise",
    videoLink: "https://www.youtube.com/embed/pSHjTRCQxIw",
    firstMetric: {
      id: 3,
      name: "Time",
      unit: "seconds",
    },
  },
  {
    id: 4,
    exerciseName: "Lunges",
    description: "Exercise for legs and glutes",
    videoLink: "https://www.youtube.com/embed/QOVaHwm-Q6U",
    firstMetric: {
      id: 1,
      name: "Reps",
      unit: "",
    },
  },
  {
    id: 5,
    exerciseName: "Deadlifts",
    description: "Full-body strength exercise",
    videoLink: "https://www.youtube.com/embed/r4MzxtBKyNE",
    firstMetric: {
      id: 4,
      name: "Reps",
      unit: "",
    },
    secondMetric: {
      id: 5,
      name: "Weight",
      unit: "kg",
    },
  },
  {
    id: 6,
    exerciseName: "Bicep Curls",
    description: "Exercise for arm strength",
    videoLink: "https://www.youtube.com/embed/ykJmrZ5v0Oo",
    firstMetric: {
      id: 6,
      name: "Reps",
      unit: "",
    },
    secondMetric: {
      id: 7,
      name: "Weight",
      unit: "kg",
    },
  },
  {
    id: 7,
    exerciseName: "Pull-ups",
    description: "Upper body strength exercise",
    videoLink: "https://www.youtube.com/embed/eGo4IYlbE5g",
    firstMetric: {
      id: 8,
      name: "Reps",
      unit: "",
    },
  },
  {
    id: 8,
    exerciseName: "Bench Press",
    description: "Chest and triceps exercise",
    videoLink: "https://www.youtube.com/embed/gRVjAtPip0Y",
    firstMetric: {
      id: 4,
      name: "Reps",
      unit: "",
    },
    secondMetric: {
      id: 5,
      name: "Weight",
      unit: "kg",
    },
  },
  {
    id: 9,
    exerciseName: "Burpees",
    description: "Full-body cardio exercise",
    videoLink: "https://www.youtube.com/embed/TU8QYVW0gDU",
    firstMetric: {
      id: 9,
      name: "Reps",
      unit: "",
    },
  },
  {
    id: 10,
    exerciseName: "Mountain Climbers",
    description: "Cardio and core workout",
    videoLink: "https://www.youtube.com/embed/cnyTQDSE884",
    firstMetric: {
      id: 10,
      name: "Time",
      unit: "seconds",
    },
  },
  // Add more mock exercises here...
];

type ExerciseListProps = {
  showVideoEmbed: boolean;
};

export default function ExerciseList(props: ExerciseListProps) {
  const { showVideoEmbed } = props;

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <Card key={exercise.id}>
            <CardHeader className="pb-2">
              <CardTitle>{exercise.exerciseName}</CardTitle>
              <CardDescription>{exercise.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-0">
              <div className="flex space-x-2 mb-5">
                <Badge
                  key={exercise.firstMetric.id}
                  className="font-medium flex gap-2 px-3 h-auto py-1"
                  variant="secondary"
                >
                  <span className="text-xs font-medium">
                    {exercise.firstMetric.name}
                  </span>
                  {exercise.firstMetric.unit && (
                    <>
                      <span className="bg-muted-foreground/90 h-full w-px"></span>
                      <span className="text-muted-foreground font-medium">
                        {exercise.firstMetric.unit}
                      </span>
                    </>
                  )}
                </Badge>

                {exercise.secondMetric && (
                  <Badge
                    key={exercise.secondMetric.id}
                    className="font-medium flex gap-2 px-3 h-auto py-1"
                    variant="secondary"
                  >
                    <span className="text-xs font-medium">
                      {exercise.secondMetric.name}
                    </span>
                    {exercise.secondMetric.unit && (
                      <>
                        <span className="bg-muted-foreground/90 h-full w-px"></span>
                        <span className="text-muted-foreground font-medium">
                          {exercise.secondMetric.unit}
                        </span>
                      </>
                    )}
                  </Badge>
                )}
              </div>
              {showVideoEmbed ? (
                <div className="aspect-video">
                  <iframe
                    src={exercise.videoLink}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-md"
                  ></iframe>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Demo video:
                  </p>
                  <Button
                    className="text-foreground/80 h-auto px-0 py-0 underline hover:text-foreground transition-all"
                    variant="link"
                  >
                    <Link to={exercise.videoLink}>{exercise.videoLink}</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="border"
              href="#"
              // onClick={() =>
              //   setParticipantsPage((prev) => Math.max(prev - 1, 0))
              // }
              // className={
              //   isFirstPage ? "pointer-events-none opacity-50" : ""
              // }
            />
          </PaginationItem>
          {[...Array(2)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                // onClick={() => setParticipantsPage(index)}
                // isActive={participantsPage === index}
                className="border"
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              className="border"
              // onClick={() =>
              //   setParticipantsPage((prev) =>
              //     Math.min(prev + 1, totalParticipantPages)
              //   )
              // }
              // className={
              //   isLastPage ? "pointer-events-none opacity-50" : ""
              // }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
