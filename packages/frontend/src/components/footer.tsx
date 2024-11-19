"use server"
import { Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Stack
      sx={{ background: "#000038", height: "75px", justifyContent: "center" }}
    >
      <Typography sx={{ color: "#f2f2f2", alignSelf: "center" }}>
        © 2024 - Profile Management Application
      </Typography>
    </Stack>
  );
};

export default Footer;
