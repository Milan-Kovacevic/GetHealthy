import { ProgramExercise } from "@/api/models/exercise";
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
import { PlayCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

type ExerciseCardProps = {
  exercise: ProgramExercise;
  index: number;
};

export default function ExerciseCard(props: ExerciseCardProps) {
  const { exercise, index } = props;

  return (
    <div className="pb-3 md:pr-3 w-full">
      <Card className="w-full flex flex-col flex-1 shadow-md">
        <CardHeader className="pb-0 pt-4">
          <CardTitle className="text-lg">
            {index + 1}. {exercise.name}
          </CardTitle>

          <CardDescription>{exercise.description}</CardDescription>
          <p className="text-sm text-muted-foreground mb-2">
            Number of sets:
            <span className="text-foreground/85 ml-1 font-medium">
              {exercise.exerciseSets.length}
            </span>
          </p>
        </CardHeader>
        <CardContent className="pt-0 mt-auto pb-3">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={`item-${exercise.id}`} className="">
              <AccordionTrigger>View Set Details</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 dark:text-foreground/80 text-foreground/85">
                  {exercise.exerciseSets.map((set, index) => (
                    <li key={index} className="bg-muted/50 p-2 px-4 rounded-md">
                      <p className="font-medium text-base">Set {index + 1}</p>
                      <p>
                        {exercise.firstExerciseMetric.name}:
                        <span className="font-medium">
                          {` ${set.firstMetricValue} ${exercise.firstExerciseMetric.unit}`}
                        </span>
                      </p>
                      {exercise.secondExerciseMetric && (
                        <p>
                          {exercise.secondExerciseMetric.name}:
                          <span className="font-medium">
                            {` ${set.secondMetricValue} ${exercise.secondExerciseMetric.unit}`}
                          </span>
                        </p>
                      )}

                      <p>
                        Rest:
                        <span className="font-medium">
                          {` ${set.restTime} seconds`}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="pb-0 mb-5">
          <Link to={exercise.videoLink} target="_blank">
            <Button variant="secondary">
              <PlayCircleIcon className="mr-o h-5 w-5" /> Watch Demo
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
