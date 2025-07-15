import { Schema } from "mongoose";
import { CATEGORY_ENUM, STATUS, STATUS_ENUM } from "./constants";

const ExpenseSchema = new Schema(
  {
    amount: { type: Number, required: true, unique: false },
    category: {
      type: String,
      enum: CATEGORY_ENUM,
      required: true,
      unique: false,
    },
    description: { type: String, required: true, unique: false },
    date: { type: Date, required: true, unique: false },
    status: {
      type: String,
      enum: STATUS_ENUM,
      default: STATUS.PENDING,
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

// ExpenseSchema.index({ emailAddress: 1, jobId: 1 }, { unique: true });

export default ExpenseSchema;
