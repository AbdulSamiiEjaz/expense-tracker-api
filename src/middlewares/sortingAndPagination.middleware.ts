import { Request, Response, NextFunction } from "express";

interface PaginationParams {
  page?: number;
  limit?: number;
}

interface SortingParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface RequestWithPaginationAndSorting extends Request {
  paginationParams?: PaginationParams;
  sortingParams?: SortingParams;
}

function extractPaginationAndSortingParams(
  req: RequestWithPaginationAndSorting,
  res: Response,
  next: NextFunction
) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sortBy = (req.query.sortBy as string) || "_id";
  const sortOrder = (req.query.sortOrder as string as "asc") || "desc" || "asc";

  req.paginationParams = { page, limit };
  req.sortingParams = { sortBy, sortOrder };

  next();
}

export { extractPaginationAndSortingParams, RequestWithPaginationAndSorting };
