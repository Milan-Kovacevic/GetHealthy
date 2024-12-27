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
import { Edit2Icon, Star, StarOffIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type TrainingProgramCardProps = {
  id: number;
  title: string;
  trainer: string;
  description: string;
  image: string;
  rating?: number;
  categories: string[];
  difficulty: string;
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
      className="group transform hover:cursor-pointer max-h-[400px] max-w-xl rounded-lg overflow-hidden shadown-md hover:shadow-lg transition-all duration-200 relative"
    >
      <div className="border-b">
        <div className="z-10">
          <Badge
            className="absolute m-3 z-10 pointer-events-none"
            variant={"secondary"}
          >
            {props.difficulty}
          </Badge>
          <Badge
            variant="secondary"
            className="absolute top-3 z-10 right-3 font-semibold px-2 py-1 pointer-events-none"
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
        </div>

        <img
          src={props.image}
          className="w-full h-48 object-cover opacity-90 group-hover:opacity-100"
        ></img>
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

        <p className="text-foreground/85 my-2 text-sm">
          Trainer: {props.trainer}
        </p>
        <div className="mb-2 flex flex-wrap gap-x-1.5 gap-y-1.5">
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
      <CardFooter></CardFooter>
    </Card>
  );
}
