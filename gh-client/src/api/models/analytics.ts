import { TrainerProgram } from "./training-program";

export type AnalyticsProgram = TrainerProgram & {
  participants: AnalyticsProgramParticipant[];
  exercises: AnalyticsProgramExercise[];
};

export type AnalyticsProgramParticipant = {
  id: number;
  firstName: string;
  lastName: string;
  joinDate: string;
  gender?: string;
  dateOfBirth?: string;
};

export type AnalyticsProgramExercise = {
  id: number;
  name: string;
};

export type AnalyticsEngagementData = {
  date: string;
  skipped: number;
  completed: number;
};

export type EngagementChartState = {
  selectedParticipant?: AnalyticsProgramParticipant;
  selectedExercise?: AnalyticsProgramExercise;
  data: AnalyticsEngagementData[];
  loading: boolean;
  filter: EngagementChartFilter;
};

export type AnalyticsPopularityData = {
  date: string;
  value: number;
};

export type PopularityChartState = {
  data: AnalyticsPopularityData[];
  loading: boolean;
};

export type EngagementChartFilter = {
  display: "all" | "skipped" | "completed";
};
