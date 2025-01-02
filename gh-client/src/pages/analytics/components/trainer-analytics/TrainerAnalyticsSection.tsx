import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainerProgramPopularity from "./TrainerProgramPopularity";
import TrainerProgramEngagement from "./TrainerProgramEngagement";
import TrainerDashboardCards from "./TrainerDashboardCards";
import { useEffect, useState } from "react";
import { TrainerProgram } from "@/api/models/training-program";
import { getAllTrainingProgramsForTrainer } from "@/api/services/training-program-service";
import { DateRange } from "react-day-picker";
import TrainerAnalyticsSelector from "./TrainerAnalyticsSelector";

const squatData = {
  id: "squat",
  name: "Squats",
  data: [
    { date: "2024-12-30", percentage: 74 },
    { date: "2024-12-31", percentage: 39 },
    { date: "2025-01-01", percentage: 85 },
    { date: "2025-01-02", percentage: 68 },
    { date: "2025-01-03", percentage: 38 },
    { date: "2025-01-04", percentage: 16 },
    { date: "2025-01-05", percentage: 36 },
    { date: "2025-01-06", percentage: 86 },
    { date: "2025-01-07", percentage: 40 },
    { date: "2025-01-08", percentage: 100 },
    { date: "2025-01-09", percentage: 65 },
    { date: "2025-01-10", percentage: 57 },
    { date: "2025-01-11", percentage: 77 },
    { date: "2025-01-12", percentage: 80 },
    { date: "2025-01-13", percentage: 87 },
    { date: "2025-01-14", percentage: 57 },
    { date: "2025-01-15", percentage: 2 },
    { date: "2025-01-16", percentage: 0 },
    { date: "2025-01-17", percentage: 10 },
    { date: "2025-01-18", percentage: 6 },
    { date: "2025-01-19", percentage: 45 },
    { date: "2025-01-20", percentage: 23 },
    { date: "2025-01-21", percentage: 86 },
    { date: "2025-01-22", percentage: 79 },
    { date: "2025-01-23", percentage: 56 },
    { date: "2025-01-24", percentage: 24 },
    { date: "2025-01-25", percentage: 95 },
    { date: "2025-01-26", percentage: 79 },
    { date: "2025-01-27", percentage: 26 },
    { date: "2025-01-28", percentage: 31 },
    { date: "2025-01-29", percentage: 63 },
  ],
};
const exercises = [
  squatData,
  {
    id: "bench-press",
    name: "Bench Press",
    data: [
      { date: "2024-12-30", percentage: 0 },
      { date: "2025-01-02", percentage: 20 },
      { date: "2025-01-05", percentage: 40 },
      { date: "2025-01-08", percentage: 60 },
    ],
  },
  {
    id: "deadlift",
    name: "Deadlift",
    data: [
      { date: "2024-12-30", percentage: 0 },
      { date: "2025-01-01", percentage: 12 },
      { date: "2025-01-03", percentage: 24 },
      { date: "2025-01-05", percentage: 36 },
      { date: "2025-01-07", percentage: 48 },
      { date: "2025-01-09", percentage: 60 },
    ],
  },
  {
    id: "overhead-press",
    name: "Overhead Press",
    data: [
      { date: "2024-12-30", percentage: 0 },
      { date: "2025-01-02", percentage: 10 },
      { date: "2025-01-05", percentage: 20 },
      { date: "2025-01-08", percentage: 30 },
      { date: "2025-01-11", percentage: 40 },
    ],
  },
  {
    id: "pull-up",
    name: "Pull-Up",
    data: [
      { date: "2024-12-30", percentage: 0 },
      { date: "2024-12-31", percentage: 8 },
      { date: "2025-01-01", percentage: 16 },
      { date: "2025-01-02", percentage: 24 },
      { date: "2025-01-03", percentage: 32 },
      { date: "2025-01-04", percentage: 40 },
      { date: "2025-01-05", percentage: 48 },
    ],
  },
];

export default function TrainerAnalyticsSection() {
  const [trainerPrograms, setTrainerPrograms] = useState<TrainerProgram[]>([]);
  const [exerciseAnaytics, setExerciseAnalytics] =
    useState<typeof exercises>(exercises);
  const userId = 2;
  useEffect(() => {
    getAllTrainingProgramsForTrainer(userId).then((programs) => {
      setTrainerPrograms(programs);
    });
  }, []);

  const handlePeriodChange = (period?: DateRange) => {};

  const handleProgramChange = (program: TrainerProgram) => {
    setExerciseAnalytics(exercises.slice(program.id % 4));
  };

  return (
    <div className="flex flex-col flex-1">
      <TrainerDashboardCards />

      <div className="flex-1 mt-8">
        <TrainerAnalyticsSelector
          programs={trainerPrograms}
          onPeriodChange={handlePeriodChange}
          onProgramChange={handleProgramChange}
        />
        <Tabs defaultValue="tab1" className="w-full">
          <div className="flex lg:flex-row flex-col-reverse gap-x-4 gap-y-3 justify-between w-full">
            <TabsList className="flex md:flex-row flex-col gap-y-1 h-auto md:w-fit">
              <TabsTrigger value="tab1" className="px-8 w-full">
                Popularity
              </TabsTrigger>
              <TabsTrigger value="tab2" className="px-8 w-full">
                Engagement
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="tab1" className="h-full py-3">
            <TrainerProgramPopularity />
          </TabsContent>
          <TabsContent value="tab2" className="h-full py-3">
            <TrainerProgramEngagement programExercises={exerciseAnaytics} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
