import { Trainer } from "./Trainer";
import { TrainingProgramCategory } from "./TrainingProgramCategory";

export interface TrainingProgram
{
    createdAt:string,
    difficulty:number,
    name: string;
    description: string;
    rating:number,
    requirements:string,
    id: number;
    trainingDuration:number,
    user:Trainer
    categories:TrainingProgramCategory[]
}
