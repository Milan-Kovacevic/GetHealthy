import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import { Category } from "../contracts/category-contract";

const getAllCategories = () => {
  var url = ApiEndpoints.Categories;

  // return sendAxiosRequest<void, Category[]>({
  //   method: "GET",
  //   url: url,
  // }).then((response) => {
  //   return response.data as CategoryDTO[];
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
