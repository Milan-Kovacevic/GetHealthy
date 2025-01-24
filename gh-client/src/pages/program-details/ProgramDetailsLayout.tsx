import ProgramDetailsTabs from "@/pages/program-details/components/ProgramDetailsTabs";
import TrainingProgramInfo from "@/pages/program-details/components/TrainingProgramInfo";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ProgramDetailsProvider from "./components/ProgramDetailsProvider";

export default function ProgramDetailsLayout() {
  const navigate = useNavigate();
  const params = useParams();
  const programId = params["id"];

  if (!programId) {
    navigate(-1);
    return;
  }

  return (
    <div className="flex flex-col container mx-auto h-full">
      <ProgramDetailsProvider programId={parseInt(programId!)}>
        <TrainingProgramInfo />
        <ProgramDetailsTabs>
          <Outlet />
        </ProgramDetailsTabs>
      </ProgramDetailsProvider>
    </div>
  );
}
