import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserResponse, UserUpdateFields } from "@/lib/definitions";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/users/`,
    credentials: "include",
  }),
  tagTypes: ["OwnUser", "User", "Users"],
  endpoints: (builder) => ({
    getOwnUser: builder.query<UserResponse, void>({
      query: () => `me`,
      // Required, as the backend error responses are not objects
      transformErrorResponse: ({ data }) => {
        return data;
      },
      providesTags: ["OwnUser"],
    }),
    updateOwnUser: builder.mutation<UserResponse, UserUpdateFields>({
      query: (patch) => ({
        url: `me`,
        method: "PATCH",
        body: patch,
      }),
      transformErrorResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: ["OwnUser", "Users"],
    }),
    deleteOwnUser: builder.mutation({
      query: () => ({
        url: `me`,
        method: "DELETE",
      }),
      transformErrorResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: ["Users"],
    }),
    getUser: builder.query<UserResponse, number>({
      query: (userId) => String(userId),
      transformErrorResponse: ({ data }) => {
        return data;
      },
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<
      UserResponse,
      { patch: UserUpdateFields; userId: number }
    >({
      query: ({ patch, userId }) => ({
        url: `${userId}`,
        method: "PATCH",
        body: patch,
      }),
      transformErrorResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: ["User", "Users"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${userId}`,
        method: "DELETE",
      }),
      transformErrorResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: ["Users"],
    }),
    getUsers: builder.query<UserResponse[], void>({
      query: () => "",
      transformErrorResponse: ({ data }) => {
        return data;
      },
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useGetOwnUserQuery,
  useUpdateOwnUserMutation,
  useDeleteOwnUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} = usersApi;
