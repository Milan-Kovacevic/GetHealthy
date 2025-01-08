import { capitalize } from "@/lib/utils";

export enum ProgramDifficulty {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export const difficultyOptions = Object.values(ProgramDifficulty).map(
  (difficulty) => ({
    label: capitalize(difficulty),
    // value: (index + 1).toString(),
    value: difficulty,
    name: difficulty,
  })
);
