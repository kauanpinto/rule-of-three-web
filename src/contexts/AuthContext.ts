import { createContext } from 'react';
import type { User } from '@/types/user';
import type { RegisterInput, LoginInput } from '@/schemas/auth';

type AuthContextType = {
  user: User | null;
  refreshUser: () => Promise<void>;
  isLoading: boolean;
  signUp: (data: RegisterInput) => Promise<void>;
  signIn: (data: LoginInput) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
