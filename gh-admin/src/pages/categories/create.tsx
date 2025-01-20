import { PageActions, PageTitle } from "@/components/page";
import { useNavigation } from "@refinedev/core";
import { ManageCategoryForm } from "./form";

export const CategoryCreate = () => {
  const { list } = useNavigation();

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-y-4 gap-x-3">
        <PageTitle className="self-start" title="Create category" />
        <PageActions
          onGoBack={() => list("categories")}
          edit={{ show: false }}
          remove={{ show: false }}
        />
      </div>
      <ManageCategoryForm />
    </div>
  );
};
