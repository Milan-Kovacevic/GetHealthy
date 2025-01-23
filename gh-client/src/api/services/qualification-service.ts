import { certificateUrl } from "@/lib/utils";
import { toast } from "sonner";
import { sendAxiosRequest } from "./base-service";
  
  const downloadTrainerCertificate = async (certificateName: string) => {
    if (!certificateName) {
      console.error("Certificate name is required!");
      toast.error("Certificate name is required.");
      return;
    }
  
    const url = certificateUrl(certificateName);
  
    try {
      const response = await sendAxiosRequest<void, Blob>({
        url: url,
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
  
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
  
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = certificateName;
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      toast.success("Certificate downloaded successfully.");
    } catch (error) {
      console.error("Error downloading certificate:", error);
      toast.error("Failed to download certificate. Please try again later.");
    }
  };

  export default downloadTrainerCertificate;
  