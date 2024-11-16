import GeneralInformationForm from "./components/GeneralInformationForm";
import ExercisePlanBuilder from "./components/ExercisePlanBuilder";

const CreateTrainingProgramPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Training Program</h1>
      <GeneralInformationForm isEdit={false} />
      <ExercisePlanBuilder />
    </div>
  );
};

export default CreateTrainingProgramPage;
