import mongoose, { Model, Document } from 'mongoose';
import ExpenseSchema from './schema';
import { STATUS_ENUM } from './constants';

export interface ExpenseDocument extends Document{
  amount: number;
  category: string;
  description: string;
  date: string;
  userId: string;
  status: (typeof STATUS_ENUM)[number];
  createdAt?: Date;
  updatedAt?: Date;
}

const Expense: Model<ExpenseDocument> =
  mongoose.models.expense as Model<ExpenseDocument> ||
  mongoose.model<ExpenseDocument>('expense', ExpenseSchema);

export default Expense;
