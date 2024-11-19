import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Must contain at least one letter." })
    .regex(/[0-9]/, { message: "Must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Must contain at least one special character.",
    })
    .trim(),
});

export const RegistrationFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Must contain at least one letter." })
    .regex(/[0-9]/, { message: "Must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Must contain at least one special character.",
    })
    .trim(),
});

export const UpdateFormSchema = z.object({
  position: z
    .string()
    .min(3, { message: "Must be at least 3 characters long" })
    .optional()
    .or(z.literal("")),
  mobile: z
    .string()
    .regex(/^\d+$/)
    .min(11, { message: "Enter a valid number" })
    .max(11, { message: "Enter a valid number" })
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .max(120, { message: "Can't be more than 120 characters long" })
    .optional()
    .or(z.literal("")),
});

export type LoginFields = {
  email: string;
  password: string;
};

export type RegistrationFields = {
  name: string;
  email: string;
  password: string;
};

export type RegistrationFormFields = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type LoginRegistrationResponse = {
  userId: number;
  role: string;
};

export type UserResponse = {
  userId: number;
  name: string;
  email: string;
  role: string;
  position: string | null;
  mobile: string | null;
  description: string | null;
};

export type UserUpdateFields = {
  name?: string;
  email?: string;
  role?: string;
  position?: string;
  mobile?: string;
  description?: string;
};

export type VerifyResponse = {
  isAuth: boolean;
  userId: number | undefined;
  role: string | undefined;
};
