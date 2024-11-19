import { Container } from "@mui/material";

import LoginForm from "@/components/complex/loginForm";

export default function Login() {
  return (
    <Container component="main" sx={{ flex: 1, display: "flex" }}>
      <LoginForm />
    </Container>
  );
}
