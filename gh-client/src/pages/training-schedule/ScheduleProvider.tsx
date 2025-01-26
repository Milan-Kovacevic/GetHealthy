import {
  ManageTrainingProgramOnSchedule,
  TrainingProgramOnSchedule,
} from "@/api/models/training-program-on-schedule";
import {
  addTrainingProgramToSchedule,
  deleteTrainingProgramFromSchedule,
  editTrainingProgramOnSchedule,
  fetchTrainingProgamsOnSchedule,
} from "@/api/services/training-program-on-schedule-service";
import { ScheduleContext } from "@/pages/training-schedule/hooks/use-schedule";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type ScheduleProviderProps = {
  children: React.ReactNode;
};

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [programs, setPrograms] = useState<TrainingProgramOnSchedule[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const sortPrograms = (programs: TrainingProgramOnSchedule[]) => {
    return programs.sort((a, b) => {
      const [aHours, aMinutes] = a.startTime.split(":").map(Number);
      const [bHours, bMinutes] = b.startTime.split(":").map(Number);
      const aTime = aHours * 60 + aMinutes;
      const bTime = bHours * 60 + bMinutes;
      return aTime - bTime;
    });
  };

  useEffect(() => {
    const fetchAndSortPrograms = async () => {
      try {
        const fetchedPrograms = await fetchTrainingProgamsOnSchedule();
        setPrograms(sortPrograms(fetchedPrograms));
      } catch (error) {
        console.error("Error fetching training programs!", error);
      }
    };

    fetchAndSortPrograms();
  }, []);

  const onAddProgram = async (program: ManageTrainingProgramOnSchedule) => {
    return addTrainingProgramToSchedule(program)
      .then((response) => {
        setPrograms((prev) => sortPrograms([...prev, response]));
        toast.success(`Successfully added training program on schedule!`);
      })
      .catch(() => {
        toast.success(`Could not add training program on schedule!`);
      });
  };

  const onEditProgram = async (
    id: number,
    updatedProgram: ManageTrainingProgramOnSchedule
  ) => {
    return editTrainingProgramOnSchedule(id, updatedProgram)
      .then((response) => {
        setPrograms((prev) =>
          sortPrograms(
            prev.map((program) =>
              program.id === id ? { ...response } : program
            )
          )
        );
        toast.success(`Successfully updated training program on schedule!`);
      })
      .catch(() => {
        toast.success(`Could not update training program on schedule!`);
      });
  };

  const onRemoveProgram = async (programId: number) => {
    return deleteTrainingProgramFromSchedule(programId)
      .then(() => {
        setPrograms((prev) =>
          prev.filter((program) => program.id !== programId)
        );
        toast.success("Training program successfully deleted!");
      })
      .catch(() => {
        toast.error("Could not delete training program from schedule!");
      });
  };

  const getProgramsForDay = (day: Date) => {
    const weekDay = day.getDay() === 0 ? 7 : day.getDay(); // Handle Sunday as 7
    return programs.filter((program) => program.dayOfWeek === weekDay);
  };

  const value = {
    programs,
    currentDate,
    onAddProgram,
    onEditProgram,
    onRemoveProgram,
    getProgramsForDay,
    setCurrentDate,
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};
