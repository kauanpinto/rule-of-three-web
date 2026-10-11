import { useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type InputProps = React.ComponentProps<'input'> & {
  label?: string;
  error?: string;
  rightElement?: React.ReactNode;
};

export function Input({ label, error, id, rightElement, className, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <input
          {...props}
          id={inputId}
          aria-invalid={error ? true : props['aria-invalid']}
          aria-describedby={error ? `${inputId}-error` : props['aria-describedby']}
          className={`peer border-border focus:ring-ring focus:border-accent w-full rounded-lg border-2 px-4 py-3 text-sm outline-none focus:border focus:outline-none ${
            rightElement ? 'pr-12' : ''
          } ${className ?? ''}`}
        />

        {label && (
          <label
            htmlFor={inputId}
            className="text-muted-foreground bg-background peer-focus:text-foreground pointer-events-none absolute top-0 left-2 -translate-y-1/2 rounded-lg px-1 text-xs"
          >
            {label}
          </label>
        )}

        {rightElement}
      </div>

      {error && (
        <span id={`${inputId}-error`} role="alert" className="text-destructive text-xs">
          {error}
        </span>
      )}
    </div>
  );
}

type PasswordInputProps = Omit<InputProps, 'type' | 'rightElement'>;

export function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      type={showPassword ? 'text' : 'password'}
      autoComplete={props.autoComplete ?? 'current-password'}
      rightElement={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          className="text-muted-foreground absolute top-1/2 right-4 -translate-y-1/2"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
}
