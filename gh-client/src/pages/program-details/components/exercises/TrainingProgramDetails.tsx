import { CircleIcon } from "lucide-react";
import ExerciseList from "./ExerciseList";
import { useEffect, useState } from "react";
import { SingleProgramDetails } from "@/api/models/program-details";
import { useParams } from "react-router-dom";
import { getSingleTrainingProgramDetails } from "@/api/services/program-details-service";

export default function TrainingProgramDetails() {
  const [programDetails, setProgramDetails] = useState<SingleProgramDetails>();
  const params = useParams();

  useEffect(() => {
    const programId = params["id"];
    if (!programId) return; // Handle this situation

    getSingleTrainingProgramDetails(parseInt(programId)).then((response) => {
      setProgramDetails(response);
    });
  });

  return (
    <div className="my-4 mx-2 md:p-0 p-3">
      {programDetails && (
        <div className="flex flex-col gap-3 my-3">
          <div className="space-y-1">
            <div className="flex flex-row items-center gap-1.5">
              <CircleIcon className="h-2 w-2 mb-0.5" />
              <p className="mb-1 font-medium">Requirements</p>
            </div>

            <p className="text-muted-foreground text-base mx-4 max-w-screen-lg text-pretty leading-snug">
              {programDetails?.requirements}
            </p>
          </div>
          <p className="mt-1 text-base text-foreground/80">
            Estimated workout time:{" "}
            <span className="text-foreground font-medium">
              {programDetails?.trainingDuration} minutes
            </span>
          </p>
          <div className="mt-4">
            <ExerciseList />
          </div>
        </div>
      )}
    </div>
  );
}
