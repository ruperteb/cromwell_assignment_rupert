import { Container, Typography, Stack } from "@mui/material";

export default function About() {
  return (
    <Container component="main" sx={{ flex: 1, display: "flex" }} maxWidth="sm">
      <Stack direction="column" sx={{ gap: 4 , marginTop: 10}}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "#1c355e", fontWeight: 700 }}
        >
          About
        </Typography>
        <Typography sx={{ textAlign: "center", color: "#1c355e" }}>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Proin pretium
          neque nisi odio id finibus integer. At elementum laoreet morbi arcu;
          facilisi mus! Fames tincidunt venenatis pellentesque orci nam sem
          placerat lacus sociosqu. Curae ipsum id nunc platea, dignissim
          dapibus. Consectetur sagittis nisl enim neque urna egestas. Accumsan
          erat velit porttitor scelerisque mi. Enim risus himenaeos augue mi in
          in mauris. Ex odio pretium ad; natoque placerat metus finibus vehicula
          in. Ultrices maximus risus malesuada mauris condimentum, montes
          nascetur ex?
        </Typography>
        <Typography sx={{ textAlign: "center", color: "#1c355e" }}>
          Turpis primis lacinia aptent netus sapien. Dui ligula metus pulvinar
          sollicitudin suscipit, placerat integer. Senectus volutpat aptent
          sodales taciti purus. Massa porttitor nulla lobortis in magna eleifend
          tempus? Lectus lacinia tortor mollis amet sodales sagittis cubilia
          tincidunt porta. Orci eleifend vestibulum pharetra maecenas proin dis.
          Erat curabitur torquent nec montes neque, maecenas morbi suspendisse.
          Ac ex imperdiet sagittis rhoncus ac. Mauris felis vivamus inceptos
          curabitur ultrices curae.
        </Typography>
      </Stack>
    </Container>
  );
}
