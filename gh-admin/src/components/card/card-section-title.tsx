import { CircleIcon } from "lucide-react";

interface CardSectionTitleProps {
  title: string;
}

export const CardSectionTitle = (props: CardSectionTitleProps) => {
  const { title } = props;
  return (
    <p className="text-lg font-semibold text-foreground/90 flex flex-row items-center gap-2 tracking-tight">
      <CircleIcon className="h-2 w-2" />
      {title}
    </p>
  );
};
