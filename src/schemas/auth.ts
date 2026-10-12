import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter no mínimo 8 caracteres')
  .refine((password) => /[A-Z]/.test(password), 'A senha deve conter uma letra maiúscula')
  .refine((password) => /[a-z]/.test(password), 'A senha deve conter uma letra minúscula')
  .refine((password) => /[0-9]/.test(password), 'A senha deve conter um número')
  .refine((password) => /[!@#$%^&*]/.test(password), 'A senha deve conter um caractere especial');

const emailSchema = z.string().trim().toLowerCase().pipe(z.email('E-mail inválido'));

const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Nome muito curto'),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().trim().min(1, 'Confirmar senha é obrigatório'),
    income: z.number({ error: 'Informe sua renda' }).positive('Renda deve ser maior que zero'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export const authSchema = {
  registerSchema,
  loginSchema,
};
