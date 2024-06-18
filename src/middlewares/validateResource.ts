import { Response, Request, NextFunction } from "express";
import { AnyZodObject } from "zod";
import log from "../utils/logger";

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      log.error(error);
      return res.status(400).json({
        errors: error.errors,
      });
    }
  };

export default validateResource;
