import { useNavigation } from "@refinedev/core";
import { ManageExerciseForm } from "./form";
import { PageActions, PageTitle } from "@/components/page";

export const ExerciseCreate = () => {
  const { list } = useNavigation();

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-y-4 gap-x-3">
        <PageTitle className="self-start" title="Create exercise" />
        <PageActions
          onGoBack={() => list("exercises")}
          edit={{ show: false }}
          remove={{ show: false }}
        />
      </div>
      <ManageExerciseForm />
    </div>
  );
};
