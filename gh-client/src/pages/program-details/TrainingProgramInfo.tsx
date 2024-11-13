import React from "react";
import programImg from "@/assets/program-example.png";
import { Badge } from "@/components/ui/badge";
import { UserPlus, UserX, UserXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/primitives/StarRating";

export default function TrainingProgramInfo() {
  return (
    <div className="my-4 flex flex-col lg:flex-row h-auto p-4 relative">
      <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
        <img
          src={programImg}
          alt="Training Program"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full lg:w-2/3 pl-0 lg:pl-8 relative flex flex-col">
        <div className="flex md:flex-row flex-col justify-between mt-6 gap-y-6">
          <div className="relative flex items-center gap-5">
            <h1 className="text-3xl font-semibold">Pilates Harmony</h1>
            <div className="flex items-center gap-2">
              <Button variant="secondary" className="h-auto">
                Join <UserPlus className="h-18 w-18 text-primary" />
              </Button>
              <Button variant="outline" className="">
                Leave <UserXIcon className="h-18 w-18 text-destructive" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <p className="text-xs mb-0.5">10 reviews</p>
            <StarRating />
          </div>
        </div>

        <h2 className="text-base text-muted-foreground text-justify mt-4">
          "Pilates Harmony" je holistički program vježbanja koji se fokusira na
          razvoj snage, fleksibilnosti, stabilnosti i koordinacije tijela. Ovaj
          program takođe promoviše unutrašnji mir i mentalni fokus kroz tehnike
          disanja i svijesti o tijelu. Vježbe u "Pilates Harmony" se obično
          izvode polako i kontrolisano, sa naglaskom na pravilnoj tehnici
          izvođenja. Ovaj program može biti prilagođen različitim nivoima
          vježbača, od početnika do naprednih.
        </h2>

        <div className="mt-3 text-base gap-2 flex flex-row items-center">
          <p className="text-foreground/80">Trainer:</p>
          <p className="">Anja Mirković</p>
        </div>

        <div className="pb-4">
          <p className="mt-1 text-sm text-foreground/80">
            Currently enrolled: <span className="text-foreground">2</span>
          </p>
          <div className="mt-4 flex items-center flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="text-base px-3 border-foreground/50 font-normal py-px h-auto transition-none"
            >
              Cardio
            </Badge>
            <Badge
              variant="secondary"
              className="text-base px-3 border-foreground/50 font-normal py-px h-auto transition-none"
            >
              Strength
            </Badge>
            <Badge
              variant="secondary"
              className="text-base px-3 border-foreground/50 font-normal py-px h-auto transition-none"
            >
              Flexibility
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
