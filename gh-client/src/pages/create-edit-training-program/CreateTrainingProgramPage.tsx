import CreateTrainingProgramForm from "./components/CreateTrainingProgramForm";

const CreateTrainingProgramPage = () => {
  return (
    <div className="container mx-auto relative overflow-hidden sm:px-5 px-4 pt-8 pb-10">
      <div className="space-y-0.5">
        <p className="text-2xl font-bold">Create training program</p>
        <p className="text-muted-foreground text-sm">
          Fill in some general information about the program, and create your
          workout plan
        </p>
      </div>
      <CreateTrainingProgramForm />
    </div>
  );
};

export default CreateTrainingProgramPage;
