export interface Expense {
  _id?: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  status?: string;
  userId?: {
    name: string;
    email: string;
  };
}

export interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}
