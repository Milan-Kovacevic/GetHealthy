// Trainer Dashboard data contracts (Always displayed to trainer; does not depend on selected program, exercise or program participant i.e. trainee)
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

// Trainer Popularity data contracts (displayed based on selected date range and training program)
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

// Trainer Engagement data contracts (displayed based on selected date range, training program and optionally program participant i.e. trainee)
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

// Trainee Dashboard data contracts (Always displayed to trainee; does not depend on selected exercise or period)
export type TraineeDashboardAnalyticsDTO = {
  totalJoined: TotalJoinedProgramsDataDTO[];
  topInteractedPrograms: TopProgramsDataDTO[];
  topSkippedExercises: TopExercisesDataDTO[];
  topFavoriteExercises: TopExercisesDataDTO[];
};

export type TopExercisesDataDTO = {
  exercise: string;
  value: number;
};

export type TotalJoinedProgramsDataDTO = {
  interacted: number;
  nonInteracted: number;
};

// Trainee Progress data contracts (displayed based on selected date range and exercise)
export type TraineeProgressAnalyticsDTO = {
  data: TraineeProgressDataDTO[];
};

export type TraineeProgressDataDTO = {
  date: string;
  firstMetric: number;
  secondMetric?: number;
};

export type ProgressAnalyticsRequestDTO = {
  from: string;
  to: string;
  exerciseId: number;
};
