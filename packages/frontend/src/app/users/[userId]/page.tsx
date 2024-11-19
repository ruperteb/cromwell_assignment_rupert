import { Container } from "@mui/material";
import UserProfile from "@/components/complex/userProfile";

export default async function AdminUserProfile({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  return (
    <Container component="main" sx={{ flex: 1, display: "flex" }}>
      <UserProfile userId={Number(userId)} />
    </Container>
  );
}
