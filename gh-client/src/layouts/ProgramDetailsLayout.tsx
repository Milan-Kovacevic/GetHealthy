import ProgramDetailsTabs from "@/pages/program-details/components/ProgramDetailsTabs";
import TrainingProgramInfo from "@/pages/program-details/TrainingProgramInfo";
import { Outlet } from "react-router-dom";

export default function ProgramDetailsLayout() {
  return (
    <div className="flex flex-col container mx-auto">
      <TrainingProgramInfo />
      <ProgramDetailsTabs>
        <Outlet />
      </ProgramDetailsTabs>
    </div>
  );
}
