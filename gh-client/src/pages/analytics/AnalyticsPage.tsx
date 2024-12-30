import { RangedDatePicker } from "./components/RagedDatePicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSignIcon } from "lucide-react";
import TrainerProgramPopularity from "./components/TrainerProgramPopularity";
import TrainerProgramEngagement from "./components/TrainerProgramEngagement";

export default function AnalyticsPage() {
  return (
    <section className="overflow-hidden relative sm:px-5 px-4 sm:pt-6 pt-4 pb-10 h-full">
      <div className="container mx-auto h-full space-y-5 z-10 relative">
        <div className="h-full flex flex-col">
          <div className="flex justify-between md:flex-row flex-col gap-4 md:items-center">
            <div className="flex flex-col">
              <h2 className="text-3xl font-extrabold">Analytics</h2>
              <p className="text-foreground/80">
                Track your program participants engagement.
              </p>
            </div>
            <RangedDatePicker className="md:self-end md:w-[300px] max-w-md" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
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

          <div className="flex-1 mt-3">
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="flex md:flex-row flex-col h-auto md:w-fit">
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
              <TabsContent value="tab1" className="h-full">
                <TrainerProgramPopularity />
              </TabsContent>
              <TabsContent value="tab2" className="h-full">
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
