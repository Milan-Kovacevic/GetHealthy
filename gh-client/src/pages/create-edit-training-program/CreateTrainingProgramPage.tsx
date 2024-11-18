import GeneralInformationForm from "./components/GeneralInformationForm";
import ExercisePlanBuilder from "./components/ExercisePlanBuilder";

const CreateTrainingProgramPage = () => {
  return (
    <div className="p-8">{/*container mx-auto p-8 border border-gray-300 shadow-lg rounded-lg ??*/}
      <h1 className="text-3xl font-bold mb-4">Create Training Program</h1>
      <GeneralInformationForm isEdit={false} />
      <ExercisePlanBuilder />
    </div>
  );
};

export default CreateTrainingProgramPage;
