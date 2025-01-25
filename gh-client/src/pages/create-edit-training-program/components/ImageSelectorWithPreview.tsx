import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import noImage from "@/assets/no-image.jpg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ImageSelectorWithPreviewProps = {
  title: string;
  name: string;
  description?: string;
  initialPicture?: string;
  formats?: string;
  disabled?: boolean;
  onFileSelect?: (file?: File) => void;
};

export default function ImageSelectorWithPreview(
  props: ImageSelectorWithPreviewProps
) {
  const {
    name,
    description,
    title,
    formats,
    onFileSelect,
    disabled,
    initialPicture,
  } = props;
  const [selectedPicture, setSelectedPicture] = useState<string | undefined>(
    initialPicture
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (!file) return;

    setSelectedPicture(URL.createObjectURL(file));
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleRemovePicture = () => {
    setSelectedPicture(undefined);
    if (onFileSelect) {
      onFileSelect(undefined);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-1 h-[350px] sm:h-[465px]">
      <div className="grid w-full items-center gap-2.5 mb-1.5">
        <Label
          id={name}
          className="self-start text-sm font-medium leading-none"
        >
          {title}
        </Label>
        <Input
          id={name}
          type="file"
          className="cursor-pointer font-normal h-10"
          accept={formats}
          onChange={handleFileChange}
          disabled={disabled}
        />
      </div>
      <div className="w-full border rounded-lg overflow-hidden bg-background relative mt-3 flex-1">
        {selectedPicture && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="self-start" asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 flex-shrink-0 absolute right-2.5 top-2.5 rounded-full z-10 bg-background"
                  onClick={handleRemovePicture}
                >
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Remove image</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove image</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <img
          src={selectedPicture ?? noImage}
          alt="Selected Image"
          className={cn(
            "object-cover w-full z-0 h-full",
            !selectedPicture && "dark:filter-white"
          )}
        />
      </div>
      {description && (
        <p className="text-xs ml-0.5 text-muted-foreground text-start w-full">
          {description}
        </p>
      )}
    </div>
  );
}
