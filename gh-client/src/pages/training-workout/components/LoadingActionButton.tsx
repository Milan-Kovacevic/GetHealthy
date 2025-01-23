import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { IconNode, Loader2Icon, LucideProps } from "lucide-react";
import React, { ReactNode } from "react";

type LoadingActionButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  text: string;
  className?: string;
  type: VariantProps<typeof buttonVariants>;
  icon?: ReactNode;
};

export default function LoadingActionButton(props: LoadingActionButtonProps) {
  const { disabled, loading, onClick, text, className, type, icon } = props;
  return (
    <Button
      variant={type.variant}
      size={type.size}
      disabled={disabled}
      className={cn("flex-1 [&_svg]:hover:scale-110", className)}
      onClick={() => onClick?.()}
    >
      {loading ? (
        <Loader2Icon className="animate-spin w-4 h-4 text-muted-foreground" />
      ) : (
        icon
      )}

      {text}
    </Button>
  );
}
