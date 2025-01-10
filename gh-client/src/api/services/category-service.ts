import { ApiEndpoints } from "@/utils/constants";
import { CategoryDTO } from "../contracts/category-contract";
import { sendAxiosRequest } from "./base-service";
import { Category } from "../models/category";
import { delay } from "@/lib/utils";

const getAllCategories = async () => {
  var url = ApiEndpoints.Categories;
  await delay(1000);
  return sendAxiosRequest<void, CategoryDTO[]>({
    method: "GET",
    url: url,
  }).then((response) => {
    // Perform neccessary mappings etc...
    return response.data as Category[];
  });
};

export { getAllCategories };
