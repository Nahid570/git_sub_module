import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.data = action.payload;
    },
    loginFailed: (state) => {
      state.data = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, loginFailed } = authSlice.actions;
export default authSlice.reducer;
