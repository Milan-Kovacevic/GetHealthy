"use client";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CloudUploadIcon } from "lucide-react";
import { useState } from "react";

type FileInputFieldProps = {
  title: string;
  name: string;
  description?: string;
  initialFile?: string;
  formats?: string;
  disabled?: boolean;
  className?: string;
  onFileSelect?: (file: File | undefined) => void;
};

export const FileInputField = (props: FileInputFieldProps) => {
  const {
    name,
    description,
    className,
    title,
    formats,
    onFileSelect,
    disabled,
    initialFile,
  } = props;
  const [selectedFile, setSelectedFile] = useState<File>();
  const [currentFileName, setCurrentFileName] = useState(initialFile || "");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    setSelectedFile(file);
    setCurrentFileName(file ? file.name : initialFile || "");
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <FormItem className={cn("space-y-1 w-full flex flex-col", className)}>
      <FormLabel className="mb-1">{title}</FormLabel>
      <FormControl>
        <div className="flex items-center justify-center w-full h-full flex-1 gap-4">
          <label
            htmlFor={name}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted/25 dark:hover:bg-muted/45",
              "hover:border-foreground/30 dark:bg-muted/25 hover:bg-muted/55 dark:border-border dark:hover:border-foreground/30 transition-all",
              disabled && "cursor-not-allowed"
            )}
          >
            <div className="flex flex-col items-center justify-center pt-3.5 pb-4">
              <CloudUploadIcon className="mb-1 h-8 w-8 text-muted-foreground/80" />
              <div className="sm:max-w-md max-w-32 sm:h-6">
                {/* {selectedFile ? (
                  <p className="mb-1 text-sm font-semibold text-center text-ellipsis overflow-clip line-clamp-1 mx-auto">
                    {selectedFile.name}
                  </p>
                )  */}
                {currentFileName ? (
                  <p className="mb-1 text-sm font-semibold text-center text-ellipsis overflow-clip line-clamp-1 mx-auto">
                    {currentFileName}
                  </p>
                ) : (
                  <p className="mb-1 text-sm text-muted-foreground text-center">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                )}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {formats}
              </p>
            </div>
          </label>
          <Input
            id={name}
            type="file"
            className="hidden"
            // onChange={(event) => {
            //   if (event.target?.files) {
            //     setSelectedFile(event.target?.files?.[0]);
            //   }
            // }}
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
