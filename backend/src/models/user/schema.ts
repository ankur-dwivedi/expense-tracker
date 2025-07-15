import { Schema } from 'mongoose';
import { ROLE_ENUM, ROLE } from './constants';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
      required: true
    },
    name: { type: String, required: true },
    role: { type: String, enum: ROLE_ENUM, default: ROLE.EMPLOYEE, required: true },
    password: { type: String },
  },
  { timestamps: true }
);

export default UserSchema;
