import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginFields,
  RegistrationFields,
  LoginRegistrationResponse,
  VerifyResponse,
} from "@/lib/definitions";

export const login = createAsyncThunk(
  "auth/login",
  async (input: LoginFields, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: input.email,
            password: input.password,
          }),
        }
      );
      if (!response.ok) {
        return rejectWithValue(await response.text());
      }
      const data: LoginRegistrationResponse = await response.json();

      return data;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (input: RegistrationFields, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: input.name,
            email: input.email,
            password: input.password,
          }),
        }
      );
      if (!response.ok) {
        return rejectWithValue(await response.text());
      }
      const data: LoginRegistrationResponse = await response.json();

      return data;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  // session cookie will be removed by middleware if not valid 
  try {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
      credentials: "include",
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(e);
    }
  }
});

export const verify = createAsyncThunk(
  "auth/verify",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        return rejectWithValue(await response.text());
      }
      const data: VerifyResponse = await response.json();

      return data;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);
