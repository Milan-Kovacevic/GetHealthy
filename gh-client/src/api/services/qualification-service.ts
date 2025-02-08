import { API_BASE_PATH, ApiEndpoints } from "@/utils/constants";

const downloadTrainerCertificate = async (certificateName: string) => {
  if (!certificateName) {
    throw new Error("Certificate name is required!");
  }

  const url = `${API_BASE_PATH}${ApiEndpoints.DocumentsStorage}/${certificateName}`;
  const response = await fetch(url);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export default downloadTrainerCertificate;
