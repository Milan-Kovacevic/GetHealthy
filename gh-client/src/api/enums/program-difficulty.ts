export enum ProgramDifficulty {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export const difficultyOptions = Object.values(ProgramDifficulty).map(
  (difficulty) => ({
    label: difficulty.charAt(0) + difficulty.slice(1).toLowerCase(),
    // value: (index + 1).toString(),
    value: difficulty,
    name: difficulty,
  })
);
