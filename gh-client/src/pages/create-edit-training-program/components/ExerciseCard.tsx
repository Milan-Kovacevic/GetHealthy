import { ExercisePlanItem } from "@/api/models/exercise";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type ExerciseCardProps = {
  exercise: ExercisePlanItem;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  form?: any;
  onRemove: (value: any) => void;
};

export default function ExerciseCard({
  exercise,
  index,
  isSelected,
  onSelect,
  form,
  onRemove,
}: ExerciseCardProps) {
  const exerciseErrors =
    form?.formState.errors?.exercisePlan?.exercises?.[index];

  return (
    <Card
      className={cn(
        `relative cursor-pointer transition-all`,
        exerciseErrors && "ring-1 ring-destructive",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={onSelect}
    >
      <CardContent className="p-3 flex items-center">
        <div className="flex items-center flex-1 mr-2">
          <div className="flex items-center justify-center bg-muted text-muted-foreground rounded-full w-8 h-8 mr-3 flex-shrink-0">
            <span className="text-sm font-semibold">{index + 1}</span>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-1">{exercise.name}</h3>
            <div className="flex items-center text-xs text-muted-foreground space-x-2">
              <span>•</span>
              <span>{exercise?.sets?.length} sets</span>
            </div>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-destructive hover:text-destructive-foreground flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(index);
          }}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Remove exercise</span>
        </Button>
      </CardContent>
    </Card>
  );
}
