import { ProgramRequestDetails } from "@/api/models/program-request";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format, formatDate } from "date-fns";
import { CheckIcon, ExternalLinkIcon, UserIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type RequestDetailsProps = {
  request: ProgramRequestDetails;
  onAccept: (programId: number, traineeId: number) => void;
  onReject: (programId: number, traineeId: number) => void;
  onClose: () => void;
  loading: boolean;
};

export default function RequestDetails(props: RequestDetailsProps) {
  const { request, onAccept, onReject, onClose, loading } = props;
  const navigate = useNavigate();

  const handleApprove = async () => {
    onAccept(request.programId, request.traineeId);
  };

  const handleReject = async () => {
    onReject(request.programId, request.traineeId);
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="flex flex-row items-center justify-between mb-2 w-full">
        <h3 className="tracking-tight text-base text-foreground/85 font-medium">
          Request details
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-auto py-2 px-2 rounded-full mx-2 hover:text-destructive ml-auto"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>

      <div>
        <div className="flex items-start space-x-3">
          <Avatar className="h-16 w-16 mt-1.5">
            <AvatarImage src={request.traineeProfilePictureFilePath} alt={""} />
            <AvatarFallback>
              {request.traineeFirstName[0]}
              {request.traineeLastName[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-lg font-semibold">{`${request.traineeFirstName} ${request.traineeLastName}`}</h2>
            <div className="text-[13px] flex items-center gap-1">
              <span className="text-muted-foreground">Program: </span>
              <div className="flex items-center gap-1.5">
                <span className="text-foreground/80 flex-1">
                  {request.programName}
                </span>
                <Button
                  onClick={() =>
                    navigate(`/programs/${request.programId}`, {
                      replace: true,
                    })
                  }
                  size="icon"
                  variant="ghost"
                  className="h-auto w-auto px-1 py-0.5 mb-0.5"
                >
                  <ExternalLinkIcon
                    className="w-3 h-3"
                    height={undefined}
                    width={undefined}
                  />
                </Button>
              </div>
            </div>

            <div className="text-[13px]">
              <span className="text-muted-foreground">Submission date: </span>
              <span className="text-foreground/80 flex-1">
                {format(request.submissionDate, "dd. MMM yyyy.")} at{" "}
                {format(request.submissionDate, "pp")}
              </span>
            </div>

            <Badge
              variant={request.markRead ? "secondary" : "outline"}
              className="mt-1"
            >
              {request.markRead ? "Read" : "Unread"}
            </Badge>
          </div>
        </div>
        <Separator className="my-5 mb-3" />
        <div className="mx-0.5 grid grid-cols-2 gap-4">
          {request.traineeDateOfBirth && (
            <GridCellData
              label="Date of birth"
              value={format(request.traineeDateOfBirth, "P")}
            />
          )}
          {request.traineeGender && (
            <GridCellData label="Gender" value={request.traineeGender} />
          )}
          {request.traineeHeight && (
            <GridCellData
              label="Height"
              value={`${request.traineeHeight} cm`}
            />
          )}
          {request.traineeWeight && (
            <GridCellData
              label="Weight"
              value={`${request.traineeWeight} kg`}
            />
          )}
        </div>
        <div className="space-y-4 mt-4 mx-0.5">
          {request.traineeMedicalHistory && (
            <GridCellData
              label="Medical history"
              value={request.traineeMedicalHistory}
            />
          )}
          {request.note && <GridCellData label="Note" value={request.note} />}
        </div>
      </div>
      <div className="flex justify-end space-x-2 pt-5 pb-2 px-2">
        <Button
          variant="outline"
          onClick={handleReject}
          disabled={loading}
          size="sm"
        >
          <XIcon className="mr-0 h-4 w-4" />
          Reject
        </Button>
        <Button
          variant="default"
          onClick={handleApprove}
          disabled={loading}
          size="sm"
        >
          <CheckIcon className="mr-0 h-4 w-4" />
          Approve
        </Button>
      </div>
    </div>
  );
}

const GridCellData = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
      <p className="mt-0 text-sm">{value}</p>
    </div>
  );
};
