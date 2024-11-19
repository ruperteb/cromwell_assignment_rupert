import Image from "next/image";
import {
  Stack,
  Container,
  Typography,
  Divider,
  Button,
  Card,
} from "@mui/material";
import Link from "next/link";
import cromwellOffice from "../../public/cromwell-office.jpg";

export default function Home() {
  return (
    <Container component="main" sx={{ flex: 1, display: "flex" }}>
      <Stack
        direction="row"
        sx={{
          gap: 3,
          marginTop: 15,
          flexWrap: "wrap",
          justifyContent: "center",
          height: "fit-content",
          width: "100%",
        }}
      >
        <Image
          src={cromwellOffice}
          alt="Office"
          priority
          style={{
            width: "50%",
            height: "fit-content",
            borderRadius: "2rem",
            minWidth: "300px",
            alignSelf: "center",
          }}
        />
        <Card
          sx={{
            width: "50%",
            borderRadius: "2rem",
            maxWidth: "400px",
            minWidth: "300px",
            paddingY: { md: 5, xs: 3 },
            paddingX: 3,
          }}
          elevation={3}
        >
          <Stack
            direction="column"
            sx={{
              /*  width: "50%", */
              gap: 2,
              /* maxWidth: "400px",
              minWidth: "300px",
              paddingTop: 5, */
            }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: "center", color: "#1c355e", fontWeight: 700 }}
            >
              Welcome to the Cromwell Profile Management Application!
            </Typography>
            <Stack
              direction="row"
              sx={{ gap: 2, alignSelf: "center", marginTop: 5 }}
            >
              <Typography
                sx={{
                  alignSelf: "center",
                  color: "#1c355e",
                  textAlign: "center",
                }}
              >
                Sign-in now to view your profile:
              </Typography>
              <Link href="/login" style={{ width: "100px" }}>
                <Button variant="contained" sx={{ width: 100 }}>
                  Login
                </Button>
              </Link>
            </Stack>

            <Divider sx={{ width: "60%", alignSelf: "center" }} flexItem>
              OR
            </Divider>
            <Stack direction="row" sx={{ gap: 2, alignSelf: "center" }}>
              <Typography
                sx={{
                  alignSelf: "center",
                  color: "#1c355e",
                  textAlign: "center",
                }}
              >
                Register to create a new profile:
              </Typography>
              <Link href="/register" style={{ width: "100px" }}>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ width: 100 }}
                >
                  Register
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
