import { useLocation } from 'react-router';

export function PagePlaceholder() {
  const location = useLocation();

  return (
    <main className="flex min-h-dvh items-center justify-center">
      <span className="text-center text-sm">
        Página em construção, rota atual: {location.pathname}
      </span>
    </main>
  );
}
