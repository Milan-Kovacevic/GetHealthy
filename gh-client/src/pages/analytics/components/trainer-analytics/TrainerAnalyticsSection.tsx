import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsPeriodSelector from "../shared/AnalyticsPeriodSelector";
import TrainerProgramPopularity from "./TrainerProgramPopularity";
import TrainerProgramEngagement from "./TrainerProgramEngagement";
import TrainerDashboardCards from "./TrainerDashboardCards";

export default function TrainerAnalyticsSection() {
  return (
    <div className="flex flex-col flex-1">
      <TrainerDashboardCards />

      <div className="flex-1 mt-8">
        <Tabs defaultValue="tab1" className="w-full">
          <div className="flex lg:flex-row flex-col-reverse gap-x-4 gap-y-3 justify-between w-full">
            <TabsList className="flex md:flex-row flex-col gap-y-1 h-auto md:w-fit">
              <TabsTrigger value="tab1" className="px-8 w-full">
                Popularity
              </TabsTrigger>
              <TabsTrigger value="tab2" className="px-8 w-full">
                Engagement
              </TabsTrigger>
              <TabsTrigger value="tab3" className="px-8 w-full">
                Trainee progress
              </TabsTrigger>
            </TabsList>
            <AnalyticsPeriodSelector />
          </div>

          <TabsContent value="tab1" className="h-full py-3">
            <TrainerProgramPopularity />
          </TabsContent>
          <TabsContent value="tab2" className="h-full py-3">
            <TrainerProgramEngagement />
          </TabsContent>
          <TabsContent value="tab3" className="h-full">
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
