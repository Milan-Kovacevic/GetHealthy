import environments from "@/environments/config";
import { UserRole } from "@/api/enums/user-role";

export const LIGHT_THEME = "light";
export const DARK_THEME = "dark";

export const APP_THEME_STORAGE_KEY = "gethealthy_ui_theme";
export const AUTH_USER_STORAGE_KEY = "gethealthy_auth_user";
export const ACCESS_TOKEN_STORAGE_KEY = "gethealthy_access_token";
export const REFRESH_TOKEN_STORAGE_KEY = "gethealthy_refresh_token";

export const TRAINEE_ACCOUNT_TYPE = "trainee";
export const TRAINER_ACCOUNT_TYPE = "trainer";

export const TRAINER_ONLY_ROLE = UserRole.TRAINER;
export const TRAINEE_ONLY_ROLE = UserRole.TRAINEE;
export const BOTH_USER_ROLES = [UserRole.TRAINEE, UserRole.TRAINER];

export type AccountType =
  | typeof TRAINEE_ACCOUNT_TYPE
  | typeof TRAINER_ACCOUNT_TYPE;
export const ACCOUNT_TYPES = [
  TRAINEE_ACCOUNT_TYPE,
  TRAINER_ACCOUNT_TYPE,
] as const;

export const WS_BASE_PATH = environments().baseApiPath + "/ws";
export const API_BASE_PATH = environments().baseApiPath;
export const API_PREFIX = environments().apiResourcePrefix;
export const ApiEndpoints = {
  Authentication: `${API_PREFIX}/auth`,
  UserNotifications: `${API_PREFIX}/users/{userId}/notifications`,
  Categories: `${API_PREFIX}/categories`,
  TrainingPrograms: `${API_PREFIX}/training-programs`,
  UserTrainingPrograms: `${API_PREFIX}/users/{userId}/training-programs`,
  SingleUserTrainingPrograms: `${API_PREFIX}/users/{userId}/training-programs/{programId}`,
  SingleTrainingProgram: `${API_PREFIX}/training-programs/{programId}`,
  SingleTrainingProgramParticipants: `${API_PREFIX}/training-programs/{programId}/participants`,
  UserProgramApplications: `${API_PREFIX}/users/{userId}/applications`,
  SingleTrainingProgramApplication: `${API_PREFIX}/users/{userId}/applications/{programId}`,
  UserAccounts: `${API_PREFIX}/accounts`,
  Users: `${API_PREFIX}/users`,
  TrainingProgramComments: `${API_PREFIX}/training-programs/{programId}/comments`,
  TrainingProgramRatings: `${API_PREFIX}/training-programs/{programId}/ratings`,
  TrainingProgramUserRating: `${API_PREFIX}/training-programs/{programId}/user-ratings/{userId}`,
  TrainingProgramExercises: `${API_PREFIX}/training-programs/{programId}/exercises`,
  TrainingProgramOnSchedule: `${API_PREFIX}/schedules`,
  Metrics: `${API_PREFIX}/metrics`,
  Exercises: `${API_PREFIX}/exercises`,
  TraineeExercising: `${API_PREFIX}/workouts`,
  TrainerAnalytics: `${API_PREFIX}/users/{userId}/trainer-analytics`,
  TraineeAnalytics: `${API_PREFIX}/users/{userId}/trainee-analytics`,
  DocumentsStorage: `${API_PREFIX}/storage/documents`,
};
