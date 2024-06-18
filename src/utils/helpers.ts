import { Query } from "mongoose";

export function applyPaginationAndSorting<T>(
  query: Query<T[], T>,
  paginationParams: PaginationParams,
  sortingParams: SortingParams
): Query<T[], T> {
  const { page = 1, limit = 10 } = paginationParams;
  const { sortBy = "_id", sortOrder = "asc" } = sortingParams;

  const skip = (page - 1) * limit;

  return query
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
}
