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
