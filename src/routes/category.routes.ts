import express from "express";
import CategoryController from "../controllers/category.controller";
import validateResource from "../middlewares/validateResource";
import { categorySchema } from "../schema/category.schema";
import { extractPaginationAndSortingParams } from "../middlewares/sortingAndPagination.middleware";
import verifyUser from "../middlewares/jwt.middleware";

const categoryRouter = express.Router();

categoryRouter.get(
  "/api/categories",
  extractPaginationAndSortingParams,
  verifyUser,
  CategoryController.index
);
categoryRouter.post(
  "/api/categories",
  verifyUser,
  validateResource(categorySchema),
  CategoryController.store
);
categoryRouter.put("/api/categories", verifyUser, CategoryController.update);
categoryRouter.get("/api/categories/:id", verifyUser, CategoryController.show);
categoryRouter.delete("/api/categories", verifyUser, CategoryController.delete);

export default categoryRouter;
