export type Page<T> = {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type Pageable = {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
};

export type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};
