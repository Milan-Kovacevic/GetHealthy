import { PageActions, PageTitle } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCustomMutation,
  useDataProvider,
  useNavigation,
  useShow,
} from "@refinedev/core";
import { format } from "date-fns";
import { CheckIcon, DownloadIcon, Loader2Icon, XIcon } from "lucide-react";
import { useState } from "react";

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
          <Card className="w-full max-w-2xl shadow-md">
            <CardContent className="space-y-8 py-5 px-6">
              <RequestInfo record={record} goBack={goBack} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const RequestInfo = ({
  record,
  goBack,
}: {
  record: IRegistrationRequestDetailsResponse;
  goBack: () => void;
}) => {
  const dataProvider = useDataProvider();
  const customDataProvider = dataProvider("fetch");

  const [loadingQualification, setLoadingQualification] = useState(false);

  const { isLoading, mutateAsync } = useCustomMutation();

  const fullName = `${record.firstName} ${record.lastName}`;

  const handleProcessRegistrationRequest = (approve: boolean) => {
    mutateAsync({
      url: `requests/${record.id}/process`,
      method: "post",
      values: {
        approve: approve,
      },
    }).then(() => {
      goBack();
    });
  };

  const handleDownloadQualification = () => {
    setLoadingQualification(true);
    customDataProvider
      .custom?.<any>({
        url: `storage/documents/${record.certificationFilePath}`,
        method: "get",
      })
      .then((response) => {
        const fileExtension = record.certificationFilePath.split(".").pop();
        const fileName =
          record.firstName +
          "_" +
          record.lastName +
          "_Qualification." +
          fileExtension;

        let url = URL.createObjectURL(response.data);
        let a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      })
      .finally(() => {
        setLoadingQualification(false);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between space-x-3">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-foreground text-base leading-none font-normal">
            From:
          </p>
          <h2 className="text-xl font-semibold">{fullName}</h2>
        </div>
        <div className="">
          {record.certificationFilePath && (
            <Button
              onClick={handleDownloadQualification}
              variant="secondary"
              disabled={isLoading || loadingQualification}
            >
              {loadingQualification ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <DownloadIcon />
              )}
              Download qualification
            </Button>
          )}
        </div>
      </div>
      <div className="space-y-1 pt-3 pb-2">
        <RecordItem label="Email: " value={record.email} />

        <RecordItem
          label="Issued: "
          value={format(record.issueDate, "dd.MM.yyyy, HH:mm:ss")}
        />

        <div className="flex flex-col gap-1.5 pt-2">
          <p className="text-foreground text-sm leading-none font-semibold">
            {"Registration note: "}
          </p>
          {record.description ? (
            <p className="text-[13px] tracking-tight text-muted-foreground">
              {record.description}
            </p>
          ) : (
            <p className="text-sm tracking-tight text-muted-foreground italic">
              There is no registration note...
            </p>
          )}
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
