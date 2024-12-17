import { ProgramRequest } from "@/api/models/program-request";
import { getPageableTrainingProgramApplications } from "@/api/services/program-application-service";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
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
  } = useInfiniteScroll<ProgramRequest>({
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
