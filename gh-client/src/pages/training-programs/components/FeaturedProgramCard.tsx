import { FeaturedTrainingProgram } from "@/api/models/training-program";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, StarIcon, StarOffIcon, Users } from "lucide-react";
import noImage from "@/assets/no-image.jpg";
import { Link, useNavigate } from "react-router-dom";
import { capitalize, cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

type FeatureProgramCardProps = {
  program: FeaturedTrainingProgram;
};

export default function FeaturedProgramCard(props: FeatureProgramCardProps) {
  const { program } = props;
  const navigate = useNavigate();

  const handleCardClicked = () => {
    navigate(`/programs/${program.id}`);
  };

  return (
    <Card
      className="shadow-md rounded-lg overflow-hidden md:hover:scale-105 hover:cursor-pointer transition-all duration-200 self-stretch mr-0 h-full"
      onClick={handleCardClicked}
    >
      <CardContent className="p-0">
        <div className="relative max-h-48 h-48 flex">
          <div className="flex justify-between items-center p-4 absolute w-full z-10">
            <Badge variant="secondary" className="border-primary">
              {capitalize(program.difficulty)}
            </Badge>
          </div>
          <AspectRatio
            ratio={16 / 9}
            className="relative border-b max-h-48 w-full bg-primary/5 dark:bg-primary/5"
          >
            <img
              src={program.imageFilePath ?? noImage}
              className={cn(
                "rounded-md rounded-b-none object-cover w-full h-full",
                !program.imageFilePath && "dark:filter-white"
              )}
            ></img>
          </AspectRatio>
        </div>
        <div className="py-4 pt-3 px-5 select-none">
          <h3 className="text-lg font-medium mb-2 mt-0">{program.name}</h3>

          <p className="text-foreground/85 mb-2 text-sm">
            Trainer: {program.trainerFirstName} {program.trainerLastName}
          </p>
          <div className="flex items-center mb-2">
            {(!program.rating || program.rating == 0) && (
              <StarOffIcon className="w-4 h-4 text-primary/80 mr-1" />
            )}

            {program.rating != 0 && (
              <>
                <StarIcon className="w-4 h-4 text-primary/80 mr-1 fill-primary/80" />
                {program.rating && (
                  <span className="font-medium text-xs">
                    {program.rating.toFixed(1)}
                  </span>
                )}
              </>
            )}

            <span className="text-muted-foreground ml-2 text-xs">
              • Created{" "}
              <span className="font-semibold">
                {formatDistanceToNow(program.createdAt)}
              </span>{" "}
              ago
            </span>
          </div>
          <div className="mb-2 flex flex-wrap gap-x-1.5 gap-y-1.5">
            {program.categories.slice(0, 4).map((category) => (
              <Badge key={category.categoryId} variant="secondary" className="">
                {category.name}
              </Badge>
            ))}
          </div>
          <div className="mt-auto">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <div className="flex items-center">
                <Users className="w-3.5 h-3.5 mr-1" />
                <span>{program.participants ?? "No "} participants</span>
              </div>
            </div>
            <div className="mb-0">
              <p className="text-foreground/75 line-clamp-1 text-xs">
                {program.description}{" "}
              </p>
              {program.description.length > 50 && (
                <Button
                  variant="link"
                  //   asChild
                  className="h-auto text-xs text-foreground px-0 leading-none"
                >
                  <Link to={`/programs/${program.id}`}>View Details</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
