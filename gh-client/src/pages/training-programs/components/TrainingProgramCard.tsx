import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrashIcon } from "lucide-react";

type TrainingProgramCardProps = {
  title: string;
  description: string;
  img: string;
  id: number;
  trainer: string;
  myProgram: boolean;
};

export function TrainingProgramCard(props: TrainingProgramCardProps) {
  return (
    <Card
      key={props.id}
      className="h-25 transform hover:scale-110 max-w-xl mt-4 rounded-lg overflow-hidden shadown-md hover:shadow-lg transition-shadow duration-300"
    >
      <img src={props.img} className="w-full h-25 object-cover"></img>
      <CardHeader>
        <CardTitle className="text-1xl">{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{props.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 justify-between space-between">
          <p>{props.trainer}</p>
          {props.myProgram && (
            <Button>
              <TrashIcon></TrashIcon>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
