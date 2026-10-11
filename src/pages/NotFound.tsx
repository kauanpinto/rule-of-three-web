import { Link } from 'react-router';

export function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3">
      <span className="text-center text-lg">404 - Página não encontrada</span>
      <Link className="text-muted-foreground text-center text-sm hover:underline" to="/">
        Voltar para o início
      </Link>
    </main>
  );
}
