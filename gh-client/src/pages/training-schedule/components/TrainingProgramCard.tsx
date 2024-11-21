import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock, ChevronRight, Play } from "lucide-react";
import { TrainingProgram } from "../TrainingProgramSchedule";

interface TrainingProgramCardProps {
  program: TrainingProgram;
  onViewDetails: (programId: number) => void;
  onStartProgram: (programId: number) => void;
  getProgramStatus: (program: TrainingProgram) => string;
}

export default function TrainingProgramCard({
  program,
  onViewDetails,
  onStartProgram,
  getProgramStatus,
}: TrainingProgramCardProps) {
  const status = getProgramStatus(program);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={`hover:shadow-md transition-shadow dark:bg-green-900 ${
              status === "finished"
                ? "opacity-70"
                : status === "in-progress"
                ? "border-green-500 border-2"
                : ""
            }`}
          >
            <CardContent className="p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-sm truncate mr-2">
                  {program.name}
                </h3>
                <Badge
                  variant={
                    status === "finished"
                      ? "secondary"
                      : status === "in-progress"
                      ? "default"
                      : "outline"
                  }
                  className="text-xs"
                >
                  {status === "finished"
                    ? "Done"
                    : status === "in-progress"
                    ? "Now"
                    : "Soon"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {program.startTime}
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-7 w-7"
                    onClick={() => onViewDetails(program.id)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>

                  {status === "in-progress" && (
                    <Button
                      variant="default"
                      size="sm"
                      className="p-1 h-7 w-7"
                      onClick={() => onStartProgram(program.id)}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{program.description}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {program.startTime} - {program.endTime}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
