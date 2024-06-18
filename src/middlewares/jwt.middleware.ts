import { NextFunction, Request, Response } from "express";
import jwtService from "../services/jwt.service";
import { JWTPayloadType } from "../types/jwt.types";

declare global {
  namespace Express {
    export interface Request {
      user: JWTPayloadType;
    }
  }
}

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      return res.status(400).json({
        error: "Invalid Access Token!",
      });
    }

    const payload = jwtService.verifyToken(accessToken);

    if (!payload.valid) {
      return res.status(400).json({
        error: "Invalid Access Token!",
      });
    }

    if (payload.data) {
      req.user = payload.data;
    }

    next();
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

export default verifyUser;
