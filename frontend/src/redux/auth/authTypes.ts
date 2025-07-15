export interface User {
    _id: string;
    email: string;
    name?: string;
    role: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface LoginPayload {
    email: string;
    password: string;
  }
  