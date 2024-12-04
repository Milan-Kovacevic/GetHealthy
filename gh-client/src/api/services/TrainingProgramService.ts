import { GenericHttpClient } from "@/utils/http-client";

export type TrainingProgram = {
  title: string;
  description: string;
  id: number;
  category: string;
  difficulty: string;
};

export default class TrainingProgramService {
  client = new GenericHttpClient();

  public async get(): Promise<TrainingProgram[]> {
    return this.client.get("training-programs");
  }
}
