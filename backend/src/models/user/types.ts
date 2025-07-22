import { Document } from "mongoose";
import { ROLE_ENUM } from "./constants";
import { Request } from "express";

export interface UserDocument extends Document {
  _id: string;
  email: string;
  name: string;
  role: (typeof ROLE_ENUM)[number];
  password?: string;
}

export interface AuthedRequest extends Request {
  user?: UserDocument;
}