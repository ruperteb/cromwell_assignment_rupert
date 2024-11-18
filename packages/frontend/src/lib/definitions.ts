export type LoginFields = {
  email: string;
  password: string;
};

export type RegistrationFields = {
  name: string;
  email: string;
  password: string;
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
