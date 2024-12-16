import { DumbbellIcon } from "lucide-react";
import { ProgramExercise } from "@/api/models/exercise";
import ExerciseCard from "./ExerciseCard";

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
          <ExerciseCard key={exercise.id} exercise={exercise} index={i} />
        ))}
      </div>
    </div>
  );
}
