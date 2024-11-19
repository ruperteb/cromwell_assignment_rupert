import { Container } from "@mui/material";
import UsersList from "@/components/complex/usersList";

export default function Users() {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ flex: 1, display: "flex", justifyContent: "center" }}
    >
      <UsersList />
    </Container>
  );
}
