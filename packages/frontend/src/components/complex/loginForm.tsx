"use client";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Avatar,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import Link from "next/link";
import { LoginFormSchema, LoginFields } from "@/lib/definitions";
import { login } from "@/lib/redux/features/auth/authThunks";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const auth = useAppSelector((state) => state.auth);

  // Redirect user if they are logged in
  const router = useRouter();

  useEffect(() => {
    if (auth.userId) {
      if (auth.role === "admin") {
        router.push("/users");
      } else {
        router.push("/profile");
      }
    }
  }, [auth.userId]);

  const dispatch = useAppDispatch();
  const [form, setForm] = useState<LoginFields>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<LoginFields>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [event.target.id]: "",
    }));
  };

  const handleValidation = (form: LoginFields) => {
    const validatedFields = LoginFormSchema.safeParse({
      email: form.email,
      password: form.password,
    });
    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      let formErrors: { [key: string]: string } = {};
      for (const [k, v] of Object.entries(fieldErrors)) {
        if (v.length > 0) {
          formErrors[k] = v[0];
        }
      }
      setFormErrors((prev) => ({ ...prev, ...formErrors }));
      return false;
    }
    setFormErrors({
      email: "",
      password: "",
    });
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = handleValidation(form);
    if (valid) {
      dispatch(login(form));
    }
  };
  return (
    <Card
      elevation={3}
      sx={{
        minWidth: 300,
        display: "flex",
        flexDirection: "column",
        margin: "auto",
      }}
    >
      <Stack direction="column" sx={{ padding: "16px 16px 10px 16px" }}>
        <Avatar sx={{ alignSelf: "center", bgcolor: "#ff5100" }}>
          <LockOutlined />
        </Avatar>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            alignSelf: "center",
          }}
        >
          Login
        </Typography>
      </Stack>

      <CardContent>
        <Stack direction="column" sx={{ gap: 3 }}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            value={form.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <TextField
            type="password"
            id="password"
            label="Password"
            variant="outlined"
            size="small"
            fullWidth
            value={form.password}
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
          />
          {auth.message && (
            <Typography sx={{ color: "error.main" }}>
              Error: {auth.message}
            </Typography>
          )}
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{ height: 37 }}
          >
            {auth.status === "loading" ? (
              <CircularProgress color="inherit" size={21} />
            ) : (
              "SIGN IN"
            )}
          </Button>
          <Link href="/register" style={{ textDecoration: "unset" }}>
            <Typography sx={{ color: "#0765af", fontSize: 14 }}>
              Don&apos;t have an account? Register here
            </Typography>
          </Link>
        </Stack>
      </CardContent>
    </Card>
  );
}
