import { ApiEndpoints } from "@/utils/constants";
import { CategoryDTO } from "../contracts/category-contract";
import { sendAxiosRequest } from "./base-service";
import { Category } from "../models/category";

const getAllCategories = async () => {
  var url = ApiEndpoints.Categories;

  return sendAxiosRequest<void, CategoryDTO[]>({
    method: "GET",
    url: url,
  }).then((response) => {
    // Perform neccessary mappings etc...
    return response.data as Category[];
  });
};

export { getAllCategories };


  /*// Mock response for now
  return Promise.resolve<Category[]>([
    {
      id: 1,
      categoryName: "HIIT",
    },
    {
      id: 2,
      categoryName: "Cardio",
    },
    {
      id: 3,
      categoryName: "Strength",
    },
  ]);
};*/
