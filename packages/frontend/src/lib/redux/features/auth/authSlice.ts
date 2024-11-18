/* import type { PayloadAction } from "@reduxjs/toolkit"; */
import { login, register, logout, verify } from "./authThunks";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthSliceState {
  userId: number | undefined;
  role: string | undefined;
  status: "idle" | "loading" | "failed";
  message: string | undefined;
}

const initialState: AuthSliceState = {
  userId: undefined,
  role: undefined,
  status: "idle",
  message: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // login thunk
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "idle";
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.message = undefined;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload as string;
    });
    // registration thunk
    builder.addCase(register.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = "idle";
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.message = undefined;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload as string;
    });
    // logout thunk
    builder.addCase(logout.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.status = "idle";
      state.userId = undefined;
      state.role = undefined;
      state.message = undefined;
    });
    builder.addCase(logout.rejected, (state) => {
      state.status = "failed";
      state.userId = undefined;
      state.role = undefined;
      state.message = undefined;
    });
    // verify thunk
    builder.addCase(verify.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(verify.fulfilled, (state, action) => {
      state.status = "idle";
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.message = undefined;
    });
    builder.addCase(verify.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload as string;
    });
  },
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  /* selectors: {
    selectCount: (counter) => counter.value,
    selectStatus: (counter) => counter.status,
  }, */
});

// Action creators are generated for each case reducer function.
export const {
  /* login  */
} = authSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
/* export const { selectCount, selectStatus } = counterSlice.selectors; */
export default authSlice.reducer;
