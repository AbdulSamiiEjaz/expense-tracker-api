interface PaginationParams {
  page?: number;
  limit?: number;
}

interface SortingParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
