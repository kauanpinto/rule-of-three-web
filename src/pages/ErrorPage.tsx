import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

export function ErrorPage() {
  const error = useRouteError();

  let message = 'Ocorreu um erro inesperado.';

  if (isRouteErrorResponse(error)) {
    message = `${error.status} — ${error.statusText || 'Erro na rota'}`;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-2">
      <h1 className="text-center text-lg">Algo deu errado</h1>
      <p className="text-center">{message}</p>
      <Link className="text-muted-foreground text-sm hover:underline" to="/">
        Voltar para o início
      </Link>
    </main>
  );
}
