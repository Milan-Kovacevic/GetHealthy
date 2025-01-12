import useAuth from "@/hooks/use-auth";
import AnalyticsPageLayout from "./AnalyticsPageLayout";

export default function AnalyticsPage() {
  const auth = useAuth();
  const isTrainer = auth.isTrainer();

  return <AnalyticsPageLayout isTrainer={isTrainer} />;
}
