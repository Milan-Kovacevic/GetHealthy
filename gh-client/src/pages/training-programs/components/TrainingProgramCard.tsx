import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteAlert } from "@/pages/shared/DeleteAlert";
import { Edit2Icon, Star, StarHalf } from "lucide-react";

type TrainingProgramCardProps = {
  title: string;
  description: string;
  img: string;
  id: number;
  trainer: string;
  myProgram: boolean;
  category: string;
  rating: number;
};

export function TrainingProgramCard(props: TrainingProgramCardProps) {
  const fullStars = Math.floor(props.rating);
  const hasHalfStar = props.rating % 1 != 0;
  return (
    <Card
      key={props.id}
      className="h-25 transform hover:cursor-pointer hover:scale-110 max-w-xl mt-4 rounded-lg overflow-hidden shadown-md hover:shadow-lg transition-shadow duration-300 relative"
    >
      <Badge className="absolute m-3 z-10" variant={"secondary"}>
        {props.category}
      </Badge>
      <Badge
        variant="secondary"
        className="absolute top-3 right-3 font-semibold px-2 py-1"
      >
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 inline fill-primary text-primary" />
        ))}
        {hasHalfStar && (
          <StarHalf className="w-4 h-4 inline fill-primary text-primary" />
        )}
        <span className="ml-1 text-xs">{props.rating.toFixed(1)}</span>
      </Badge>
      <img src={props.img} className="w-full h-25 object-cover"></img>
      <CardHeader>
        <CardTitle className="text-1xl">{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2">
          {props.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 justify-between space-between">
          <p>{props.trainer}</p>
          {props.myProgram && (
            <>
              <DeleteAlert
                title="Delete"
                description="Confirm deletion"
              ></DeleteAlert>
              <Button variant={"outline"}>
                <Edit2Icon></Edit2Icon>
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
