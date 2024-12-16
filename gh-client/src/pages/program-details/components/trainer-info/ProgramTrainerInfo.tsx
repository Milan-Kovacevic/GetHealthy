import { SingleProgramTrainer } from "@/api/models/program-details";
import { getSingleProgramTrainer } from "@/api/services/program-details-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import trainerImg from "@/assets/trainer.png";
import { useParams } from "react-router-dom";
import TrainerInfoLoader from "./TrainerInfoLoader";

export default function ProgramTrainerInfo() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="w-full border-0 bg-background pt-0 pb-8">
      {loading && <TrainerInfoLoader />}
      {!loading && trainer && (
        <>
          <div className="relative p-4 pt-0">
            <Button
              variant="secondary"
              className="absolute top-10 right-4"
              aria-label="Download qualification"
            >
              <div className="flex items-center gap-1.5">
                <Download className="h-4 w-4" />
                <p className="sm:block hidden">Download qualification</p>
              </div>
            </Button>
          </div>
          <div className="p-4">
            <div className="flex flex-col md:flex-row md:gap-6 gap-3">
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
                  <p className="text-sm text-muted-foreground">
                    {trainer.email}
                  </p>
                </div>
                <div className="flex items-center mt-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground/90">
                      {trainer.dateOfBirth}
                    </p>
                  </div>
                  <span className="mx-3 w-0.5 h-4 bg-muted-foreground" />
                  <div>
                    <p className="text-sm font-normal text-foreground/80">
                      {trainer.gender}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Contact info:{" "}
                  </span>
                  <p className="text-sm font-medium text-foreground/90">
                    {trainer.contactInfo ||
                      "No contact phone information available."}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 max-w-screen-lg">
              <p className="text-sm text-muted-foreground text-justify text-pretty">
                {trainer.biography}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
