export type SessionPayload = {
  userId: number;
  role: string;
  expiresAt: Date;
};

export type SessionProperties = {
  userId: number;
  role: string;
};

export type LoginFields = {
  email: string;
  password: string;
};

export type RegistrationFields = {
  name: string;
  email: string;
  password: string;
};

// Adding a session property to the request interface so that middleware can set this as a 'context'
declare global {
  namespace Express {
    interface Request {
      session?: SessionProperties;
    }
  }
}

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
