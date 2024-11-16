import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

type ExerciseCardProps = {
  exercise: any;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  form?: any;
  onRemove: (value: any) => void;
};

const ExerciseCard = ({
  exercise,
  index,
  isSelected,
  onSelect,
  form,
  onRemove,
}: ExerciseCardProps) => {
  const exerciseErrors = form?.formState.errors?.exercises?.[index];

  return (
    <Card
      className={`relative cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-primary" : ""
      } ${exerciseErrors ? "ring-2 ring-destructive" : ""}`}
      onClick={onSelect}
    >
      <CardContent className="p-3 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-base mb-1">{exercise.name}</h3>
          <div className="flex items-center text-xs text-muted-foreground space-x-2">
            <span>{exercise.type}</span>
            <span>•</span>
            <span>{exercise.sets.length} sets</span>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-destructive hover:text-destructive-foreground"
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
};

export default ExerciseCard;
