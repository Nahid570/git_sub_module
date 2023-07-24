import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  organization: {},
};

export const orgSlice = createSlice({
  name: "orgSlice",
  initialState,
  reducers: {
    organizationList: (state, action) => {
      state.orgList = action.payload;
    },
    activeOrganization: (state, action) => {
      state.organization = action.payload;
    },
    inactiveOrganization: (state) => {
      delete state.organization;
    },
  },
});

// Action creators are generated for each case reducer function
export const { organizationList, activeOrganization, inactiveOrganization } = orgSlice.actions;
export default orgSlice.reducer;
