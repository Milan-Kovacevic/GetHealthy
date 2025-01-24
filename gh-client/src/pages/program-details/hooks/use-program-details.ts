import { SingleTrainingProgramInfo } from "@/api/models/program-details";
import { createContext, useContext } from "react";

type ProgramDetailsState = {
  programInfo?: SingleTrainingProgramInfo;
  loadingProgram: boolean;
  pending: boolean;
  onJoinTrainingProgram: (note: string) => Promise<void>;
  onLeaveTrainingProgram: () => Promise<void>;
};

export const ProgramDetailsContext = createContext<ProgramDetailsState | null>(
  null
);

export const useProgramDetails = () => {
  const context = useContext(ProgramDetailsContext);
  if (!context) {
    throw new Error(
      "useProgramDetails must be used within a ProgramDetailsProvider"
    );
  }
  return context!;
};
