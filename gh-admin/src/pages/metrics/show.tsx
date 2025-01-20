import { CardSectionTitle } from "@/components/card";
import { PageActions, PageTitle } from "@/components/page";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigation, useShow } from "@refinedev/core";

export const MetricShow = () => {
  const { edit, goBack } = useNavigation();
  const { query, showId } = useShow<IMetricResponse>({});

  const { data, isLoading, status } = query;
  const record = data?.data;

  const handleEdit = () => {
    if (showId) edit("metrics", showId);
  };

  const handleGoBack = () => {
    goBack();
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-5 flex-wrap gap-y-4 gap-x-3">
        <PageTitle title="Exercise metric details" className="self-start" />
        <PageActions
          onGoBack={handleGoBack}
          edit={{
            show: true,
            disabled: status == "error" || status == "loading",
            onEdit: handleEdit,
          }}
          remove={{
            show: true,
            disabled: status == "error" || status == "loading",
            itemId: String(showId ?? ""),
          }}
        />
      </div>
      {isLoading && !record && (
        <div className="flex max-w-xl">
          <Skeleton className="flex-1 h-[170px]" />
        </div>
      )}
      {record && (
        <div className="flex flex-col gap-2 max-w-xl">
          <Card className="w-full shadow-md">
            <CardContent className="space-y-8 p-5 px-6">
              <BasicInfo record={record} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const BasicInfo = ({ record }: { record: IMetricResponse }) => {
  return (
    <div className="space-y-2.5">
      <CardSectionTitle title="About metric" />
      <div className="space-y-2">
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm leading-none">Name: </p>
          <p className="font-medium text-base">{record.name}</p>
        </div>

        <div className="space-y-1.5">
          <p className="text-muted-foreground text-sm leading-none">Unit: </p>
          <p className="font-normal text-foreground text-base leading-tight">
            [{record.unit}]
          </p>
        </div>
      </div>
    </div>
  );
};
