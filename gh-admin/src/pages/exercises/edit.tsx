import { Button } from "@/components/ui/button";
import { useNavigation } from "@refinedev/core";
import { ArrowLeft } from "lucide-react";
import { ManageExerciseForm } from "./form";

export const ExerciseEdit = () => {
  const { list } = useNavigation();

  return (
    <div>
      <div className="flex justify-between items-center mb-2 flex-wrap gap-y-4 gap-x-3">
        <h2 className="text-3xl font-bold tracking-tight self-start">
          Edit exercise
        </h2>
        <div className="gap-2 flex justify-end pb-2 flex-wrap">
          <Button
            variant="ghost"
            className="self-start"
            onClick={() => list("exercises")}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Exercises
          </Button>
        </div>
      </div>
      <ManageExerciseForm />
    </div>
  );
};
