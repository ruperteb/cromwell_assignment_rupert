import { Container } from "@mui/material";

import RegistrationForm from "@/components/complex/registrationForm";

export default function Register() {
  return (
    <Container component="main" sx={{ flex: 1, display: "flex" }}>
      <RegistrationForm />
    </Container>
  );
}
