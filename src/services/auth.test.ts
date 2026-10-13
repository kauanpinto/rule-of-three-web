import { beforeEach, describe, expect, it, vi } from 'vitest';
import { api } from '@/lib/api';
import { authService } from './auth';

vi.mock('@/lib/api', () => ({
  api: { post: vi.fn(), get: vi.fn() },
}));

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('cadastra sem enviar confirmPassword e devolve o usuário', async () => {
    const user = { id: '1', name: 'Test', email: 'test@test.com' };
    vi.mocked(api.post).mockResolvedValueOnce({ data: user });

    const result = await authService.register({
      name: 'Test',
      email: 'test@test.com',
      password: 'Test@123',
      confirmPassword: 'Test@123',
      income: 2500,
    });

    expect(api.post).toHaveBeenCalledWith('/auth/register', {
      name: 'Test',
      email: 'test@test.com',
      password: 'Test@123',
      income: 2500,
    });
    expect(result).toEqual(user);
  });

  it('devolve o usuário autenticado, sem o envelope do axios', async () => {
    const user = { id: '1', name: 'Test', email: 'test@test.com' };
    vi.mocked(api.get).mockResolvedValueOnce({ data: user });

    await expect(authService.getCurrentUser()).resolves.toEqual(user);
  });
});
