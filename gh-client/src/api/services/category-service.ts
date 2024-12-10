import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import { CategoryDTO } from "../contracts/category-contract";
import { Category } from "../models/category";

const getAllCategories = async () => {
  var url = ApiEndpoints.Categories;

  // return sendAxiosRequest<void, CategoryDTO[]>({
  //   method: "GET",
  //   url: url,
  // }).then((response) => {
  //   return response.data as Category[];
  // });

  // Mock response for now
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
};

export { getAllCategories };
