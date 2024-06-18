import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import config from "config";
import {
  JWTPayload,
  JWTVerificationErrors,
  JWTPayloadType,
} from "../types/jwt.types";

class JWTService {
  generateToken(payload: JWTPayloadType): string {
    const token = jwt.sign(payload, config.get<string>("JWT_SECRET_KEY"), {
      expiresIn: "1h",
    });

    return token;
  }
  verifyToken(token: string): JWTPayload {
    try {
      const paylaod = jwt.verify(
        token,
        config.get<string>("JWT_SECRET_KEY")
      ) as JWTPayloadType;
      return { valid: true, data: paylaod };
    } catch (error) {
      if (
        error instanceof JsonWebTokenError ||
        error instanceof TokenExpiredError
      ) {
        return { valid: false, errorMessage: "Invalid Access Token!" };
      }
      return { valid: false, errorMessage: "Something went wrong!" };

      // throw error;
    }
  }
}

export default new JWTService();
