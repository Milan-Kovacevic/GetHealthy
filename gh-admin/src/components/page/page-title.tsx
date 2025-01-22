import { cn } from "@/lib/utils";

interface PageTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const PageTitle = ({ title, className, ...rest }: PageTitleProps) => {
  return (
    <div className={className} {...rest}>
      <h2 className={cn("text-3xl font-bold tracking-tight")}>{title}</h2>
    </div>
  );
};
