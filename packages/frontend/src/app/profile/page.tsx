import { Container } from "@mui/material";

import OwnUserProfile from "@/components/complex/ownUserProfile";

export default function OwnProfile() {
  return (
    <Container component="main" sx={{ flex: 1, display: "flex" }}>
      <OwnUserProfile />
    </Container>
  );
}
