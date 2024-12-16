import environments from "@/environments/config";

export const LIGHT_THEME = "light";
export const DARK_THEME = "dark";
export const APP_THEME_STORAGE_KEY = "gethealthy_ui_theme";

export const TRAINEE_ACCOUNT_TYPE = "trainee";
export const TRAINER_ACCOUNT_TYPE = "trainer";
export type AccountType =
  | typeof TRAINEE_ACCOUNT_TYPE
  | typeof TRAINER_ACCOUNT_TYPE;
export const ACCOUNT_TYPES = [
  TRAINEE_ACCOUNT_TYPE,
  TRAINER_ACCOUNT_TYPE,
] as const;

export const ACCESS_TOKEN_STORAGE_KEY = "gethealthy_access_token";
export const REFRESH_TOKEN_STORAGE_KEY = "gethealthy_refresh_token";

const API_PREFIX = environments().apiResourcePrefix;
export const ApiEndpoints = {
  UserNotifications: `${API_PREFIX}/users/{userId}/notifications`,
  Categories: `${API_PREFIX}/categories`,
  TrainingPrograms: `${API_PREFIX}/training-programs`,
  SingleTrainingProgram: `${API_PREFIX}/training-programs/{programId}`,
  TrainerProgramApplications: `${API_PREFIX}/users/{userId}/applications`,
  UserAccounts: `${API_PREFIX}/accounts`,
  Users: `${API_PREFIX}/users`,
  TrainingProgramComments: `${API_PREFIX}/training-programs/{programId}/comments`,
  TrainingProgramRatings: `${API_PREFIX}/training-programs/{programId}/ratings`,
  TrainingProgramUserRating: `${API_PREFIX}/training-programs/{programId}/user-ratings/{userId}`,
  Metrics:`${API_PREFIX}/metrics`,
  Exercises: `${API_PREFIX}/exercises`
};
