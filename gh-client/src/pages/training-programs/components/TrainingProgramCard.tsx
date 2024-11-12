import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Delete } from "@/pages/shared/Delete";
import { Edit } from "lucide-react";

type TrainingProgramCardProps = {
  title: string;
  description: string;
  img: string;
  key: number;
};

export function TrainingProgramCard(props: TrainingProgramCardProps) {
  return (
    <Card className="w-full m-5 flex" key={props.key}>
      <CardContent>
       
      </CardContent>
      <CardTitle className="w-full m-10">{props.title}</CardTitle>
      <CardDescription className="m-10">{props.description}</CardDescription>
      <div className="flex justify-end w-full">
        <CardFooter className="flex p-2 flex-col m-2">
          <Button className="m-1">
            <Edit></Edit>
          </Button>
          <Delete className="m-1" description="nesto" title="Brisi"></Delete>
        </CardFooter>
      </div>
    </Card>
  );
}
