import { Category } from "@/entities/Category";
import { GenericHttpClient } from "@/utils/http-client";

export default class CategoryService {
  client = new GenericHttpClient();

  public async get(): Promise<Category[]> {
    return await this.client.get("categories");
  }
}
