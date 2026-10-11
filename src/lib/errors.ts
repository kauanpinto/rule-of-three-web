import { isAxiosError } from 'axios';

export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (!error.response) return 'Sem conexão com o servidor. Tente novamente.';

    return error.response.data?.message ?? 'Ocorreu um erro inesperado.';
  }

  return 'Ocorreu um erro inesperado.';
}
