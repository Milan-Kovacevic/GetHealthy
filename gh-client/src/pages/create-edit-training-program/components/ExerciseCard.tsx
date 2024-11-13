import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ExerciseCardProps {
  label: string;
  onRemove: () => void;
  onClick: () => void;
}

export default function ExerciseCard({
  label,
  onRemove,
  onClick,
}: ExerciseCardProps) {
  return (
    <div
      className="flex items-center gap-2 p-3 mb-2 rounded shadow cursor-pointer hover:bg-green-50"
      onClick={onClick}
    >
      <span className="flex-grow font-medium">{label}</span>
      <Button
        variant="remove"
        className="h-5 w-8"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <X />
      </Button>
    </div>
  );
}
