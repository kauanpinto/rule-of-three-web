import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input, PasswordInput } from './Input';

describe('Input', () => {
  it('associa a label ao campo mesmo sem id', () => {
    render(<Input label="Nome" />);

    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
  });

  it('expõe o erro de forma acessível', () => {
    render(<Input label="E-mail" error="E-mail inválido" />);

    const input = screen.getByLabelText('E-mail');

    expect(screen.getByRole('alert')).toHaveTextContent('E-mail inválido');
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription('E-mail inválido');
  });

  it('encaminha o ref para o input (o react-hook-form depende disso)', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input label="Nome" ref={ref} />);

    expect(ref.current).toBe(screen.getByLabelText('Nome'));
  });
});

describe('PasswordInput', () => {
  it('alterna a visibilidade sem enviar o formulário', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e: React.SubmitEvent) => e.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <PasswordInput label="Senha" />
      </form>,
    );

    const input = screen.getByLabelText('Senha');
    expect(input).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: 'Mostrar senha' }));
    expect(input).toHaveAttribute('type', 'text');

    await user.click(screen.getByRole('button', { name: 'Ocultar senha' }));
    expect(input).toHaveAttribute('type', 'password');
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
