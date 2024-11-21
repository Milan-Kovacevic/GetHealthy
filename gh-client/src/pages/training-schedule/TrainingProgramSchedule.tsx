import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  addDays,
  format,
  isPast,
  isSameDay,
  isWithinInterval,
  startOfWeek,
} from "date-fns";
import { useEffect, useState } from "react";
import TrainingProgramCard from "./components/TrainingProgramCard";

export interface TrainingProgram {
  id: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  day: Date;
}

const mockPrograms: TrainingProgram[] = [
  {
    id: 1,
    name: "Morning Yoga",
    description: "Start your day with energizing yoga",
    startTime: "07:00",
    endTime: "08:00",
    day: new Date(),
  },
  {
    id: 2,
    name: "HIIT Workout",
    description: "High-intensity interval training",
    startTime: "18:00",
    endTime: "19:00",
    day: addDays(new Date(), 3),
  },
  {
    id: 2,
    name: "HIIT Workout",
    description: "High-intensity interval training",
    startTime: "14:00",
    endTime: "15:00",
    day: addDays(new Date(), -1),
  },
  {
    id: 3,
    name: "New Workout",
    description: "Easy training",
    startTime: "22:00",
    endTime: "22:50",
    day: addDays(new Date(), 0),
  },
  {
    id: 4,
    name: "Pilates",
    description: "Core-strengthening exercises",
    startTime: "10:00",
    endTime: "11:00",
    day: addDays(new Date(), 2),
  },
  {
    id: 5,
    name: "Strength Training",
    description: "Build muscle and increase strength",
    startTime: "17:00",
    endTime: "18:00",
    day: addDays(new Date(), 5),
  },
  {
    id: 6,
    name: "Cardio Blast",
    description: "Boost your cardiovascular fitness",
    startTime: "07:00",
    endTime: "08:00",
    day: addDays(new Date(), 4),
  },
];

export default function TrainingProgramSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);

  useEffect(() => {
    // this could be done on the backend side (sorting programs)
    const sortedPrograms = [...mockPrograms].sort((a, b) => {
      const [aHours, aMinutes] = a.startTime.split(":").map(Number);
      const [bHours, bMinutes] = b.startTime.split(":").map(Number);
      const aTime = aHours * 60 + aMinutes;
      const bTime = bHours * 60 + bMinutes;
      return aTime - bTime;
    });
    setPrograms(sortedPrograms);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfCurrentWeek, i)
  );

  const getProgramStatus = (
    program: TrainingProgram
  ): "not-started" | "in-progress" | "finished" => {
    const now = currentDate;
    const [startHour, startMinute] = program.startTime.split(":").map(Number);
    const [endHour, endMinute] = program.endTime.split(":").map(Number);
    const programStart = new Date(program.day).setHours(startHour, startMinute);
    const programEnd = new Date(program.day).setHours(endHour, endMinute);

    if (isPast(programEnd)) return "finished";
    if (
      isWithinInterval(now, {
        start: new Date(programStart),
        end: new Date(programEnd),
      })
    )
      return "in-progress";
    return "not-started";
  };

  const viewProgramDetails = (programId: any) => {
    alert(`Details: ${programId}`);
  };

  const startProgram = (programId: number) => {
    alert(`Starting program with ID: ${programId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Weekly Training Program Schedule
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 ">
        {weekDays.map((day, index) => (
          <Card
            key={day.toISOString()}
            className={`flex flex-col h-full dark:bg-[var(--background)] border-0 border-r-2 border-t-2 ${
              index === 0 ? "border-l-2" : ""
            }`}
          >
            <CardContent className="flex-grow p-4">
              <h2 className="text-lg font-semibold text-center mb-4 border-b">
                <span>{format(day, "MMM d")}</span>
                <br />
                <span className="text-green-500">{format(day, "EEE")}</span>
              </h2>
              <ScrollArea className="h-[calc(100vh-250px)] pr-2">
                <div className="space-y-3">
                  {programs
                    .filter((program) => isSameDay(program.day, day))
                    .map((program) => {
                      return (
                        <TrainingProgramCard
                          key={program.id}
                          program={program}
                          onViewDetails={viewProgramDetails}
                          onStartProgram={startProgram}
                          getProgramStatus={getProgramStatus}
                        />
                      );
                    })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
