import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSignIcon } from "lucide-react";
import TrainerProgramPopularity from "./components/TrainerProgramPopularity";
import TrainerProgramEngagement from "./components/TrainerProgramEngagement";
import AnalyticsPeriodSelector from "./components/AnalyticsPeriodSelector";

export default function AnalyticsPage() {
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

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total active programs
                </CardTitle>
                <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Averge program rate
                </CardTitle>
                <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
          </div>

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
      </div>
    </section>
  );
}
