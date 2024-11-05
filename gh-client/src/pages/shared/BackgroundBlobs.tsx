import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

const TopBackgroundBlob = () => {
  return (
    <div
      aria-hidden="true"
      className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
    >
      <div className="bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
      <div className="bg-gradient-to-tl blur-2xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary/10 via-primary/10 to-background dark:from-primary/5 dark:via-primary/10" />
    </div>
  );
};

interface CircleBackgroundBlobProps extends PropsWithChildren {
  className?: string;
  variant: "lighter" | "light" | "lightest";
}
const CircleBackgroundBlob = (props: CircleBackgroundBlobProps) => {
  const { className, variant } = props;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute bottom-14 -left-4 w-96 h-96 bg-primary/15 dark:bg-primary/5 rounded-full filter blur-3xl",
        variant == "light" && "bg-primary/15 dark:bg-primary/10",
        variant == "lighter" && "bg-primary/10 dark:bg-primary/5",
        variant == "lightest" && "bg-primary/5 dark:bg-primary/5",
        className
      )}
    />
  );
};

export { TopBackgroundBlob, CircleBackgroundBlob };
