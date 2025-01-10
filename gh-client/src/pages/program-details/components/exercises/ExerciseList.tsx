import { DumbbellIcon } from "lucide-react";
import ExerciseCard from "./ExerciseCard";
import { ProgramExerciseDetails } from "@/api/models/program-exercise";

type ExerciseListProps = {
  exercises: ProgramExerciseDetails[];
};

export default function ExerciseList(props: ExerciseListProps) {
  const { exercises } = props;

  return exercises.length > 0 ? (
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
  ) : (
    <div>
      <p className="italic text-sm sm:text-base text-muted-foreground">
        There are no exercises to show for this training program...
      </p>
    </div>
  );
}
