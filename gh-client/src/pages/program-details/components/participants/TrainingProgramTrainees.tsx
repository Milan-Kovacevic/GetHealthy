import { UsersIcon } from "lucide-react";
import ProgramParticipantsList from "./ProgramParticipantsList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TrainingProgramTrainees() {
  const params = useParams();
  const [programId, setProgramId] = useState<number>();

  useEffect(() => {
    const id = params["id"];
    if (!id) return;
    setProgramId(parseInt(id));
  }, []);

  return (
    <div className="w-full md:px-2 my-5 flex flex-col md:p-0 p-4">
      <div className="flex flex-row items-center gap-1.5 ml-1 mb-4">
        <UsersIcon className="h-5 w-5 text-foreground/80" />
        <p className="font-medium text-xl tracking-wide mb-0.5">
          Program participants
        </p>
      </div>
      {programId && <ProgramParticipantsList programId={programId} />}
    </div>
  );
}
