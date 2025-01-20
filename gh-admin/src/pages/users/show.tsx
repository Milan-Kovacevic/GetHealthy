import { CardSectionTitle } from "@/components/card";
import { PageActions, PageTitle } from "@/components/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { capitalize } from "@/lib/utils";
import { useNavigation, useShow } from "@refinedev/core";

export const UserShow = () => {
  const { goBack } = useNavigation();
  const { query } = useShow<IUserDetailsResponse>({});

  const { data, isLoading } = query;
  const record = data?.data;

  const handleGoBack = () => {
    goBack();
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-5 flex-wrap gap-y-4 gap-x-3">
        <PageTitle title="User details" className="self-start" />
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
          <Skeleton className="flex-1 h-[340px]" />
        </div>
      )}
      {record && (
        <div className="flex lg:flex-row flex-col gap-6 w-full py-2">
          <Card className="basis-1/2 max-w-2xl shadow-md">
            <CardContent className="space-y-8 py-5 px-6">
              <UserAccountInfo record={record} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const UserAccountInfo = ({ record }: { record: IUserDetailsResponse }) => {
  const fullName = `${record.firstName} ${record.lastName}`;
  const initials = `${record.firstName[0]}${record.lastName[0]}`;

  return (
    <div className="flex flex-col">
      <div className="flex items-start space-x-6">
        <Avatar className="h-28 w-28">
          <AvatarImage src={record.profilePictureFilePath} alt={fullName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{fullName}</h2>
            <p className="text-sm text-muted-foreground">@{record.username}</p>
          </div>
          {record.enabled ? (
            <Badge className="font-normal" variant="outline">
              Enabled
            </Badge>
          ) : (
            <Badge className="font-normal" variant="destructive">
              Disabled
            </Badge>
          )}
        </div>
      </div>
      <div className="space-y-1.5 pt-5 px-2 pb-2">
        <RecordItem label="Email:" value={`${record.email}`} />
        <RecordItem label="Role:" value={capitalize(`${record.role}`)} />

        <RecordItem
          label="Created:"
          value={new Date(record.createdAt).toLocaleDateString()}
        />
        {record.lastAccessed && (
          <RecordItem
            label="Last Accessed:"
            value={new Date(record.lastAccessed).toLocaleDateString()}
          />
        )}

        {record.dateOfBirth && (
          <RecordItem
            label="Date of Birth:"
            value={new Date(record.dateOfBirth).toLocaleDateString()}
          />
        )}

        <RecordItem label="Gender:" value={capitalize(`${record.gender}`)} />
      </div>
    </div>
  );
};

const RecordItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <p className="text-foreground text-base leading-none font-medium">
        {label}{" "}
      </p>
      <p className="text-base text-foreground/95">{value}</p>
    </div>
  );
};
