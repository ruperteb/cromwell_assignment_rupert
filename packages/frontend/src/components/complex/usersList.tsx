"use client";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useGetUsersQuery } from "@/lib/redux/features/users/usersApi";
import UserCard from "../userCard";

const UsersList = () => {
  const { data } = useGetUsersQuery();

  return (
    <Stack direction="row" sx={{ marginY: 10 }}>
      <Grid
        container
        spacing={2}
        rowSpacing={{ xs: 2, md: 6 }}
        height="fit-content"
        justifyContent="center"
      >
        {data?.map((user) => (
          <Grid
            key={user.userId}
            size={{ xs: 12, md: 6 }}
            sx={{ width: "350px" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <UserCard userData={user} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default UsersList;
