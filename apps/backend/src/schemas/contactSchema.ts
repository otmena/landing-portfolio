import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Введите имя, минимум 2 символа.').max(80, 'Имя слишком длинное.'),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s()-]{7,24}$/, 'Введите корректный телефон.'),
  email: z.string().trim().email('Введите корректный email.').max(120, 'Email слишком длинный.'),
  comment: z
    .string()
    .trim()
    .min(10, 'Комментарий должен быть не короче 10 символов.')
    .max(2000, 'Комментарий слишком длинный.'),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export const formatZodErrors = (error: z.ZodError) =>
  error.issues.reduce<Record<string, string>>((acc, issue) => {
    const field = issue.path[0];

    if (typeof field === 'string') {
      acc[field] = issue.message;
    }

    return acc;
  }, {});
