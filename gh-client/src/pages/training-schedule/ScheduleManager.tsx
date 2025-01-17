import { useSchedule } from "@/pages/training-schedule/hooks/use-schedule";
import { getProgramStatus } from "@/utils/date-time-utils";
import { addDays, format, startOfWeek } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleBackgroundBlob } from "../shared/BackgroundBlobs";
import CreateEditProgramOnScheduleModal from "./components/CreateEditProgramOnScheduleModal";
import ProgramScheduleDay from "./components/ProgramScheduleDay";

const ScheduleManager = () => {
  const { programs } = useSchedule();
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {}, []);

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
};

export default ScheduleManager;
