import { Page } from "@/api/contracts/pageable-contract";
import { useState } from "react";

type UseInfiniteScrollProps<TData> = {
  fetchData: (state: UseInfiniteScrollState<TData>) => Promise<Page<TData>>;
};
type UseInfiniteScrollState<TData> = {
  data: TData[];
  isLoading: boolean;
  page: number;
  hasMore: boolean;
};

export function useInfiniteScroll<TData>(props: UseInfiniteScrollProps<TData>) {
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

        if (response.last) {
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
