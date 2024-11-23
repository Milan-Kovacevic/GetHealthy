import GeneralInformationForm from "./components/GeneralInformationForm";
import ExercisePlanBuilder from "./components/ExercisePlanBuilder";
import { Separator } from "@/components/ui/separator";

export default function EditTrainingProgramPage() {
  const mockData = {
    name: "Leadership Program",
    info: "Enhance your leadership skills through practical sessions.",
    categories: ["technical", "soft-skills"],
    requirements: "At least 3 years of management experience.",
    difficulty: "advanced",
    //files:"https://example"
  };

  return (
    <div className="container mx-auto relative overflow-hidden sm:px-5 px-4 pt-8 pb-10">
      <div className="space-y-0.5">
        <p className="text-2xl font-bold">Edit Training Program</p>
        <p className="text-muted-foreground text-sm">
          Edit general information about the program or update your workout plan
        </p>
      </div>
      <Separator className="my-4" />
      <GeneralInformationForm defaultValues={mockData} isEdit={true} />
      <Separator className="my-4" />
      <ExercisePlanBuilder isEdit={true} />
    </div>
  );
}
