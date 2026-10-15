import { AuthContext } from './AuthContext';
import { useState, useEffect } from 'react';
import { authService } from '@/services/auth';
import type { User } from '@/types/user';
import type { RegisterInput, LoginInput } from '@/schemas/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  async function refreshUser() {
    const currentUser = await authService.getCurrentUser();

    setUser(currentUser);
  }

  async function signUp(data: RegisterInput) {
    const newUser = await authService.register(data);
    await authService.login({ email: data.email, password: data.password });

    setUser(newUser);
  }

  async function signIn(data: LoginInput) {
    await authService.login(data);
    const currentUser = await authService.getCurrentUser();

    setUser(currentUser);
  }

  async function signOut() {
    await authService.logout();

    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, refreshUser, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
