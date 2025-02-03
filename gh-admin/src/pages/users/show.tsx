import { PageActions, PageTitle } from "@/components/page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { API_BASE_URL, API_PREFIX } from "@/lib";
import { capitalize, cn } from "@/lib/utils";
import { useCustomMutation, useNavigation, useShow } from "@refinedev/core";
import { CircleAlertIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";

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
          <Skeleton className="flex-1 h-[300px]" />
        </div>
      )}
      {record && (
        <div className="flex lg:flex-row flex-col gap-6 w-full">
          <Card className="max-w-2xl w-full shadow-md">
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
  const [userAccount, setUserAccount] = useState(record);
  const fullName = `${userAccount.firstName} ${userAccount.lastName}`;
  const initials = `${userAccount.firstName[0]}${userAccount.lastName[0]}`;

  return (
    <div className="flex flex-col">
      <div className="flex items-start space-x-6">
        <Avatar className="h-28 w-28">
          <AvatarImage
            src={userAccount.profilePictureFilePath}
            alt={fullName}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex md:flex-row flex-col gap-3 justify-between">
          <div className="flex-1 space-y-2">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">{fullName}</h2>
              <p className="text-sm text-muted-foreground">
                @{userAccount.username}
              </p>
            </div>
            {userAccount.enabled ? (
              <Badge className="font-normal" variant="outline">
                Enabled
              </Badge>
            ) : (
              <Badge className="font-normal" variant="destructive">
                Disabled
              </Badge>
            )}
          </div>
          <SuspendAccountButton
            record={userAccount}
            onAccountSuspended={(value) =>
              setUserAccount((prev) => {
                return { ...prev, enabled: value };
              })
            }
          />
        </div>
      </div>
      <div className="space-y-1 pt-5 px-2 pb-2">
        <RecordItem label="Email:" value={`${userAccount.email}`} />
        <RecordItem label="Role:" value={capitalize(`${userAccount.role}`)} />

        <RecordItem
          label="Created:"
          value={new Date(userAccount.createdAt).toLocaleDateString()}
        />
        {userAccount.lastAccessed && (
          <RecordItem
            label="Last Accessed:"
            value={new Date(userAccount.lastAccessed).toLocaleDateString()}
          />
        )}

        {userAccount.dateOfBirth && (
          <RecordItem
            label="Date of Birth:"
            value={new Date(userAccount.dateOfBirth).toLocaleDateString()}
          />
        )}

        <RecordItem
          label="Gender:"
          value={capitalize(`${userAccount.gender}`)}
        />
      </div>
    </div>
  );
};

const SuspendAccountButton = ({
  record,
  onAccountSuspended,
}: {
  record: IUserDetailsResponse;
  onAccountSuspended: (value: boolean) => void;
}) => {
  const { isLoading, mutateAsync } = useCustomMutation();
  const [open, setOpen] = useState(false);

  const handleSuspendUserAccount = () => {
    mutateAsync({
      url: `accounts/${record.id}/suspend`,
      method: "post",
      values: {},
    }).then(() => {
      onAccountSuspended(!record.enabled);
      setOpen(false);
    });
  };

  return (
    <AlertDialog open={isLoading || open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          disabled={isLoading}
          className={cn(record.enabled && "text-destructive")}
        >
          <CircleAlertIcon className="md:block hidden" />
          {record.enabled ? "Suspend account" : "Activate account"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will{" "}
            {record.enabled ? "suspend selected" : "activate back suspended"}{" "}
            user account, are you sure you want to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>No</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            className="bg-destructive/95 hover:bg-destructive h-auto py-2 font-normal text-destructive-foreground"
            onClick={handleSuspendUserAccount}
          >
            {isLoading && <Loader2Icon className="animate-spin" />}
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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
