import { z } from 'zod';

const restrictedNames = ['admin', 'staff', 'moderator', 'support', 'system'];

const isRestrictedName = (name: string) => {
  const lowerName = name.toLowerCase();
  return restrictedNames.some((restricted) => lowerName.includes(restricted));
};

export const registerSchema = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(3)
    .max(50)
    .refine((val) => !isRestrictedName(val), {
      message: 'Username contains restricted words',
    }),
  displayName: z
    .string()
    .min(3)
    .max(50)
    .optional()
    .refine((val) => !val || !isRestrictedName(val), {
      message: 'Display name contains restricted words',
    }),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
