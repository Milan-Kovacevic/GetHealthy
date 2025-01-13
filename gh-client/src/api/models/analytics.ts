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

// Trainer Engagement chart models
export type TrainerEngagementAnalytics = {
  data: AnalyticsEngagementData[];
};

export type AnalyticsEngagementData = {
  date: string;
  skipped: number;
  completed: number;
};
/***********************************/

// Trainer Popularity chart models
export type TrainerPopularityAnalytics = {
  ratings: AnalyticsPopularityData[];
  totalParticipants: AnalyticsPopularityData[];
};

export type AnalyticsPopularityData = {
  date: string;
  value: number;
};
/***********************************/

// Trainer Dashboard chart models
export type TrainerDashboardAnalytics = {
  topInteracted: TopProgramsDashboardData[];
  topJoined: TopProgramsDashboardData[];
  topVoted: TopProgramsDashboardData[];
  totalPrograms: TotalProgramsDashboardData[];
};

export type TopProgramsDashboardData = {
  program: string;
  value: number;
};

export type TotalProgramsDashboardData = {
  beginner: number;
  intermediate: number;
  advanced: number;
};
/***********************************/

// Trainee Popularity chart models
export type TraineeProgressAnalytics = {
  data: TraineeProgressData[];
};

export type TraineeProgressData = {
  date: string;
  firstMetric: number;
  secondMetric?: number;
};
/***********************************/

// Trainee Dashboard chart models
export type TraineeDashboardAnalytics = {
  totalJoined: TotalJoinedProgramsData[];
  topInteractedPrograms: TopProgramsDashboardData[];
  topSkippedExercises: TopExercisesDashboardData[];
  topFavoriteExercises: TopExercisesDashboardData[];
};

export type TopExercisesDashboardData = {
  exercise: string;
  value: number;
};

export type TotalJoinedProgramsData = {
  interacted: number;
  nonInteracted: number;
};
/***********************************/
