import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { AuthProvider } from './AuthProvider';
import userEvent from '@testing-library/user-event';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth';
import type { User } from '@/types/user';

vi.mock('@/services/auth', () => ({
  authService: {
    register: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
    getCurrentUser: vi.fn(),
  },
}));

const mockUser: User = {
  id: '1',
  name: 'Test',
  email: 'test@test.com',
  income: '3000',
  createdAt: '',
  updatedAt: '',
};

function TestComponent() {
  const { user, isLoading, signIn, signOut } = useAuth();
  const email = 'test@test.com';
  const password = 'Test@123';

  return (
    <div>
      <button onClick={() => signIn({ email, password })}>Entrar</button>
      <button onClick={() => signOut()}>Sair</button>
      <span>{user ? user.name : 'Usuário não encontrado'}</span>
      <span>{isLoading ? 'carregando' : 'carregado'}</span>
    </div>
  );
}

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(authService.getCurrentUser).mockRejectedValue(new Error('Não autenticado'));
  });

  it('deve retornar user null e isLoading false', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(await screen.findByText('carregado')).toBeInTheDocument();
    expect(screen.getByText('Usuário não encontrado')).toBeInTheDocument();
  });

  it('deve carregar o usuário quando tiver sessão', async () => {
    vi.mocked(authService.getCurrentUser).mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(await screen.findByText('carregado')).toBeInTheDocument();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
  });

  it('deve fazer login e carregar o usuário', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await screen.findByText('carregado');

    vi.mocked(authService.getCurrentUser).mockResolvedValue(mockUser);

    await user.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(await screen.findByText(mockUser.name)).toBeInTheDocument();
    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'Test@123',
    });
    expect(authService.getCurrentUser).toHaveBeenCalledTimes(2);
  });

  it('deve fazer logout e remover a sessão do usuário', async () => {
    const user = userEvent.setup();
    vi.mocked(authService.getCurrentUser).mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await screen.findByText('carregado');

    expect(await screen.findByText(mockUser.name)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Sair' }));

    expect(await screen.findByText('Usuário não encontrado')).toBeInTheDocument();
    expect(authService.logout).toHaveBeenCalledTimes(1);
  });
});
