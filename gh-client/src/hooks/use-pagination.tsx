import { Page } from "@/api/contracts/pageable-contract";
import { useState } from "react";

type UsePaginationProps<TData> = {
  fetchData: (state: UsePaginationState<TData>) => Promise<Page<TData>>;
};
type UsePaginationState<TData> = {
  data: TData[];
  isLoading: boolean;
  page: number;
  hasMore: boolean;
};

export function usePagination<TData>(props: UsePaginationProps<TData>) {
  const { fetchData } = props;

  const [data, setData] = useState<TData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const onPageChange = async () => {
    if (!hasMore) return;
    setIsLoading(true);

    fetchData({
      data,
      isLoading,
      hasMore,
      page,
    })
      .then((response) => {
        setData((prev) => [...prev, ...response.content]);
        setPage((prev) => prev + 1);

        if (data.length > 10 || response.content.length == 0) {
          setHasMore(false);
        }
      })
      .catch(() => {
        setHasMore(false);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    hasMore,
    setHasMore,
    page,
    setPage,
    onPageChange,
  };
}
