import { describe, expect, it } from 'vitest';
import { authSchema } from './auth';

const validRegister = {
  name: 'Test',
  email: 'test@test.com',
  password: 'Test@123',
  confirmPassword: 'Test@123',
  income: 2500,
};

describe('authSchema', () => {
  it('normaliza o e-mail (trim e minúsculas)', () => {
    const result = authSchema.loginSchema.parse({
      email: '  TEST@TEST.COM  ',
      password: 'Test@123',
    });

    expect(result.email).toBe('test@test.com');
  });

  it('cadastro: aponta o erro no campo confirmPassword quando as senhas diferem', () => {
    const result = authSchema.registerSchema.safeParse({
      ...validRegister,
      confirmPassword: '@Test123',
    });

    expect(result.error?.issues).toContainEqual(
      expect.objectContaining({
        path: ['confirmPassword'],
        message: 'As senhas não coincidem',
      }),
    );
  });

  it('cadastro: renda vazia (NaN) mostra a mensagem própria', () => {
    const result = authSchema.registerSchema.safeParse({
      ...validRegister,
      income: Number.NaN,
    });

    expect(result.error?.issues).toContainEqual(
      expect.objectContaining({ path: ['income'], message: 'Informe sua renda' }),
    );
  });

  it('cadastro: aceita dados válidos', () => {
    expect(authSchema.registerSchema.safeParse(validRegister).success).toBe(true);
  });
});
