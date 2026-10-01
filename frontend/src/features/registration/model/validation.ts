import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must contain at least 2 characters'),
  email: z.email('Enter a valid email'),
  password: z.string().min(8, 'Password must contait at least 8 characters'),
  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  }
)