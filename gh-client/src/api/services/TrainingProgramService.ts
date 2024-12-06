import { Category } from "@/entities/Category";
import { Page } from "@/entities/Page";
import { TrainingProgram } from "@/entities/TrainingProgram";
import { GenericHttpClient } from "@/utils/http-client";

export default class TrainingProgramService {
  client = new GenericHttpClient();

  public async get(): Promise<TrainingProgram[]> {
    return this.client.get("training-programs");
  }

  public async getPage(
    page: number = 0,
    categories: Category[] = [],
    difficulty: number = 0,
    ratingRange: number[] = [0.0, 5.0],
    participantsRange: number[] = [0, 1000],
    sortBy: string = "name",
    sortDir: string = "asc",
    limit: number = 12
  ): Promise<Page<TrainingProgram>> {
    return this.client.get(
      `training-programs/filter?page=${page}&size=${limit}&sortBy=${sortBy}&sortDir=${sortDir}&categories=${categories
        .map((c) => c.categoryName)
        .join(",")}&ratingUpper=${ratingRange[1]}&ratingLower=${
        ratingRange[0]
      }&participantsLower=${participantsRange[0]}&participantsUpper=${
        participantsRange[1]
      }&difficulty=${difficulty}`
    );
  }
}
