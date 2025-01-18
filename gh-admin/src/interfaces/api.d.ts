interface IBlogPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: {
    id: number;
  };
}

interface IPage<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: IPageable;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface IPageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}
