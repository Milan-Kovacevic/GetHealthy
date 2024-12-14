import { SingleProgramTrainer } from "@/api/models/program-details";
import { getSingleProgramTrainer } from "@/api/services/program-details-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import trainerImg from "@/assets/trainer.png";
import { useParams } from "react-router-dom";

export default function ProgramTrainerInfo() {
  const params = useParams();
  const [trainer, setTrainer] = useState<SingleProgramTrainer>();

  useEffect(() => {
    const programId = params["id"];
    if (!programId) {
      console.error("No program ID provided");
      return;
    }

    getSingleProgramTrainer(parseInt(programId))
      .then((value) => {
        setTrainer(value);
      })
      .catch((error) => {
        console.error("Error fetching trainer information:", error);
      })
      .finally(() => {});
  }, []);

  if (!trainer) {
    return (
      <p className="mt-4 text-center text-sm text-muted-foreground">
        There is no trainer information available for this program.
      </p>
    );
  }

  return (
    <div className="w-full border-0 bg-background">
      <div className="relative p-4">
        <Button
          variant="secondary"
          className="absolute top-4 mt-8 right-4"
          aria-label="Download qualification"
        >
          <div className="flex items-center gap-1.5">
            <Download className="h-4 w-4" />
            <p className="sm:block hidden">Download qualification</p>
          </div>
        </Button>
      </div>
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <Avatar className="w-24 h-24 md:w-32 md:h-32">
            <AvatarImage
              src={trainerImg || trainer.profilePictureFilePath} //zamijeniti
              alt="avatar"
            />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div>
              <h2 className="text-xl font-bold">
                {trainer.firstName + " " + trainer.lastName}
              </h2>
              <p className="text-base text-muted-foreground">{trainer.email}</p>
            </div>
            <div className="flex items-center mt-2">
              <div>
                <p className="text-sm font-medium">{trainer.dateOfBirth}</p>
              </div>
              <span className="mx-4 w-0.5 h-4 bg-foreground/50" />
              <div>
                <p className="text-sm">{trainer.gender}</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium">
                {trainer.contactInfo ||
                  "No contact phone information available."}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 max-w-screen-lg">
          <p className="text-base text-muted-foreground text-justify text-pretty">
            {trainer.biography}
          </p>
        </div>
      </div>
    </div>
  );
}
