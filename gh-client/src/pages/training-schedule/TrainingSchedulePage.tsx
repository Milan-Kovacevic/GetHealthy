import { getProgramStatus } from "@/utils/date-time-utils";
import { addDays, format, startOfWeek } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleBackgroundBlob } from "../shared/BackgroundBlobs";
import CreateEditProgramOnScheduleModal from "./components/CreateEditProgramOnScheduleModal";
import ProgramScheduleDay from "./components/ProgramScheduleDay";
import { TrainingProgramOnSchedule } from "@/api/models/training-program-on-schedule";

// this should be Training Program On Schedule?

const mockPrograms: TrainingProgramOnSchedule[] = [
  {
    id: 1,
    dayOfWeek: 1,
    startTime: "10:00",
    trainingDuration: 100,
    program: {
      id: 1,
      name: "Morning Yoga",
      createdAt: "2025-01-01T00:00:00.000Z",
      description: "Start your day with energizing yoga",
      trainerName: "Marko Markovic",
    },
  },
  {
    id: 2,
    dayOfWeek: 4,
    startTime: "18:00",
    trainingDuration: 100,
    program: {
      id: 2,
      name: "HIIT Workout",
      createdAt: "2025-01-01T00:00:00.000Z",
      description: "High-intensity interval training",
      trainerName: "Marko Markovic",
    },
  },
  {
    id: 3,
    dayOfWeek: 4,
    startTime: "00:00",
    trainingDuration: 100,
    program: {
      id: 3,
      name: "Strength Training",
      createdAt: "2025-01-01T00:00:00.000Z",
      description: "Build muscle and strength with our structured workout.",
      trainerName: "Anna Smith",
    },
  },
];

export default function TrainingSchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [programs, setPrograms] = useState<TrainingProgramOnSchedule[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // this could be done on the backend side (sorting programs), fetching training programs for trainerId
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

  const handleViewProgramDetails = (programId: any) => {
    navigate(`/programs/${programId}`);
  };

  const handleEditProgramOnSchedule = (
    programOnSchedule: TrainingProgramOnSchedule
  ) => {
    setPrograms((prevPrograms) =>
      prevPrograms.map((program) =>
        program.id === programOnSchedule.id
          ? { ...programOnSchedule, program: programOnSchedule.program }
          : program
      )
    );
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
              <CreateEditProgramOnScheduleModal />
            </div>
          </div>

          <div className="flex-1 flex bg-background">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 flex-1">
              {weekDays.map((day, index) => (
                <ProgramScheduleDay
                  forDay={day}
                  dayOfWeek={index + 1}
                  onEditProgramOnSchedule={handleEditProgramOnSchedule}
                  getProgramStatus={getProgramStatus}
                  programs={programs.filter(
                    (program) =>
                      // isSameDay(program.dayOfWeek, day)
                      program.dayOfWeek ===
                      (day.getDay() === 0 ? 7 : day.getDay())
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
