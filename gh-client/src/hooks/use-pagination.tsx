import { Page } from "@/api/contracts/pageable-contract";
import { useEffect, useState } from "react";

type UsePaginationProps<TData> = {
  fetchData: (state: UsePaginationState<TData>) => Promise<Page<TData>>;
};
type UsePaginationState<TData> = {
  data: TData[];
  isLoading: boolean;
  page: number;
  totalPages: number;
};

export function usePagination<TData>(props: UsePaginationProps<TData>) {
  const { fetchData } = props;

  const [data, setData] = useState<TData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(false);

  useEffect(() => {
    onLoadMoreData();
  }, [page]);

  const onLoadMoreData = () => {
    setIsLoading(true);
    fetchData({ data, isLoading, totalPages, page })
      .then((response) => {
        setData(response.content);
        setTotalPages(response.totalPages);
        setFirst(response.first);
        setLast(response.last);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    data,
    isLoading,
    setIsLoading,
    first,
    last,
    page,
    totalPages,
    setPage,
    onLoadMoreData,
  };
}
