// Dashboard data contracts (Always displayed to trainer; does not depend on selected program, exercise or program participant i.e. trainee)
export type TrainerDashboardAnalyticsDTO = {
  topInteracted: TopProgramsDataDTO[];
  topJoined: TopProgramsDataDTO[];
  topVoted: TopProgramsDataDTO[];
  totalPrograms: TotalProgramsDataDTO[];
};

export type TopProgramsDataDTO = {
  program: string;
  value: number;
};

export type TotalProgramsDataDTO = {
  beginner: number;
  intermediate: number;
  advanced: number;
};

// Popularity data contracts (displayed based on selected date range and training program)
export type TrainerPopularityAnalyticsDTO = {
  ratings: AnalyticsPopularityDataDTO[];
  totalParticipants: AnalyticsPopularityDataDTO[];
};

export type AnalyticsPopularityDataDTO = {
  date: string;
  value: number;
};

export type PopularityAnalyticsRequestDTO = {
  programId: number;
  from: string;
  to: string;
};

// Engagement data contracts (displayed based on selected date range, training program and optionally program participant i.e. trainee)
export type TrainerEngagementAnalyticsDTO = {
  data: AnalyticsEngagementDataDTO[];
};

export type AnalyticsEngagementDataDTO = {
  date: string;
  skipped: number;
  completed: number;
};

export type EngagementAnalyticsRequestDTO = {
  from: string;
  to: string;
  programId: number;
  exerciseId: number;
  traineeId?: number;
};
