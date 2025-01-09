import ScheduleManager from "./ScheduleManager";
import { ScheduleProvider } from "./ScheduleProvider";

export default function TrainingProgramSchedulePage() {
  return (
    <ScheduleProvider>
      <ScheduleManager />
    </ScheduleProvider>
  );
}
