import { PageActions, PageTitle } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCustom,
  useCustomMutation,
  useDataProvider,
  useNavigation,
  useShow,
} from "@refinedev/core";
import { CheckIcon, DownloadIcon, Loader2Icon, XIcon } from "lucide-react";
import { API_PREFIX } from "@/lib";

export const RequestShow = () => {
  const { goBack } = useNavigation();
  const { query } = useShow<IRegistrationRequestDetailsResponse>({});

  const { data, isLoading } = query;
  const record = data?.data;

  const handleGoBack = () => {
    goBack();
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-5 flex-wrap gap-y-4 gap-x-3">
        <PageTitle title="Request details" className="self-start" />
        <PageActions
          onGoBack={handleGoBack}
          edit={{
            show: false,
          }}
          remove={{
            show: false,
          }}
        />
      </div>
      {isLoading && !record && (
        <div className="flex lg:flex-row flex-col gap-6 w-full max-w-2xl">
          <Skeleton className="flex-1 h-[270px]" />
        </div>
      )}
      {record && (
        <div className="flex lg:flex-row flex-col gap-6 w-full">
          <Card className="basis-1/2 max-w-2xl shadow-md">
            <CardContent className="space-y-8 py-5 px-6">
              <RequestInfo record={record} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const RequestInfo = ({
  record,
}: {
  record: IRegistrationRequestDetailsResponse;
}) => {
  const dataProvider = useDataProvider();
  const defaultDataProvider = dataProvider();

  const { isLoading, mutateAsync } =
    useCustomMutation<IRegistrationRequestProcessRequest>();

  const fullName = `${record.firstName} ${record.lastName}`;

  const handleProcessRegistrationRequest = (approve: boolean) => {
    mutateAsync({
      url: `/requests/${record.id}`,
      method: "post",
      values: {
        approve: approve,
      },
    });
  };

  const handleDownloadQualification = () => {
    defaultDataProvider
      .custom?.<any>({
        url: `${API_PREFIX}/storage/documents/${record.certificationFilePath}`,
        method: "get",
      })
      .then((qualification) => {
        const fileExtension = record.certificationFilePath.split(".").pop();
        const fileName =
          record.firstName +
          "_" +
          record.lastName +
          "_Qualification." +
          fileExtension;

        const blob = new Blob([qualification.data]);

        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between space-x-3">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-foreground text-lg mt-1 leading-none font-normal">
            From:
          </p>
          <h2 className="text-xl font-semibold">{fullName}</h2>
        </div>
        <div className="">
          <Button
            onClick={handleDownloadQualification}
            variant="secondary"
            disabled={isLoading}
          >
            <DownloadIcon />
            Download qualification
          </Button>
        </div>
      </div>
      <div className="space-y-1 pt-3 pb-2">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-foreground text-sm leading-none font-semibold">
            {"Email: "}
          </p>
          <p className="text-sm text-foreground/95">{record.email}</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <p className="text-foreground text-sm leading-none font-semibold">
            {"Issued: "}
          </p>
          <p className="text-sm text-foreground/95 font-medium">
            {new Date(record.issueDate).toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-col gap-1.5 pt-2">
          <p className="text-foreground text-sm leading-none font-semibold">
            {"Registration note: "}
          </p>
          <p className="text-[13px] tracking-tight text-muted-foreground">
            {record.description}
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 self-start">
        <Button
          disabled={isLoading}
          variant="outline"
          className="min-w-32"
          onClick={() => handleProcessRegistrationRequest(false)}
        >
          {isLoading ? (
            <Loader2Icon className="text-muted-foreground animate-spin" />
          ) : (
            <XIcon />
          )}
          Reject
        </Button>
        <Button
          disabled={isLoading}
          variant="default"
          className="min-w-32"
          onClick={() => handleProcessRegistrationRequest(true)}
        >
          {isLoading ? (
            <Loader2Icon className="text-primary-foreground animate-spin" />
          ) : (
            <CheckIcon />
          )}
          Accept
        </Button>
      </div>
    </div>
  );
};

const RecordItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <p className="text-foreground text-sm leading-none font-semibold">
        {label}{" "}
      </p>
      <p className="text-sm text-foreground/95">{value}</p>
    </div>
  );
};
