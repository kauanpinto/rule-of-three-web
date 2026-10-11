import { LoaderCircle } from 'lucide-react';

type ButtonProps = React.ComponentProps<'button'> & {
  isLoading?: boolean;
};

export function Button({
  isLoading = false,
  disabled,
  type = 'button',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`bg-accent text-accent-foreground inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all enabled:hover:opacity-90 enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {isLoading && <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
