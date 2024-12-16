import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SingleProgramParticipant } from "@/api/models/program-details";
import { Input } from "@/components/ui/input";
import { usePagination } from "@/hooks/use-pagination";
import { getPageableTrainingProgramParticipants } from "@/api/services/program-details-service";
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

type ProgramParticipantsListProps = {
  programId: number;
};

export default function ProgramParticipantsList(
  props: ProgramParticipantsListProps
) {
  const { programId } = props;

  const {
    data: participants,
    setData: setParticipants,
    hasMore: hasMoreParticipants,
    setHasMore: setHasMoreParticipants,
    isLoading: isLoadingParticipants,
    setIsLoading: setIsLoadingParticipants,
    onPageChange: onParticipantPageChange,
    page: participantsPage,
    setPage: setParticipantsPage,
  } = usePagination<SingleProgramParticipant>({
    fetchData: (state) => {
      return getPageableTrainingProgramParticipants(programId, state.page);
    },
  });

  useEffect(() => {
    onParticipantPageChange();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedParticipant, setSelectedParticipant] =
    useState<SingleProgramParticipant | null>(null);

  const onRemoveProgramParticipant = (id: number) => {
    console.log("removed");
  };

  const onMoveProgramParticipant = (id: number) => {
    const participant = participants.find((x) => x.id == id) ?? null;
    setSelectedParticipant(participant);
  };
  const onCancelMoveParticipant = () => {
    setSelectedParticipant(null);
  };
  const handleMoveProgramParticipant = (newProgramId: string) => {
    setSelectedParticipant(null);
  };

  return (
    <div className="container mx-auto w-full">
      <div className="flex xl:flex-row flex-col-reverse justify-between w-full md:gap-8 gap-4 md:pb-4">
        {isLoadingParticipants && <ParticipantsListSkeletonLoader />}
        {!isLoadingParticipants && (
          <div className="p-1 w-full max-w-3xl xl:max-w-4xl">
            <div className="mb-4 max-w-xl">
              <div className="relative">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search participants"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-3">
              {participants.map((participant) => (
                <ProgramParticipantItem
                  participant={participant}
                  key={participant.id}
                  onRemove={onRemoveProgramParticipant}
                  onMove={onMoveProgramParticipant}
                />
              ))}
            </div>

            <Pagination className="mt-5">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    // onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={
                      participantsPage === 1
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
                {[...Array(participantsPage)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      // onClick={() => setCurrentPage(index + 1)}
                      isActive={participantsPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    // onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={
                      hasMoreParticipants
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

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
