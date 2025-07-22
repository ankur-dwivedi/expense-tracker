import mongoose, { Model } from 'mongoose';
import ExpenseSchema from './schema';
import { ExpenseDocument } from './types';

const Expense: Model<ExpenseDocument> =
  mongoose.models.expense as Model<ExpenseDocument> ||
  mongoose.model<ExpenseDocument>('expense', ExpenseSchema);

export default Expense;
