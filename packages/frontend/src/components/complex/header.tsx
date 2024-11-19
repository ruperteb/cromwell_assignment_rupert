"use server";
import { Container, Stack, Typography, AppBar, Box } from "@mui/material";
import Image from "next/image";
import Navbar from "./navbar";
import cromwellLogo from "../../../public/cromwell-logo.svg";
import cromwellLogoC from "../../../public/cromwell-logo-c.svg";

const Header = () => {
  return (
    <AppBar
      component="header"
      sx={{ background: "#f2f2f2" }}
      position="relative"
    >
      <Container maxWidth={"xl"}>
        <Stack
          direction="row"
          sx={{ padding: 2, justifyContent: "space-between" }}
        >
          <Box sx={{ display: { md: "flex", xs: "none" }, minWidth: "100px" }}>
            <Image
              src={cromwellLogo}
              alt="Cromwell logo"
              width={188}
              height={50}
            />
          </Box>
          <Box sx={{ display: { md: "none", xs: "flex" }, minWidth: "50px" }}>
            <Image
              src={cromwellLogoC}
              alt="Cromwell logo"
              width={50}
              height={50}
            />
          </Box>
          <Typography
            variant="h4"
            sx={{
              alignSelf: "center",
              fontWeight: "700",
              letterSpacing: 2,
              color: "#1c355e",
              fontSize: { xs: "1.4rem", lg: "2.0243rem" },
              textAlign: "center",
            }}
          >
            Profile Management
          </Typography>
          <Navbar />
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
