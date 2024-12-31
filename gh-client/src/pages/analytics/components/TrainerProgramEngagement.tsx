import React, { useEffect, useState } from "react";
import TrainerProgramSelector from "./TrainerProgramSelector";
import { TrainerProgram } from "@/api/models/training-program";
import { getAllTrainingProgramsForTrainer } from "@/api/services/training-program-service";
import HorizontalBarChart from "./HorizontalBarChart";

// Mock data for exercises in a training program
const exerciseData = [
  {
    exercise: "Warm-up Stretches",
    percentageSkipped: 15,
    percentageCompleted: 85,
  },
  {
    exercise: "Cardio (30 mins)",
    percentageSkipped: 25,
    percentageCompleted: 75,
  },
  {
    exercise: "Weight Training",
    percentageSkipped: 20,
    percentageCompleted: 80,
  },
  { exercise: "HIIT Session", percentageSkipped: 30, percentageCompleted: 70 },
  {
    exercise: "Cool-down Yoga",
    percentageSkipped: 35,
    percentageCompleted: 65,
  },
];

export default function TrainerProgramEngagement() {
  const [trainerPrograms, setTrainerPrograms] = useState<TrainerProgram[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<TrainerProgram>();
  const userId = 2;

  useEffect(() => {
    getAllTrainingProgramsForTrainer(userId).then((programs) => {
      setTrainerPrograms(programs);
    });
  }, []);

  return (
    <div>
      <div className="sm:max-w-sm flex flex-row gap-5">
        <TrainerProgramSelector programs={trainerPrograms} />
      </div>
      <div className="w-full space-y-4 mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <HorizontalBarChart
            data={exerciseData}
            dataKey="percentageSkipped"
            config={{
              percentageSkipped: {
                label: "Percentage Skipped",
                color: "hsl(var(--chart-3)/0.6)",
              },
            }}
            title="Percentage Skipped"
            description="Percentage of participants skipping each exercise"
            yDataKey="exercise"
            yType="category"
          />
          <HorizontalBarChart
            data={exerciseData}
            dataKey="percentageCompleted"
            config={{
              percentageCompleted: {
                label: "Percentage Completed",
                color: "hsl(var(--chart-4)/0.6)",
              },
            }}
            title="Percentage Completed"
            description="Percentage of participants completing each exercise"
            yDataKey="exercise"
            yType="category"
          />
        </div>
      </div>
    </div>
  );
}
