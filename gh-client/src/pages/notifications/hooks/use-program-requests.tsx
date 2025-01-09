import {
  ProcessProgramApplication,
  ProgramRequest,
} from "@/api/models/program-request";
import {
  getPageableTrainingProgramApplications,
  processTrainingProgramApplication,
} from "@/api/services/program-application-service";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useState } from "react";
import { toast } from "sonner";

export function useProgramRequests() {
  const userId = 2;
  const [pending, setPending] = useState(false);

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

  const onSearchRequests = async () => {
    if (searchQuery == "") {
      onRequestPageChange();
      return;
    }

    setIsLoadingRequests(true);
    setRequestsPage(0);
    getPageableTrainingProgramApplications(userId, searchQuery, 0)
      .then((response) => {
        if (response.pageable.pageNumber > 0)
          setRequests((prev) => [...prev, ...response.content]);
        else setRequests([...response.content]);
        setRequestsPage((prev) => prev + 1);

        if (response.last) {
          setHasMoreRequests(false);
        }
      })
      .catch(() => {
        setHasMoreRequests(false);
      })
      .finally(() => setIsLoadingRequests(false));
  };

  const onRequestApprove = async (programId: number, traineeId: number) => {
    var payload = createProcessingPayload(programId, traineeId, true);
    setPending(true);
    processTrainingProgramApplication(payload)
      .then(() => {
        setRequests((prev) => [
          ...prev.filter(
            (r) => r.programId == programId && r.traineeId == traineeId
          ),
        ]);
      })
      .catch(() => {
        toast.error("Unexpected error", {
          description: "Unable to process selected program request",
        });
      })
      .finally(() => setPending(false));
  };

  const onRequestReject = async (programId: number, traineeId: number) => {
    var payload = createProcessingPayload(programId, traineeId, false);
    setPending(true);
    processTrainingProgramApplication(payload)
      .then(() => {
        setRequests((prev) => [
          ...prev.filter(
            (r) => r.programId == programId && r.traineeId == traineeId
          ),
        ]);
      })
      .catch(() => {
        toast.error("Unexpected error", {
          description: "Unable to process selected program request",
        });
      })
      .finally(() => setPending(false));
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
    pending,
    setPending,
    searchQuery,
    setSearchQuery,
    onRequestPageChange,
    onRequestApprove,
    onRequestReject,
    onSearchRequests,
  };
}
