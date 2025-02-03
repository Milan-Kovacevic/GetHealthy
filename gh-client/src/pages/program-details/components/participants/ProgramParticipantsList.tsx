import { useEffect, useState } from "react";
import { SingleProgramParticipant } from "@/api/models/program-details";
import { usePagination } from "@/hooks/use-pagination";
import {
  getPageableTrainingProgramParticipants,
  moveParticipantToAnotherTrainingProgram,
  removeParticipantFromTrainingProgram,
} from "@/api/services/program-details-service";
import ProgramParticipantItem from "./ProgramParticipantItem";
import MoveParticipantDialog from "./MoveParticipantDialog";
import ParticipantsListSkeletonLoader from "./ParticipantsListSkeletonLoader";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SearchBar } from "@/components/primitives/SearchBar";
import { toast } from "sonner";
import useAuth from "@/hooks/use-auth";
import NoListItemsAnimation from "@/pages/shared/NoListItemsAnimation";

type ProgramParticipantsListProps = {
  programId: number;
};

export default function ProgramParticipantsList(
  props: ProgramParticipantsListProps
) {
  const { getUserId } = useAuth();
  const userId = getUserId();

  const { programId } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParticipant, setSelectedParticipant] =
    useState<SingleProgramParticipant | null>(null);
  const {
    data: participants,
    isLoading: isLoadingParticipants,
    setIsLoading: setIsLoadingParticipants,
    page: participantsPage,
    setPage: setParticipantsPage,
    first: isFirstPage,
    last: isLastPage,
    totalPages: totalParticipantPages,
    onLoadMoreData,
  } = usePagination<SingleProgramParticipant>({
    fetchData: (state) => {
      return getPageableTrainingProgramParticipants(
        programId,
        state.page,
        searchQuery
      );
    },
  });

  const handleSearchParticipants = () => {
    onLoadMoreData();
  };

  const handleRemoveProgramParticipant = (traineeId: number) => {
    setIsLoadingParticipants(true);
    removeParticipantFromTrainingProgram(programId, traineeId)
      .then(() => {
        onLoadMoreData();
      })
      .catch(() => {
        setIsLoadingParticipants(false);
        toast.error("Unexpected error", {
          description: "Unable to remove participant from selected program",
        });
      });
  };

  const handleMoveProgramParticipant = (newProgramId: number) => {
    if (!selectedParticipant) return;
    setIsLoadingParticipants(true);
    moveParticipantToAnotherTrainingProgram({
      newProgramId: newProgramId,
      programId: programId,
      traineeId: selectedParticipant?.id,
      trainerId: userId,
    })
      .then(() => {
        setSelectedParticipant(null);
        onLoadMoreData();
      })
      .catch(() => {
        setIsLoadingParticipants(false);
        toast.error("Unexpected error", {
          description: "Unable to move participant to selected program",
        });
      });
  };

  const onMoveProgramParticipantClicked = (id: number) => {
    const participant = participants.find((x) => x.id == id) ?? null;
    setSelectedParticipant(participant);
  };

  const onCancelMoveParticipant = () => {
    setSelectedParticipant(null);
  };

  return (
    <div className="container mx-auto w-full">
      <div className="flex xl:flex-row flex-col-reverse justify-between w-full md:gap-8 gap-4 md:pb-4">
        <div className="p-1 w-full">
          <div className="mb-4 max-w-xl">
            <SearchBar
              setQuery={setSearchQuery}
              onSearch={handleSearchParticipants}
              query={searchQuery}
              className="max-w-none"
              disabled={isLoadingParticipants}
            />
          </div>
          <div className="max-w-3xl xl:max-w-4xl">
            {!isLoadingParticipants ? (
              <div className="space-y-3">
                {participants.map((participant) => (
                  <ProgramParticipantItem
                    participant={participant}
                    key={participant.id}
                    onRemove={handleRemoveProgramParticipant}
                    onMove={onMoveProgramParticipantClicked}
                  />
                ))}
              </div>
            ) : (
              <ParticipantsListSkeletonLoader />
            )}

            {!isLoadingParticipants && participants.length > 0 && (
              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() =>
                        setParticipantsPage((prev) => Math.max(prev - 1, 0))
                      }
                      className={
                        isFirstPage ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>
                  {[...Array(totalParticipantPages)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href="#"
                        onClick={() => setParticipantsPage(index)}
                        isActive={participantsPage === index}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() =>
                        setParticipantsPage((prev) =>
                          Math.min(prev + 1, totalParticipantPages)
                        )
                      }
                      className={
                        isLastPage ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>

          {!isLoadingParticipants && participants.length == 0 && (
            <NoListItemsAnimation
              title="There are no participants to show"
              description="Parhaps you should adjust the search criteria..."
              className="self-start"
            />
          )}
        </div>

        {selectedParticipant && (
          <MoveParticipantDialog
            onCancel={onCancelMoveParticipant}
            onSubmit={handleMoveProgramParticipant}
            participant={selectedParticipant}
          />
        )}
      </div>
    </div>
  );
}
