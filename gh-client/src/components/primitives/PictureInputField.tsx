import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CloudUploadIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

type PictureInputFieldProps = {
  title: string;
  name: string;
  description?: string;
  initialPicture?: string;
  disabled?: boolean;
  className?: string;
  onFileSelect?: (file: File | undefined) => void;
  fileName: string;
};

export const PictureInputField = (props: PictureInputFieldProps) => {
  const {
    name,
    description,
    className,
    title,
    initialPicture,
    onFileSelect,
    disabled,
    fileName,
  } = props;
  const [selectedPicture, setSelectedPicture] = useState<string | undefined>(
    initialPicture
  );

  useEffect(() => {
    setSelectedPicture(initialPicture);
  }, [initialPicture]);

  useEffect(() => {
    if (fileName?.trim() == "") {
      setSelectedPicture(initialPicture);
    }
  }, [fileName]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (!file) return;

    setSelectedPicture(URL.createObjectURL(file));
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <FormItem className={cn("space-y-1 w-full flex flex-col", className)}>
      <FormLabel className="mb-1">{title}</FormLabel>
      <FormControl>
        <div className="flex sm:flex-row flex-col-reverse items-center justify-center w-full h-full flex-1 gap-x-4 gap-y-3 sm:pt-0 pt-4">
          <label
            htmlFor={name}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted/25",
              "dark:bg-muted/25 dark:border-border transition-all duration-200",
              disabled && "cursor-not-allowed opacity-50",
              !disabled &&
                "hover:border-foreground/30 dark:hover:bg-muted/45 dark:hover:border-foreground/30 hover:bg-muted/55"
            )}
          >
            <div className="flex flex-col items-center justify-center pt-3.5 pb-4">
              <CloudUploadIcon className="mb-1 h-8 w-8 text-muted-foreground/80" />
              <div className="sm:max-w-md max-w-32 sm:h-6">
                {fileName ? (
                  <p className="mb-1 text-sm font-semibold text-center text-ellipsis overflow-clip line-clamp-1 mx-auto">
                    {fileName}
                  </p>
                ) : (
                  <p className="mb-1 text-sm text-muted-foreground text-center">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                )}
              </div>

              <p className="text-xs text-muted-foreground text-center">
                {".png | .jpg | .jpeg"}
              </p>
            </div>
          </label>
          <div>
            <Avatar
              className={cn(
                "h-28 w-28 border-2 border-foreground/20 dark:border-foreground/60",
                disabled && "opacity-85"
              )}
            >
              <AvatarImage src={selectedPicture} alt="@" />
              <AvatarFallback className="text-base">
                <UserIcon
                  strokeWidth={1.25}
                  className="h-16 w-16 text-muted-foreground"
                />
              </AvatarFallback>
            </Avatar>
          </div>
          <Input
            id={name}
            type="file"
            className="hidden"
            accept={".png,.jpg,.jpeg"}
            onChange={handleFileChange}
            disabled={disabled}
          />
        </div>
      </FormControl>
      {description && (
        <FormDescription className="text-xs ml-0.5">
          {description}
        </FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
};
