import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { ReactNode } from "react";

type ChartDashboardCardFrameProps = {
  title: string;

  description: string;
  children: ReactNode;
};

export default function ChartDashboardCardFrame({
  children,
  description,
  title,
}: ChartDashboardCardFrameProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-1 flex-row items-center justify-between space-y-0 pb-0 pt-3.5">
        {children}
      </CardHeader>

      <CardFooter className="flex-col gap-1.5 text-center">
        <div className="flex items-center gap-2 font-medium leading-none">
          {title}
        </div>
        <div className="leading-tight text-xs text-muted-foreground">
          {description}
        </div>
      </CardFooter>
    </Card>
  );
}
