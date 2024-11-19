"use client";
import { Card, CardContent, Stack, Typography, Button } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Link from "next/link";
import { UserResponse } from "@/lib/definitions";
interface UserCardProps {
  userData: UserResponse;
}
const UserCard = ({ userData }: UserCardProps) => {
  return (
    <Card
      elevation={3}
      sx={{ height: "fit-content", width: "350px", minWidth: "350px" }}
    >
      <CardContent sx={{ paddingBottom: "16px !important" }}>
        <Stack direction="row" sx={{ width: "100%" }}>
          <Stack direction="column" sx={{ gap: 1, width: "100%" }}>
            <Stack direction="row" sx={{ gap: 2 }}>
              <PersonOutlineOutlinedIcon
                fontSize="large"
                sx={{ color: "#1c355e" }}
              />
              <Typography
                fontSize={18}
                sx={{ color: "#1c355e", alignSelf: "center" }}
              >
                {userData.name}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ gap: 2 }}>
              <EmailOutlinedIcon fontSize="large" sx={{ color: "#1c355e" }} />
              <Typography
                fontSize={18}
                sx={{ color: "#1c355e", alignSelf: "center" }}
              >
                {userData.email}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ gap: 2 }}>
              <AdminPanelSettingsOutlinedIcon
                fontSize="large"
                sx={{ color: "#1c355e" }}
              />
              <Typography
                fontSize={18}
                sx={{ color: "#1c355e", alignSelf: "center" }}
              >
                {userData.role}
              </Typography>
            </Stack>
            <Link
              href={`/users/${userData.userId}`}
              style={{ marginTop: "8px" }}
            >
              <Button
                variant="contained"
                fullWidth
                endIcon={<VisibilityOutlinedIcon fontSize="large" />}
              >
                VIEW
              </Button>
            </Link>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserCard;
