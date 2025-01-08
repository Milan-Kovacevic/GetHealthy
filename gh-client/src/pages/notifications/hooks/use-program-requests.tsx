import { ProgramRequest } from "@/api/models/program-request";
import { getPageableTrainingProgramApplications } from "@/api/services/program-application-service";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useState } from "react";

export function useProgramRequests() {
  const userId = 2;
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
      return getPageableTrainingProgramApplications(userId, "", state.page);
    },
  });

  // TODO
  const onRequestApprove = async (programId: number, traineeId: number) => {};

  const onRequestReject = async (programId: number, traineeId: number) => {};

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
