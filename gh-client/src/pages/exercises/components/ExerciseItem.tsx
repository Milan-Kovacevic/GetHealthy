import { Exercise } from "@/api/models/exercise";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

type ExerciseItemProps = {
  exercise: Exercise;
  showVideo: boolean;
};

export default function ExerciseItem({
  exercise,
  showVideo,
}: ExerciseItemProps) {
  return (
    <Card key={exercise.id}>
      <CardHeader className="pb-2">
        <CardTitle>{exercise.exerciseName}</CardTitle>
        <CardDescription>{exercise.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-0">
        <div className="flex space-x-2 mb-5">
          <Badge
            key={exercise.firstExerciseMetric.id}
            className="font-medium flex gap-2 px-3 h-auto py-1"
            variant="secondary"
          >
            <span className="text-xs font-medium">
              {exercise.firstExerciseMetric.name}
            </span>
            {exercise.firstExerciseMetric.unit && (
              <>
                <span className="bg-muted-foreground/90 h-full w-px"></span>
                <span className="text-muted-foreground font-medium">
                  {exercise.firstExerciseMetric.unit}
                </span>
              </>
            )}
          </Badge>

          {exercise.secondExerciseMetric && (
            <Badge
              key={exercise.secondExerciseMetric.id}
              className="font-medium flex gap-2 px-3 h-auto py-1"
              variant="secondary"
            >
              <span className="text-xs font-medium">
                {exercise.secondExerciseMetric.name}
              </span>
              {exercise.secondExerciseMetric.unit && (
                <>
                  <span className="bg-muted-foreground/90 h-full w-px"></span>
                  <span className="text-muted-foreground font-medium">
                    {exercise.secondExerciseMetric.unit}
                  </span>
                </>
              )}
            </Badge>
          )}
        </div>
        {showVideo ? (
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
              className="text-foreground/80 h-auto px-0 py-0 underline hover:text-foreground transition-all sm:w-full w-60 justify-start"
              variant="link"
            >
              <Link
                target="_blank"
                className="w-auto truncate text-start"
                to={exercise.videoLink}
              >
                {exercise.videoLink}
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
