import React from "react";
import programImg from "@/assets/program-example.png";
import { Badge } from "@/components/ui/badge";
import { UserPlus, UserX } from "lucide-react";
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

      <div className="w-full lg:w-2/3 pl-0 lg:pl-8 relative flex flex-col gap-2">
        <div className="flex justify-between mt-6">
          <div className="relative flex items-center gap-2">
            <h1 className="text-2xl font-semibold">Pilates Harmony</h1>
            <div className="flex">
              <Button variant="ghost" className="text-2xl">
                <UserPlus />
              </Button>
              <Button variant="ghost" className="text-2xl">
                <UserX />
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-right">
            <p className="text-xs text-right mb-0.5">10 reviews</p>
            <StarRating />
          </div>
        </div>

        <h2 className="text-sm text-muted-foreground text-justify mt-2">
          "Pilates Harmony" je holistički program vježbanja koji se fokusira na
          razvoj snage, fleksibilnosti, stabilnosti i koordinacije tijela. Ovaj
          program takođe promoviše unutrašnji mir i mentalni fokus kroz tehnike
          disanja i svijesti o tijelu. Vježbe u "Pilates Harmony" se obično
          izvode polako i kontrolisano, sa naglaskom na pravilnoj tehnici
          izvođenja. Ovaj program može biti prilagođen različitim nivoima
          vježbača, od početnika do naprednih.
        </h2>

        <div className="mt-2 text-sm gap-2 flex flex-row items-center">
          <p>Trainer:</p>
          <p className="text-base">Anja Mirković</p>
        </div>

        <div className="pb-4">
          <p className="mt-2 text-sm">Currently enrolled: 2</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="text-base px-3 py-1 border-foreground/50 font-normal"
            >
              Cardio
            </Badge>
            <Badge
              variant="secondary"
              className="text-base px-3 py-1 border-foreground/50 font-normal"
            >
              Strength
            </Badge>
            <Badge
              variant="secondary"
              className="text-base px-3 py-1 border-foreground/50 font-normal"
            >
              Flexibility
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
