import { ProgramRequestDTO } from "@/api/models/program-request";
import { getPageableTrainingProgramApplications } from "@/api/services/program-application-service";
import { usePagination } from "@/hooks/use-pagination";
import { useState } from "react";

export function useProgramRequests() {
  const [pending, setPending] = useState(false);
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
  } = usePagination<ProgramRequestDTO>({
    fetchData: (state) => {
      return getPageableTrainingProgramApplications("", state.page);
    },
  });

  const onRequestApprove = async () => {};

  const onRequestReject = async () => {};

  return {
    requests,
    setRequests,
    hasMoreRequests,
    setHasMoreRequests,
    isLoadingRequests,
    setIsLoadingRequests,
    requestsPage,
    setRequestsPage,
    pending,
    setPending,
    onRequestPageChange,
    onRequestApprove,
    onRequestReject,
  };
}
