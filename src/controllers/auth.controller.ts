import { Request, Response } from "express";
import { loginSchemaInput } from "../schema/auth.schema";
import { findUserByEmailOrUsername } from "../services/user.service";
import jwtService from "../services/jwt.service";
import { JWTPayloadType } from "../types/jwt.types";

class AuthController {
  async login(req: Request<{}, {}, loginSchemaInput>, res: Response) {
    const { identifier, password } = req.body;

    try {
      const user = await findUserByEmailOrUsername(identifier);

      if (!user) {
        return res.status(400).json({ errors: "Invalid Credentials!" });
      }

      console.log(user);

      const doesPasswordMatch = await user.validatePassword(password);

      if (!doesPasswordMatch) {
        return res.status(400).json({ errors: "Invalid Credentials!" });
      }

      const payload: JWTPayloadType = {
        _id: user._id.toString(),
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      const accessToken = jwtService.generateToken(payload);

      return res.status(200).json({
        message: "Logged in successfully!",
        accessToken,
      });
    } catch (error: any) {
      return res.status(500).json({
        errors: error.message,
      });
    }
  }
}

export default new AuthController();
