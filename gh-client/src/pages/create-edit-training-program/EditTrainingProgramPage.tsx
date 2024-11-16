import GeneralInformationForm from "./components/GeneralInformationForm";
import ExercisePlanBuilder from "./components/ExercisePlanBuilder";

export default function EditTrainingProgramPage() {
  const mockData = {
    name: "Leadership Program",
    info: "Enhance your leadership skills through practical sessions.",
    categories: ["technical", "soft-skills"],
    requirements: "At least 3 years of management experience.",
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Training Program</h1>
      <GeneralInformationForm defaultValues={mockData} isEdit={true} />
      <ExercisePlanBuilder isEdit={true} />
    </div>
  );
}
