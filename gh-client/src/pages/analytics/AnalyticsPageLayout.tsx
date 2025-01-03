import TraineeAnalyticsSection from "./components/trainee-analytics/TraineeAnalyticsSection";
import TrainerAnalyticsSection from "./components/trainer-analytics/TrainerAnalyticsSection";

type AnalyticsPageLayoutProps = {
  isTrainer: boolean;
};

export default function AnalyticsPageLayout(props: AnalyticsPageLayoutProps) {
  const { isTrainer } = props;
  return (
    <section className="overflow-hidden relative sm:px-5 px-4 sm:pt-6 pt-4 pb-10 h-full">
      <div className="container mx-auto h-full space-y-5 z-10 relative">
        <div className="h-full flex flex-col">
          <div className="flex justify-between md:flex-row flex-col gap-4 md:items-center">
            <div className="flex flex-col">
              <h2 className="md:text-3xl text-2xl font-extrabold">Analytics</h2>
              <p className="text-foreground/80 md:text-base text-sm">
                Track your program participants engagement.
              </p>
            </div>
          </div>
          {isTrainer ? (
            <TrainerAnalyticsSection />
          ) : (
            <TraineeAnalyticsSection />
          )}
        </div>
      </div>
    </section>
  );
}
