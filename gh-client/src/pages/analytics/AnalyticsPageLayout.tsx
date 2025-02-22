import TraineeAnalyticsPage from "./components/trainee-analytics/TraineeAnalyticsPage";
import TrainerAnalyticsProvider from "./components/trainer-analytics/TrainerAnalyticsProvider";
import TrainerAnalyticsPage from "./components/trainer-analytics/TrainerAnalyticsPage";

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
              <p className="text-muted-foreground sm:text-base text-sm">
                {isTrainer
                  ? "Track your program popularity and participants interaction."
                  : "Track your exercise progress and gain some insights about your workouts."}
              </p>
            </div>
          </div>
          {isTrainer ? (
            <TrainerAnalyticsProvider>
              <TrainerAnalyticsPage />
            </TrainerAnalyticsProvider>
          ) : (
            <TraineeAnalyticsPage />
          )}
        </div>
      </div>
    </section>
  );
}
