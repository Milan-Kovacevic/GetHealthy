import { SingleProgramTrainer } from "@/api/models/program-details";
import { getSingleProgramTrainer } from "@/api/services/program-details-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Download, Loader2Icon, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TrainerInfoLoader from "./TrainerInfoLoader";
import { format } from "date-fns";
import { capitalize, pictureUrl } from "@/lib/utils";
import downloadTrainerCertificate from "@/api/services/qualification-service";
import { toast } from "sonner";

export default function ProgramTrainerInfo() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [trainer, setTrainer] = useState<SingleProgramTrainer>();

  useEffect(() => {
    const programId = params["id"];
    if (!programId) {
      console.error("No program ID provided");
      return;
    }
    setLoading(true);
    getSingleProgramTrainer(parseInt(programId))
      .then((value) => {
        setTrainer(value);
      })
      .catch((error) => {
        console.error("Error fetching trainer information:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (!loading && !trainer) {
    return (
      <p className="py-10 px-2 text-center text-sm text-muted-foreground italic">
        There is no trainer information available for this program.
      </p>
    );
  }

  const handleDownload = async () => {
    if (trainer && trainer.certificateFilePath != undefined) {
      setPending(true);
      downloadTrainerCertificate(trainer.certificateFilePath)
        .then((href) => {
          const link = document.createElement("a");
          link.href = href;
          link.download = trainer.certificateFilePath!;
          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
          toast.success("Certificate downloaded successfully.");
        })
        .catch(() => {
          toast.error(
            "Failed to download certificate. Please try again later."
          );
        })
        .finally(() => {
          setPending(false);
        });
    } else {
      toast.error("No certificate available for download.");
    }
  };

  return (
    <div className="w-full border-0 bg-background pt-0 pb-8">
      {loading && <TrainerInfoLoader />}
      {!loading && trainer && (
        <>
          <div className="relative p-4 pt-0">
            <Button
              onClick={handleDownload}
              disabled={pending}
              variant="secondary"
              className="absolute top-10 right-4"
              aria-label="Download qualification"
            >
              <div className="flex items-center gap-1.5">
                {pending ? <Loader2Icon /> : <Download className="h-4 w-4" />}

                <p className="sm:block hidden">Download qualification</p>
              </div>
            </Button>
          </div>
          <div className="p-4">
            <div className="flex flex-col md:flex-row md:gap-6 gap-3">
              <Avatar className="w-24 h-24 md:w-32 md:h-32">
                <AvatarImage
                  src={pictureUrl(trainer.profilePictureFilePath)}
                  alt="avatar"
                />
                <AvatarFallback>
                  <UserIcon
                    className="h-16 w-16 text-muted-foreground"
                    strokeWidth={1.25}
                  />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div>
                  <h2 className="text-xl font-semibold">
                    {trainer.firstName + " " + trainer.lastName}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {trainer.email}
                  </p>
                </div>
                <div className="flex items-center mt-3">
                  {trainer.dateOfBirth ? (
                    <p className="text-sm text-foreground/90">
                      {format(trainer.dateOfBirth, "P")}
                    </p>
                  ) : (
                    <p className="text-sm text-foreground/90 italic">
                      "No date of birth"
                    </p>
                  )}

                  <span className="mx-3 w-0.5 h-4 bg-muted-foreground" />
                  {trainer.gender ? (
                    <p className="text-sm font-normal text-foreground/80">
                      {capitalize(trainer.gender)}
                    </p>
                  ) : (
                    <p className="text-sm font-normal text-foreground/80 italic">
                      "No gender"
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm text-muted-foreground">
                    Contact info:{" "}
                  </span>
                  {trainer.contactInfo ? (
                    <p className="text-sm font-medium text-foreground/90">
                      {trainer.contactInfo}
                    </p>
                  ) : (
                    <p className="text-sm font-normal text-foreground/90 italic">
                      "No contact phone information available."
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 max-w-screen-lg">
              <p className="text-[15px] text-foreground/70 leading-snug text-justify text-pretty">
                {trainer.biography}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
