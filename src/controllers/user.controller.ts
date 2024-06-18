import { Request, Response } from "express";
import { createUserInput } from "../schema/user.schema";
import { createUser, getAllUsers } from "../services/user.service";
import { RequestWithPaginationAndSorting } from "../middlewares/sortingAndPagination.middleware";
import { applyPaginationAndSorting } from "../utils/helpers";

class UserController {
  async index(req: RequestWithPaginationAndSorting, res: Response) {
    try {
      const { paginationParams, sortingParams } = req;

      if (!paginationParams || !sortingParams) {
        return res
          .status(400)
          .send({ message: "Invalid pagination or sorting parameters" });
      }

      let query: any;
      query = getAllUsers();
      query = applyPaginationAndSorting(
        query,
        { ...paginationParams },
        { ...sortingParams }
      );

      console.log(paginationParams, sortingParams);

      const filteredUsers = await query.exec();

      res.json({
        users: filteredUsers,
      });
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
  async show(req: Request, res: Response) {
    return res.sendStatus(200);
  }
  async store(req: Request<{}, {}, createUserInput>, res: Response) {
    try {
      const user = await createUser(req.body);

      return res.status(201).json({
        message: "User created successfully!",
      });
    } catch (error: any) {
      if (error.code === 11000) {
        return res.status(409).json({
          error: "Account already exists!",
        });
      }

      return res.status(500).json({
        errors: error,
      });
    }
  }
  async delete(req: Request, res: Response) {
    return res.sendStatus(200);
  }
  async update(req: Request, res: Response) {
    return res.sendStatus(200);
  }
}

export default new UserController();
