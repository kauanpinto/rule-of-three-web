import { describe, expect, it } from 'vitest';
import { getErrorMessage } from './errors';

describe('getErrorMessage', () => {
  it('deve retornar mensagem quando não há resposta da API', () => {
    const error = {
      isAxiosError: true,
      response: undefined,
    };

    expect(getErrorMessage(error)).toBe('Sem conexão com o servidor. Tente novamente.');
  });

  it('deve retornar data.message quando a API responde com uma mensagem', () => {
    const error = {
      isAxiosError: true,
      response: {
        data: {
          message: 'Credenciais inválidas',
        },
      },
    };

    expect(getErrorMessage(error)).toBe('Credenciais inválidas');
  });

  it('deve retornar a mensagem padrão quando não há mensagem da API', () => {
    const error = {
      isAxiosError: true,
      response: {
        data: {},
      },
    };

    expect(getErrorMessage(error)).toBe('Ocorreu um erro inesperado.');
  });
});
