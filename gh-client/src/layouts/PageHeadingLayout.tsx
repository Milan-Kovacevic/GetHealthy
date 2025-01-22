import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CircleBackgroundBlob } from "@/pages/shared/BackgroundBlobs";
import { ReactNode } from "react";

type PageHeadingLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export default function PageHeadingLayout(props: PageHeadingLayoutProps) {
  const { title, description, children, actions, className } = props;

  return (
    <section className="overflow-hidden relative sm:px-5 px-4 md:pt-6 pt-4 sm:pb-10 pb-5">
      <BackgroundBlurs />
      <div className={cn("container mx-auto h-full z-10 relative", className)}>
        <PageHeading
          title={title}
          description={description}
          actions={actions}
        />
        <Separator className="my-4" />
        {children}
      </div>
    </section>
  );
}

const PageHeading = ({
  actions,
  title,
  description,
}: {
  actions?: ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex justify-between">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground sm:text-base text-sm">
          {description}
        </p>
      </div>
      {actions}
    </div>
  );
};

const BackgroundBlurs = () => {
  return (
    <>
      <CircleBackgroundBlob
        variant="lighter"
        className="left-auto -right-56 w-80 h-96 top-44"
      />
      <CircleBackgroundBlob
        variant="lightest"
        className="-left-72 w-1/4 h-96 top-44"
      />
      <CircleBackgroundBlob variant="lightest" />
      <CircleBackgroundBlob
        variant="lightest"
        className="-bottom-24 -right-16 w-1/3 h-96 left-auto"
      />
    </>
  );
};
