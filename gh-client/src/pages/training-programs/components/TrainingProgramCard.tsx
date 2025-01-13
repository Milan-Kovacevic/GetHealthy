import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { ClockIcon, Star, StarOffIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import noImage from "@/assets/no-image.jpg";
import { capitalize, cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { TrainingProgram } from "@/api/models/training-program";

type TrainingProgramCardProps = {
  program: TrainingProgram;
};

export function TrainingProgramCard(props: TrainingProgramCardProps) {
  const { program } = props;
  const navigate = useNavigate();

  const handleCardClicked = () => {
    navigate(`/programs/${program.id}`);
  };

  const categories = program.categories.map((c) => c.name);

  return (
    <Card
      key={program.id}
      className="group transform hover:cursor-pointer md:max-h-[400px] md:max-w-xl rounded-lg overflow-hidden shadown-md hover:shadow-lg transition-all duration-200 relative flex flex-col"
      onClick={handleCardClicked}
    >
      <div className="border-b">
        <Badge
          className="absolute m-3 z-10 pointer-events-none border-primary/80"
          variant={"secondary"}
        >
          {capitalize(program.difficulty)}
        </Badge>
        <Badge
          variant="secondary"
          className="absolute top-3 z-10 right-3 font-semibold px-2 py-1 pointer-events-none border-primary/80"
        >
          {program.rating == 0 && (
            <StarOffIcon className="w-4 h-4 text-primary/80 mr-1" />
          )}
          {program.rating && program.rating != 0 && (
            <>
              <Star className="w-4 h-4 text-primary/80 mr-1 fill-primary/80" />
              <span className="font-medium text-sm">
                {program.rating.toFixed(1)}
              </span>
            </>
          )}
        </Badge>

        <div className="bg-primary/10 dark:bg-primary/5 w-full">
          <img
            src={program.imageFilePath ?? noImage}
            className={cn(
              "w-full md:h-48 h-72 object-cover border-border mix-blend-luminosity dark:mix-blend-luminosity",
              !program.imageFilePath && "dark:filter-white"
            )}
          ></img>
        </div>
      </div>

      <CardContent className="p-3 px-4 flex-1">
        <div className="flex justify-between items-center gap-2">
          <CardTitle className="xl:text-lg font-semibold xl:leading-tight text-base leading-none">
            {program.name}
          </CardTitle>
        </div>

        <div className="flex items-center mt-1 mb-1.5">
          <p className="text-foreground/85 text-sm font-normal">
            {program.trainerFirstName} {program.trainerLastName}
          </p>
          <span className="text-muted-foreground ml-2 text-xs">
            • <span className="font-semibold">20</span> participants
          </span>
        </div>
        <div className="mb-2.5 flex flex-wrap gap-x-1.5 gap-y-1.5">
          {categories.length == 0 && (
            <span className="text-foreground/75 text-xs italic">
              No categories...
            </span>
          )}
          {categories.slice(0, 4).map((category, index) => (
            <Badge key={index} variant="secondary" className="">
              {category}
            </Badge>
          ))}
        </div>
        <CardDescription className="line-clamp-3 flex-1 text-xs">
          {program.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="px-4 mt-1 pb-3">
        <span className="text-muted-foreground text-[11px] ml-auto flex items-center gap-1">
          <ClockIcon className="h-3 w-3" />
          <span className="font-semibold">
            {formatDistanceToNow(program.createdAt)}
          </span>{" "}
          ago
        </span>
      </CardFooter>
    </Card>
  );
}
