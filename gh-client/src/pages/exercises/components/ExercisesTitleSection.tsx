import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

type ExercisesTitleSectionProps = {
  onSearchExercises: (query: string) => void;
  showVideos: boolean;
  setShowVideos: (value: boolean) => void;
};

const ExercisesTitleSection = (props: ExercisesTitleSectionProps) => {
  const { setShowVideos, onSearchExercises, showVideos } = props;
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSearchExercises(searchQuery);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Exercises
        </h1>
        <p className="mt-1 text-base lg:text-xl text-muted-foreground">
          Browse available exercises here.
        </p>
        <div className="mt-8 mx-auto max-w-xl relative">
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="relative z-10 flex space-x-3 p-3 border bg-background rounded-lg shadow-lg">
              <div className="flex-[1_0_0%]">
                <Input
                  name="search"
                  className="h-full"
                  placeholder="Search exercise..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex-[0_0_auto]">
                <Button size={"icon"}>
                  <SearchIcon />
                </Button>
              </div>
            </div>
          </form>

          {/* End Form */}
          {/* SVG Element */}
          <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20 z-0">
            <svg
              className="w-16 h-auto text-primary/50"
              width={121}
              height={135}
              viewBox="0 0 121 135"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                stroke="currentColor"
                strokeWidth={10}
                strokeLinecap="round"
              />
              <path
                d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                stroke="currentColor"
                strokeWidth={10}
                strokeLinecap="round"
              />
              <path
                d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                stroke="currentColor"
                strokeWidth={10}
                strokeLinecap="round"
              />
            </svg>
          </div>
          {/* End SVG Element */}
          {/* SVG Element */}
          <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32 z-0">
            <svg
              className="w-40 h-auto text-primary/20"
              width={347}
              height={188}
              viewBox="0 0 347 188"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                stroke="currentColor"
                strokeWidth={7}
                strokeLinecap="round"
              />
            </svg>
          </div>
          {/* End SVG Element */}
        </div>
        <div className="flex space-x-2 mt-5 mx-auto max-w-xl z-10 relative">
          <Checkbox
            id="show-demo"
            checked={showVideos}
            onCheckedChange={(value) => setShowVideos(!!value)}
          />
          <div className="grid gap-1 leading-none">
            <label
              htmlFor="show-demo"
              className="text-sm text-start font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show demo videos
            </label>
            <p className="text-[11px] text-muted-foreground text-start">
              You can choose to watch demonstration videos directly here or by
              clicking the link to the source.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisesTitleSection;
