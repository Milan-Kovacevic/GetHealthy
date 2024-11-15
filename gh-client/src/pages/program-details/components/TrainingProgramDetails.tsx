import { CircleIcon } from "lucide-react";
import ExerciseList from "./ExerciseList";

export default function TrainingProgramDetails() {
  return (
    <div className="my-4 mx-2 md:p-0 p-3">
      <div className="flex flex-col gap-3 my-5">
        <div className="space-y-1">
          <div className="flex flex-row items-center gap-1.5">
            <CircleIcon className="h-2 w-2 mb-0.5" />
            <p className="mb-1 font-medium">Requirements</p>
          </div>

          <p className="text-muted-foreground text-base mx-4 max-w-screen-lg text-pretty leading-snug">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>

        <div className="mt-4">
          <ExerciseList />
        </div>
      </div>
    </div>
  );
}
