import { DeleteButton } from "@/components/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigation, useShow } from "@refinedev/core";
import { ArrowLeft, CircleIcon, PencilIcon } from "lucide-react";

export const MetricShow = () => {
  const { edit, goBack } = useNavigation();
  const { query, showId } = useShow<IExerciseResponse>({});

  const { data, isLoading, status } = query;

  const record = data?.data;

  const handleEdit = () => {
    if (showId) edit("exercises", showId);
  };

  const handleGoBack = () => {
    goBack();
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-2 flex-wrap gap-y-4 gap-x-3">
        <h2 className="text-3xl font-bold tracking-tight self-start">
          Exercise details
        </h2>
        <div className="gap-1 flex justify-end pb-2 flex-wrap">
          <Button variant="ghost" className="self-start" onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4" /> Back to Exercises
          </Button>

          <div className="gap-2 flex justify-end flex-wrap">
            <Button
              disabled={status == "error" || status == "loading"}
              variant="ghost"
              onClick={handleEdit}
            >
              <PencilIcon className="h-4 w-4" /> Edit
            </Button>
            <DeleteButton
              text="Delete"
              disabled={status == "error" || status == "loading"}
              itemId={String(showId ?? "")}
              resource="exercises"
              onSuccess={handleGoBack}
            />
          </div>
        </div>
      </div>
      {isLoading && !record && (
        <div className="flex lg:flex-row flex-col gap-6 w-full">
          <Skeleton className="flex-1 h-[480px]" />
          <Skeleton className="flex-1 h-[480px]" />
        </div>
      )}
      {record && (
        <div className="flex lg:flex-row flex-col gap-6 w-full py-2">
          <Card className="basis-1/2 shadow-md">
            <CardContent className="space-y-8 p-6 px-7">
              <BasicInfo record={record} />
              <DemonstrationInfo record={record} />
              <MetricInfo record={record} />
            </CardContent>
          </Card>
          <Card className="basis-1/2 shadow-md">
            <CardContent className="p-6 px-7">
              <div className="space-y-2">
                <SectionTitle title="Demonstration video" />
                <div className="aspect-video">
                  <iframe
                    src={record.videoLink}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <p className="text-lg font-semibold text-foreground/90 flex flex-row items-center gap-2 tracking-tight">
      <CircleIcon className="h-2 w-2" />
      {title}
    </p>
  );
};

const BasicInfo = ({ record }: { record: IExerciseResponse }) => {
  return (
    <div className="space-y-2.5">
      <SectionTitle title="Basic information" />
      <div className="space-y-2">
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm leading-none">Name: </p>
          <p className="font-medium text-lg">{record.exerciseName}</p>
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground text-sm leading-none">
            Description:{" "}
          </p>
          <p className="font-normal text-foreground/80 text-[15px] leading-tight">
            {record.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const DemonstrationInfo = ({ record }: { record: IExerciseResponse }) => {
  return (
    <div className="space-y-2.5">
      <SectionTitle title="Demonstration" />
      <div className="space-y-1.5">
        <p className="text-muted-foreground text-sm leading-none">Link: </p>
        <p className="font-normal text-[15px]">{record.videoLink}</p>
      </div>
    </div>
  );
};
const MetricInfo = ({ record }: { record: IExerciseResponse }) => {
  return (
    <div className="space-y-2.5">
      <SectionTitle title="Exercise metrics" />
      <div className="space-y-2">
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm leading-none">
            First metric:{" "}
          </p>
          <p className="font-medium text-base">
            {record.firstExerciseMetric.name}
            {", "}
            <span className="text-muted-foreground font-normal text-sm">
              [unit = {record.firstExerciseMetric.unit}]
            </span>
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-muted-foreground text-sm leading-none">
            Second metric:{" "}
          </p>
          {record.secondExerciseMetric ? (
            <p className="font-medium text-base">
              {record.secondExerciseMetric.name}
              {", "}
              <span className="text-muted-foreground font-normal text-sm">
                [unit = {record.secondExerciseMetric.unit}]
              </span>
            </p>
          ) : (
            <p className="text-sm font-medium text-foreground/75 italic">
              No second metric
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
