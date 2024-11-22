"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import FeaturedProgramCard from "./FeaturedProgramCard";
import Autoplay from "embla-carousel-autoplay";
import { CircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FeaturedProgramCardSkeleton } from "./TrainingProgramsLoaders";

// Sample data for training programs
const trainingPrograms = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    trainer: "John Doe",
    description:
      "Learn full-stack web development from scratch with hands-on projects and industry best practices.",
    image: "https://cdn-icons-png.flaticon.com/512/9584/9584876.png",
    rating: 4.8,
    createdAgo: "2 weeks",
    categories: ["Web Development", "JavaScript", "React", "Node.js"],
    difficulty: "Intermediate",
    participants: 25,
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    trainer: "Jane Smith",
    description:
      "Master the basics of data analysis and machine learning with Python and popular libraries.",
    image: "https://cdn-icons-png.flaticon.com/512/9584/9584876.png",
    rating: 4.7,
    createdAgo: "1 month",
    categories: ["Data Science", "Python", "Machine Learning"],
    difficulty: "Beginner",
    participants: 20,
  },
  {
    id: 3,
    title: "UX/UI Design Workshop",
    trainer: "Alice Johnson",
    description:
      "Create stunning user interfaces and experiences using modern design tools and principles.",
    image: "https://cdn-icons-png.flaticon.com/512/9584/9584876.png",
    rating: 4.9,
    createdAgo: "3 days",
    categories: ["Design", "UX", "UI", "Figma"],
    difficulty: "Advanced",
    participants: 15,
  },
  {
    id: 4,
    title: "UX/UI Design Workshop",
    trainer: "Alice Johnson",
    description:
      "Create stunning user interfaces and experiences using modern design tools and principles.",
    image: "https://cdn-icons-png.flaticon.com/512/9584/9584876.png",
    rating: 4.9,
    createdAgo: "3 days",
    categories: ["Design", "UX", "UI", "Figma"],
    difficulty: "Advanced",
    participants: 15,
  },
  {
    id: 5,
    title: "Data Science Fundamentals",
    trainer: "Jane Smith",
    description:
      "Master the basics of data analysis and machine learning with Python and popular libraries.",
    image: "https://cdn-icons-png.flaticon.com/512/9584/9584876.png",
    rating: 4.7,
    createdAgo: "1 month",
    categories: ["Data Science", "Python", "Machine Learning"],
    difficulty: "Beginner",
    participants: 20,
  },
];

export default function FeaturedTrainingPrograms() {
  const plugins: any = [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 2400)).then(() =>
      setLoading(false)
    );
  }, []);

  plugins.push(
    Autoplay({
      delay: 2500,
      stopOnInteraction: false,
      stopOnFocusIn: false,
      active: true,
    })
  );

  return (
    <section className="py-4">
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
            {loading
              ? Array.from(Array(4).keys()).map((item) => (
                  <CarouselItem
                    className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    key={item}
                  >
                    <FeaturedProgramCardSkeleton />
                  </CarouselItem>
                ))
              : trainingPrograms.map((program) => (
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
