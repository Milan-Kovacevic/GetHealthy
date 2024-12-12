import { ProgramExercise } from "./exercise";

export type SingleProgramDetails = {
  requirements: string;
  trainingDuration: number;
  exercises: ProgramExercise[];
};
