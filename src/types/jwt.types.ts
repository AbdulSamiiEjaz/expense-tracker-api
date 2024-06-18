export interface JWTPayloadType {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface JWTPayload {
  valid?: boolean;
  errorMessage?: string;
  data?: JWTPayloadType;
}

export interface JWTVerificationErrors {
  valid: boolean;
  errors: string;
}
