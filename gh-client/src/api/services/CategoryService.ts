import { GenericHttpClient } from "@/utils/http-client";

export type Category = {
  title: string;
  id: number;
};

export default class CategoryService {
  client = new GenericHttpClient();

  public async get(): Promise<Category[]> {
    return await this.client.get("categories");
  }
}
