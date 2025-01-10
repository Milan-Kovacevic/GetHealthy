import {
  ProcessProgramApplication,
  ProgramRequest,
  ProgramRequestDetails,
} from "@/api/models/program-request";
import {
  getPageableTrainingProgramApplications,
  getProgramApplicationDetails,
  processTrainingProgramApplication,
} from "@/api/services/program-application-service";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useState } from "react";
import { toast } from "sonner";

export function useProgramRequests() {
  const userId = 2;
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<ProgramRequestDetails>();

  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: requests,
    setData: setRequests,
    hasMore: hasMoreRequests,
    setHasMore: setHasMoreRequests,
    isLoading: isLoadingRequests,
    setIsLoading: setIsLoadingRequests,
    onPageChange: onRequestPageChange,
    page: requestsPage,
    setPage: setRequestsPage,
  } = useInfiniteScroll<ProgramRequest>({
    fetchData: (state) => {
      return getPageableTrainingProgramApplications(
        userId,
        searchQuery,
        state.page
      );
    },
  });

  const onCloseRequestDetails = () => {
    setSelectedRequest(undefined);
  };

  const onLoadRequestDetails = (programId: number, traineeId: number) => {
    setLoadingDetails(true);
    getProgramApplicationDetails(programId, traineeId)
      .then((request) => {
        setSelectedRequest(request);
      })
      .catch(() => {
        toast.error("Unexpected error", {
          description: "Unable to load program request details",
        });
      })
      .finally(() => setLoadingDetails(false));
  };

  const onRequestApprove = async (programId: number, traineeId: number) => {
    var payload = createProcessingPayload(programId, traineeId, true);
    setLoadingDetails(true);
    processTrainingProgramApplication(payload)
      .then(() => {
        setRequests((prev) => [
          ...prev.filter(
            (r) => r.programId != programId || r.traineeId != traineeId
          ),
        ]);
        setSelectedRequest(undefined);
      })
      .catch(() => {
        toast.error("Unexpected error", {
          description: "Unable to process selected program request",
        });
      })
      .finally(() => setLoadingDetails(false));
  };

  const onRequestReject = async (programId: number, traineeId: number) => {
    var payload = createProcessingPayload(programId, traineeId, false);
    setLoadingDetails(true);
    processTrainingProgramApplication(payload)
      .then(() => {
        setRequests((prev) => [
          ...prev.filter(
            (r) => r.programId != programId || r.traineeId != traineeId
          ),
        ]);
        setSelectedRequest(undefined);
      })
      .catch(() => {
        toast.error("Unexpected error", {
          description: "Unable to process selected program request",
        });
      })
      .finally(() => setLoadingDetails(false));
  };

  // Private method...
  const createProcessingPayload = (
    programId: number,
    traineeId: number,
    approve: boolean
  ) => {
    const payload: ProcessProgramApplication = {
      programId: programId,
      userId: traineeId,
      approve: approve,
    };
    return payload;
  };

  return {
    requests,
    setRequests,
    hasMoreRequests,
    setHasMoreRequests,
    isLoadingRequests,
    setIsLoadingRequests,
    requestsPage,
    setRequestsPage,
    onRequestPageChange,
    onRequestApprove,
    onRequestReject,
    selectedRequest,
    onLoadRequestDetails,
    onCloseRequestDetails,
    loadingDetails,
  };
}
