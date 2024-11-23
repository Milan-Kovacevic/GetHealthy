import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users } from "lucide-react";
import React from "react";

import { Link, useNavigate } from "react-router-dom";

type FeatureProgramCardProps = {
  program: any;
};

export default function FeaturedProgramCard(props: FeatureProgramCardProps) {
  const { program } = props;
  const navigate = useNavigate();

  const handleCardClicked = () => {
    navigate(`/programs/${program.id}`);
  };

  return (
    <Card
      className="shadow-md  rounded-lg overflow-hidden md:hover:scale-105 hover:cursor-pointer transition-all duration-200 self-stretch mr-0 h-full"
      onClick={handleCardClicked}
    >
      <CardContent className="p-0">
        <div className="relative max-h-48 h-48 flex">
          <div className="flex justify-between items-center p-4 absolute w-full">
            <Badge variant="secondary" className="border-primary">
              {program.difficulty}
            </Badge>
          </div>
          <AspectRatio
            ratio={16 / 9}
            className="relative bg-muted/20 dark:bg-muted/20 border-b max-h-48"
          >
            <img
              src={program.image}
              className="rounded-md object-contain w-full h-full"
            ></img>
          </AspectRatio>
        </div>
        <div className="py-4 pt-3 px-5 select-none">
          <h3 className="text-lg font-medium mb-2 mt-0">{program.title}</h3>

          <p className="text-foreground/85 mb-2 text-sm">
            Trainer: {program.trainer}
          </p>
          <div className="flex items-center mb-2">
            <Star className="w-4 h-4 text-primary/80 mr-1" />
            <span className="font-medium text-sm">{program.rating}</span>
            <span className="text-muted-foreground ml-2 text-xs">
              • Created{" "}
              <span className="font-semibold">{program.createdAgo}</span> ago
            </span>
          </div>
          <div className="mb-2 flex flex-wrap gap-x-1.5 gap-y-1.5">
            {program.categories
              .slice(0, 4)
              .map((category: any, index: number) => (
                <Badge key={index} variant="secondary" className="">
                  {category}
                </Badge>
              ))}
          </div>
          <div className="mt-auto">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <div className="flex items-center">
                <Users className="w-3.5 h-3.5 mr-1" />
                <span>{program.participants} participants</span>
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
