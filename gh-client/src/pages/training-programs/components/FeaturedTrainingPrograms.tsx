"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import FeaturedProgramCard from "./FeaturedProgramCard";
import Autoplay from "embla-carousel-autoplay";
import { CircleIcon } from "lucide-react";
import { FeaturedProgramCardSkeleton } from "./TrainingProgramsLoaders";
import useFeaturedTrainingPrograms from "../hooks/use-featured-programs";

export default function FeaturedTrainingPrograms() {
  const plugins: any = [];
  const { loadingFeaturedPrograms, featuredPrograms } =
    useFeaturedTrainingPrograms();

  plugins.push(
    Autoplay({
      delay: 2500,
      stopOnInteraction: false,
      stopOnFocusIn: false,
      active: true,
    })
  );

  return (
    <section className="py-4 mb-2">
      <div className="mx-auto">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <CircleIcon className="h-2 w-2" />
            <h2 className="text-pretty text-2xl inline-block tracking-tight bg-clip-text bg-gradient-to-l from-primary/80 to-gray-600 text-transparent dark:from-primary/90 dark:to-white">
              Featured training programs
            </h2>
          </div>

          <p className="text-sm text-muted-foreground">
            Discover training programs tailored for your needs ...
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          plugins={plugins}
        >
          <CarouselContent className="px-0 py-6">
            {loadingFeaturedPrograms
              ? Array.from(Array(4).keys()).map((item) => (
                  <CarouselItem
                    className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    key={item}
                  >
                    <FeaturedProgramCardSkeleton />
                  </CarouselItem>
                ))
              : featuredPrograms.map((program) => (
                  <CarouselItem
                    className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    key={program.id}
                  >
                    <FeaturedProgramCard program={program} />
                  </CarouselItem>
                ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
