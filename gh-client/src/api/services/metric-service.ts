import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import { MetricDTO } from "../contracts/metric-contract";
import { Metric } from "../models/metric";
import { delay } from "@/lib/utils";

const getAllExerciseMetrics = async () => {
  const url = ApiEndpoints.Metrics;
  await delay(4000);
  return sendAxiosRequest<void, MetricDTO[]>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data as Metric[];
  });
};

export { getAllExerciseMetrics };
