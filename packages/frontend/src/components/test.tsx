"use client";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";

import { useEffect } from "react";
/* import { login } from "@/lib/redux/features/auth/authSlice"; */
/* import { useTheme } from "@mui/material";
import { usePathname } from "next/navigation"; */

import {
  login,
  register,
  logout,
  verify,
} from "@/lib/redux/features/auth/authThunks";
import {
  /* useGetOwnUserQuery, */ /* useGetUserQuery, */ useGetUsersQuery,
  useUpdateOwnUserMutation,
} from "@/lib/redux/features/users/usersApi";

const Test = () => {
  const auth = useAppSelector((state) => state.auth);
  console.log(auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verify());
  }, [dispatch]);

  const { data, error, isLoading, refetch } = useGetUsersQuery();

  const [updateProfile, result] = useUpdateOwnUserMutation();

  console.log(data, error, isLoading);
  console.log(result);

  /*   useEffect(() => {
    dispatch(login({ email: "jdoe@cromwell.com", password: "admin" }));
  }, [dispatch]); */

  const handleLogin = () => {
    dispatch(login({ email: "jdoe@cromwell.com", password: "admin" }));
  };

  const handleRegister = () => {
    dispatch(
      register({ name: "Bob", email: "bob@cromwell.com", password: "admin" })
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  /*  const theme = useTheme();
  console.log(theme); */

  /* const pathname = usePathname();
  console.log(pathname); */

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={refetch}>Refetch</button>
      <button onClick={() => updateProfile({ name: "Test1234567" })}>
        Update
      </button>
      {data?.map((user) => (
        <span key={user.userId}>{user.name}</span>
      ))}
    </div>
  );
};

export default Test;
