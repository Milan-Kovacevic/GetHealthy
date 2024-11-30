import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  addDays,
  format,
  getDay,
  getDayOfYear,
  isPast,
  isSameDay,
  isWithinInterval,
  startOfWeek,
} from "date-fns";
import { useEffect, useState } from "react";
import TrainingProgramCard from "./components/TrainingProgramCard";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import AddProgramToScheduleModal from "./components/AddProgramToScheduleModal";
import { useNavigate } from "react-router-dom";
import ProgramScheduleDay from "./components/ProgramScheduleDay";
import {
  CircleBackgroundBlob,
  TopBackgroundBlob,
} from "../shared/BackgroundBlobs";

export interface TrainingProgram {
  id: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  trainerName: string;
  day: Date;
}
export type ScheduleTrainingStatus = "completed" | "upcoming" | "live";

const mockPrograms: TrainingProgram[] = [
  {
    id: 1,
    name: "Morning Yoga",
    description: "Start your day with energizing yoga",
    startTime: "07:00",
    endTime: "12:00",
    trainerName: "Marko Markovic",
    day: new Date(),
  },
  {
    id: 2,
    name: "HIIT Workout",
    description: "High-intensity interval training",
    startTime: "18:00",
    endTime: "19:00",
    trainerName: "Marko Markovic",
    day: addDays(new Date(), 3),
  },
  {
    id: 2,
    name: "HIIT Workout",
    description: "High-intensity interval training",
    startTime: "14:00",
    endTime: "15:00",
    trainerName: "Marko Markovic",
    day: addDays(new Date(), -1),
  },
  {
    id: 3,
    name: "New Workout",
    description: "Easy training",
    startTime: "20:00",
    endTime: "21:50",
    trainerName: "Marko Markovic",
    day: addDays(new Date(), 0),
  },
  {
    id: 4,
    name: "Pilates",
    description: "Core-strengthening exercises",
    startTime: "10:00",
    endTime: "11:00",
    trainerName: "Marko Markovic",
    day: addDays(new Date(), 2),
  },
  {
    id: 5,
    name: "Strength Training",
    description: "Build muscle and increase strength",
    startTime: "17:00",
    endTime: "18:00",
    trainerName: "Marko Markovic",
    day: addDays(new Date(), 5),
  },
  {
    id: 6,
    name: "Cardio Blast",
    description: "Boost your cardiovascular fitness",
    startTime: "07:00",
    endTime: "08:00",
    trainerName: "Marko Markovic",
    day: addDays(new Date(), 4),
  },
  {
    id: 6,
    name: "Cardio Blast v2",
    description: "Boost your cardiovascular fitness",
    startTime: "07:00",
    endTime: "08:00",
    trainerName: "Marko Markovic",
    day: addDays(new Date(), -3),
  },
  // {
  //   id: 7,
  //   name: "Cardio Blast v2",
  //   description: "Boost your cardiovascular fitness",
  //   startTime: "07:00",
  //   endTime: "08:00",
  //   trainerName: "Marko Markovic",
  //   day: addDays(new Date(), 0),
  // },
  // {
  //   id: 8,
  //   name: "Cardio Blast v2",
  //   description: "Boost your cardiovascular fitness",
  //   startTime: "07:00",
  //   endTime: "08:00",
  //   trainerName: "Marko Markovic",
  //   day: addDays(new Date(), 0),
  // },
  // {
  //   id: 9,
  //   name: "Cardio Blast v2",
  //   description: "Boost your cardiovascular fitness",
  //   startTime: "07:00",
  //   endTime: "08:00",
  //   trainerName: "Marko Markovic",
  //   day: addDays(new Date(), 0),
  // },
  // {
  //   id: 10,
  //   name: "Cardio Blast v2",
  //   description: "Boost your cardiovascular fitness",
  //   startTime: "07:00",
  //   endTime: "08:00",
  //   trainerName: "Marko Markovic",
  //   day: addDays(new Date(), 0),
  // },
  // {
  //   id: 11,
  //   name: "Cardio Blast v2",
  //   description: "Boost your cardiovascular fitness",
  //   startTime: "07:00",
  //   endTime: "08:00",
  //   trainerName: "Marko Markovic",
  //   day: addDays(new Date(), 0),
  // },
];

export default function TrainingSchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const navigate = useNavigate();

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
  ): ScheduleTrainingStatus => {
    const now = currentDate;
    const [startHour, startMinute] = program.startTime.split(":").map(Number);
    const [endHour, endMinute] = program.endTime.split(":").map(Number);
    const programStart = new Date(program.day).setHours(startHour, startMinute);
    const programEnd = new Date(program.day).setHours(endHour, endMinute);

    if (isPast(programEnd)) return "completed";
    if (
      isWithinInterval(now, {
        start: new Date(programStart),
        end: new Date(programEnd),
      })
    )
      return "live";
    return "upcoming";
  };

  const handleViewProgramDetails = (programId: any) => {
    navigate(`/programs/${programId}`);
  };

  return (
    <section className="h-full relative overflow-hidden flex flex-col">
      <CircleBackgroundBlob
        variant="lighter"
        className="-top-20 left-1/2 w-1/3 h-96 right-auto"
      />
      <CircleBackgroundBlob variant="lightest" />
      <CircleBackgroundBlob
        variant="lightest"
        className="-bottom-24 -right-16 w-1/3 h-96 left-auto"
      />
      <div className="container mx-auto sm:px-0 px-4 pt-8 pb-8 flex flex-col flex-1">
        <div className="flex flex-col flex-1 z-10">
          <div className="bg-background border-2 shadow-md rounded-lg rounded-bl-none rounded-br-none border-b-0 flex justify-between gap-3 py-0 px-3 md:flex-row flex-col">
            <div className="flex md:gap-2 md:items-center mx-3 py-3.5 md:pb-3.5 pb-1 md:flex-row flex-col items-start">
              <div className="flex md:gap-2.5 gap-1.5 items-center">
                <CalendarIcon className="text-foreground/90 w-6 h-6" />
                <p className="md:text-2xl text-xl leading-tight font-bold">
                  Your weekly schedule
                </p>
              </div>
              <span className="text-muted-foreground self-center text-lg md:block hidden">
                |
              </span>
              <div className="flex flex-row items-center gap-1.5 mt-0.5">
                <p className="md:text-lg text-base font-medium text-foreground/75 tracking-tight">
                  {format(currentDate, "MMMM yyyy")}
                </p>
              </div>
            </div>
            <div className="md:flex-none flex-1 md:mb-0 mb-3 md:self-center">
              <AddProgramToScheduleModal />
            </div>
          </div>

          <div className="flex-1 flex bg-background">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 flex-1">
              {weekDays.map((day, index) => (
                <ProgramScheduleDay
                  forDay={day}
                  dayOfWeek={index + 1}
                  getProgramStatus={getProgramStatus}
                  programs={programs.filter((program) =>
                    isSameDay(program.day, day)
                  )}
                  key={day.toISOString()}
                  onViewDetails={handleViewProgramDetails}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
