import programImg from "@/assets/program-example.png";
import { Badge } from "@/components/ui/badge";
import { ActivityIcon, UserPlus, UserXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/primitives/StarRating";
import { getSingleTrainingProgram } from "@/api/services/program-details-service";
import { SingleTrainingProgram } from "@/api/models/program-details";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleTrainingProgramLoader from "./components/SingleTrainingProgramLoader";

export default function TrainingProgramInfo() {
  const params = useParams();
  const [program, setProgram] = useState<SingleTrainingProgram>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const programId = params["id"];
    if (!programId) {
      console.error("No program ID provided");
      setLoading(false);
      return;
    }

    setLoading(true);

    getSingleTrainingProgram(parseInt(programId))
      .then((value) => {
        setProgram(value);
      })
      .catch((error) => {
        console.error("Error fetching program:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <SingleTrainingProgramLoader />;
  }

  if (!program) {
    return (
      <p className="mt-4 text-center text-sm text-muted-foreground">
        There is no data available to display for this program.
      </p>
    );
  }

  return (
    <div className="my-4 flex flex-col lg:flex-row h-auto py-4 lg:px-0 px-4 relative">
      <div className="w-full lg:w-1/3 mb-4 lg:mb-0 lg:border-2 rounded-xl overflow-hidden">
        <img
          src={program.imageFilePath || programImg}
          alt="Training Program"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full lg:w-2/3 pl-0 lg:pl-8 relative flex flex-col">
        <div className="flex md:flex-row flex-col justify-between mt-3 gap-y-6">
          <div className="relative flex items-center gap-5">
            <div>
              <h1 className="text-3xl font-semibold leading-tight">
                {program.name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ActivityIcon className="h-4 w-4" />
                <p className="text-base text-muted-foreground font-semibold">
                  {program.difficulty}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <p className="text-xs mb-0.5">{program.totalRates + " reviews"}</p>
            <StarRating readonly={true} rating={program.averageRate} />
          </div>
        </div>

        <h2 className="text-base text-muted-foreground text-justify mt-4">
          {program.description}
        </h2>

        <div className="mt-3 text-base gap-2 flex flex-row items-center">
          <p className="text-foreground/80">Trainer:</p>
          <p className="">
            {program.trainerFirstName + " " + program.trainerLastName}
          </p>
        </div>

        <div className="pb-4">
          <p className="mt-1 text-sm text-foreground/80">
            Currently enrolled:{" "}
            <span className="text-foreground">{program.currentlyEnrolled}</span>
          </p>
          <div className="mt-4 flex items-center flex-wrap gap-2">
            {program.categories?.length > 0 ? (
              program.categories.map((item) => (
                <Badge
                  key={item.category.id}
                  variant="secondary"
                  className="text-base px-3 border-foreground/30 font-normal py-px h-auto transition-none"
                >
                  {item.category.categoryName}
                </Badge>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                There are no defined categories
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-2 lg:mt-auto mt-4 mb-0.5">
          <Button variant="secondary" className="h-auto items-center min-w-32">
            <UserPlus className="h-5 w-5 text-primary" />
            <span>Join</span>
          </Button>
          <Button variant="outline" className="h-auto items-center min-w-32">
            <UserXIcon className="h-5 w-5 text-destructive" />
            <span>Leave</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
