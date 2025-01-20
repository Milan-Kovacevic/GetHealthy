import { useNavigation } from "@refinedev/core";
import { ManageMetricForm } from "./form";
import { PageActions, PageTitle } from "@/components/page";

export const MetricCreate = () => {
  const { list } = useNavigation();

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-y-4 gap-x-3">
        <PageTitle className="self-start" title="Create metric" />
        <PageActions
          onGoBack={() => list("metrics")}
          edit={{ show: false }}
          remove={{ show: false }}
        />
      </div>
      <ManageMetricForm />
    </div>
  );
};
