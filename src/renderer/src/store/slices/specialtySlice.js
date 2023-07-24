import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  specialties: [],
};

export const specialtySlice = createSlice({
  name: "specialtySlice",
  initialState,
  reducers: {
    specialtyList: (state, action) => {
      state.specialties = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { specialtyList } = specialtySlice.actions;
export default specialtySlice.reducer;
