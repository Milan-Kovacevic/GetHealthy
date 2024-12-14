import { Category } from "./category";
import { ProgramExercise } from "./exercise";
import { ProgramDifficulty } from "./training-program";

export type SingleTrainingProgram = {
    id: number;
    name: string;
    imageFilePath: string; //?
    difficulty: ProgramDifficulty;
    averageRate: number;
    totalRates: number;
    description: string;
    trainerFirstName: string;
    trainerLastName: string;
    categories: Category[];
    currentlyEnrolled: number;
  };

  export type SingleProgramDetails = {
    requirements: string;
    estimatedWorkoutTime: number;
    exercises: ProgramExercise[];
  };
  
  export type SingleProgramTrainer = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth?: string;
    gender?: number;
    profilePictureFilePath?: string;
    contactInfo?: string;
    biography?: string;
  };
  
  export type ProgramParticipant = {};