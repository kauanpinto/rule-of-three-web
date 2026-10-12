import { api } from '@/lib/api';
import type { RegisterInput, LoginInput } from '@/schemas/auth';
import type { User } from '@/types/user';

async function register(data: RegisterInput): Promise<User> {
  const { confirmPassword, ...payload } = data;
  const response = await api.post<User>('/auth/register', payload);

  return response.data;
}

async function login(data: LoginInput): Promise<void> {
  await api.post('/auth/login', data);
}

async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>('/auth/me');

  return response.data;
}

export const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};
