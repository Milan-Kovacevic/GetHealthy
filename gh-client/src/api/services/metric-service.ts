import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import { MetricDTO } from "../contracts/metric-contract";
import { Metric } from "../models/metric";

const getAllExerciseMetrics = () => {
  const url = ApiEndpoints.Metrics;
  return sendAxiosRequest<void, MetricDTO[]>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data as Metric[];
  });
};

export { getAllExerciseMetrics };
