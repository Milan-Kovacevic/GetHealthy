import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type AnalyticsDashboardCardProps = {
  title: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string | number;
  description?: string;
};

export default function AnalyticsDashboardCard({
  title,
  icon: Icon,
  value,
  description,
}: AnalyticsDashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export const DashboardCardLoader = () => {
  return <Skeleton className="h-[230px] w-full" />;
};
