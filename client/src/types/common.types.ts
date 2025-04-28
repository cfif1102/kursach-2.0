export interface IPaginated<T extends object> {
  items: T[];
  nextPage?: number;
  prevPage?: number;
}

export interface IPagination {
  page: number;
  pageSize: number;
}
