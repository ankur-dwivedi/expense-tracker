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
  meta: { total: number; page: number };
  analytics: Record<string, number>;
  loading: boolean;
  error: string | null;
  analyticsLoading: boolean;
  analyticsError: string | null;
}
