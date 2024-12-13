import { createSlice } from "@reduxjs/toolkit";
import { SignUp } from "@/types/auth";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    signUpData: [] as SignUp,
  },
  reducers: {
    signUpData(state, action: { payload: SignUp }) {
      state.signUpData = action.payload;
    },
  },
});

export const { signUpData } = authSlice.actions;
