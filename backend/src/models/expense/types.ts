import { Document } from "mongoose";
import { STATUS_ENUM } from "./constants";

export interface ExpenseDocument extends Document {
  amount: number;
  category: string;
  description: string;
  date: string;
  userId: string;
  status: (typeof STATUS_ENUM)[number];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateData {
  status: (typeof STATUS_ENUM)[number];
  expenseId: string;
}
