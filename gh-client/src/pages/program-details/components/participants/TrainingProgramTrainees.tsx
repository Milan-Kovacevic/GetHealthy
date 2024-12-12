import { PencilIcon, UsersIcon } from "lucide-react";
import React from "react";
import ProgramParticipantsList from "./ProgramParticipantsList";

export default function TrainingProgramTrainees() {
  return (
    <div className="w-full md:px-2 my-5 flex flex-col md:p-0 p-4">
      <div className="flex flex-row items-center gap-1.5 ml-1 mb-4">
        <UsersIcon className="h-5 w-5 text-foreground/80" />
        <p className="font-medium text-xl tracking-wide mb-0.5">
          Program participants
        </p>
      </div>
      <ProgramParticipantsList />
    </div>
  );
}
