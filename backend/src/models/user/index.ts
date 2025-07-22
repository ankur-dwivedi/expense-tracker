import mongoose, { Model } from "mongoose";
import UserSchema from "./schema";
import { UserDocument } from "./types";

const User: Model<UserDocument> =
  (mongoose.models.user as Model<UserDocument>) ||
  mongoose.model<UserDocument>("user", UserSchema);

export default User;
