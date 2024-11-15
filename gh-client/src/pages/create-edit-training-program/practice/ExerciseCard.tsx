import { Card, CardContent, CardHeader } from "@/components/ui/card";

type ExerciseCardProps = {
  exercise: any;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
};

const ExerciseCard = ({
  exercise,
  index,
  isSelected,
  onSelect,
}: ExerciseCardProps) => {
  return (
    <Card
      className={`cursor-pointer tranistion-all ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
      onClick={onSelect}
    >
      <CardHeader>{exercise.name}</CardHeader>
      <CardContent>
        <p>Type: {exercise.type}</p>
        <p>Sets: {exercise.sets.length}</p>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
