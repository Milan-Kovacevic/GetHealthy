import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { DeleteAlert } from "@/pages/shared/DeleteAlert";
import {
  ClockIcon,
  Edit2Icon,
  Star,
  StarOffIcon,
  TrashIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import noImage from "@/assets/no-image.jpg";
import { capitalize, cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

type TrainingProgramCardProps = {
  id: number;
  title: string;
  trainer: string;
  description: string;
  image?: string;
  rating?: number;
  categories: string[];
  difficulty: string;
  createdAt: string;
  editable: boolean;
};

export function TrainingProgramCard(props: TrainingProgramCardProps) {
  const navigate = useNavigate();

  const handleCardClicked = () => {
    navigate(`/programs/${props.id}`);
  };

  const handleEditProgramClicked = () => {
    navigate(`/programs/${props.id}/edit`);
  };

  return (
    <Card
      key={props.id}
      onClick={handleCardClicked}
      className="group transform hover:cursor-pointer md:max-h-[400px] md:max-w-xl rounded-lg overflow-hidden shadown-md hover:shadow-lg transition-all duration-200 relative"
    >
      <div className="border-b">
        <Badge
          className="absolute m-3 z-10 pointer-events-none border-primary/80"
          variant={"secondary"}
        >
          {capitalize(props.difficulty)}
        </Badge>
        <Badge
          variant="secondary"
          className="absolute top-3 z-10 right-3 font-semibold px-2 py-1 pointer-events-none border-primary/80"
        >
          {props.rating == 0 && (
            <StarOffIcon className="w-4 h-4 text-primary/80 mr-1" />
          )}
          {props.rating && props.rating != 0 && (
            <>
              <Star className="w-4 h-4 text-primary/80 mr-1 fill-primary/80" />
              <span className="font-medium text-sm">
                {props.rating.toFixed(1)}
              </span>
            </>
          )}
        </Badge>

        <div className="bg-primary/10 dark:bg-primary/5 w-full">
          <img
            src={props.image ?? noImage}
            className={cn(
              "w-full md:h-48 h-72 object-cover border-border mix-blend-luminosity dark:mix-blend-luminosity",
              !props.image && "dark:filter-white"
            )}
          ></img>
        </div>
      </div>

      <CardContent className="p-3 px-4">
        <div className="flex justify-between items-center gap-2">
          <CardTitle className="xl:text-lg font-semibold xl:leading-tight text-base leading-none">
            {props.title}
          </CardTitle>
          <div className="flex gap-0 justify-between space-between">
            {props.editable && (
              <>
                <DeleteAlert title="Delete" description="Confirm deletion">
                  <Button size="sm" variant="ghost">
                    <TrashIcon />
                  </Button>
                </DeleteAlert>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEditProgramClicked()}
                >
                  <Edit2Icon></Edit2Icon>
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center mt-1 mb-1.5">
          <p className="text-foreground/85 text-sm font-medium">
            {props.trainer}
          </p>
          <span className="text-muted-foreground ml-2 text-xs">
            • <span className="font-semibold">20</span> participants
          </span>
        </div>
        <div className="mb-2 flex flex-wrap gap-x-1.5 gap-y-1.5">
          {props.categories.length == 0 && (
            <span className="text-foreground/75 text-sm italic">
              No categories...
            </span>
          )}
          {props.categories.slice(0, 4).map((category: any, index: number) => (
            <Badge key={index} variant="secondary" className="">
              {category}
            </Badge>
          ))}
        </div>
        <CardDescription className="line-clamp-3 text-xs">
          {props.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="px-4 mt-1 pb-3">
        <span className="text-muted-foreground text-xs ml-auto flex items-center gap-1">
          <ClockIcon className="h-3.5 w-3.5" />
          <span className="font-semibold">
            {formatDistanceToNow(props.createdAt)}
          </span>{" "}
          ago
        </span>
      </CardFooter>
    </Card>
  );
}
