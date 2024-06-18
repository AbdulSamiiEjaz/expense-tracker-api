import express from "express";
import UserController from "../controllers/user.controller";
import validateResource from "../middlewares/validateResource";
import { createUserSchema } from "../schema/user.schema";
import { extractPaginationAndSortingParams } from "../middlewares/sortingAndPagination.middleware";

const userRouter = express.Router();

userRouter.get(
  "/api/users",
  extractPaginationAndSortingParams,
  UserController.index
);
userRouter.post(
  "/api/users",
  validateResource(createUserSchema),
  UserController.store
);
userRouter.put("/api/users", UserController.update);
userRouter.get("/api/users/:id", UserController.show);
userRouter.delete("/api/users", UserController.delete);

export default userRouter;
