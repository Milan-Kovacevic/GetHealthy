import React, { ReactNode, useEffect, useState } from "react";
import { ProgramDetailsContext } from "../hooks/use-program-details";
import { SingleTrainingProgramInfo } from "@/api/models/program-details";
import {
  getSingleTrainingProgramInfo,
  leaveTrainingProgram,
} from "@/api/services/program-details-service";
import { toast } from "sonner";
import { SendProgramApplication } from "@/api/models/program-request";
import { sendTrainingProgramApplication } from "@/api/services/program-application-service";
import useAuth from "@/hooks/use-auth";

type ProgramDetailsProviderProps = {
  children: ReactNode;
  programId: number;
};

export default function ProgramDetailsProvider({
  children,
  programId,
}: ProgramDetailsProviderProps) {
  const auth = useAuth();
  const userId = auth.getUserId();

  const [program, setProgram] = useState<SingleTrainingProgramInfo>();
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (programId == program?.id) return;

    setLoading(true);
    getSingleTrainingProgramInfo(programId)
      .then((value) => {
        setProgram(value);
      })
      .catch(() => {
        toast.error("Unable to load program details. Try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [programId]);

  const onJoinTrainingProgram = async (note: string) => {
    if (!program) return;

    const request: SendProgramApplication = {
      programId: program.id,
      note: note,
    };
    setPending(true);
    return sendTrainingProgramApplication(userId, request)
      .then(() => {
        toast.info("Application submitted!", {
          description: `Your request to join program '${program.name}' has been submitted. Check your inbox for status update.`,
        });
        if (program) setProgram({ ...program, status: "PENDING" });
      })
      .catch((e) => {
        toast.error("Unexpected error", {
          description: "Unable to send request. Please, try again later.",
        });
        throw e;
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onLeaveTrainingProgram = async () => {
    if (!program) return;

    setPending(true);
    return leaveTrainingProgram(userId, program.id)
      .then(() => {
        toast.message(`You have left '${program.name}'.`);
      })
      .catch(() => {
        toast.error("Unexpected error", {
          description: "Unable to leave program. Please, try again later.",
        });
        if (program) setProgram({ ...program, status: "NOT_JOINED" });
      })
      .finally(() => {
        setPending(false);
      });
  };

  const value = {
    programInfo: program,
    loadingProgram: loading,
    pending: pending,
    onJoinTrainingProgram: onJoinTrainingProgram,
    onLeaveTrainingProgram: onLeaveTrainingProgram,
  };

  return (
    <ProgramDetailsContext.Provider value={value}>
      {children}
    </ProgramDetailsContext.Provider>
  );
}
