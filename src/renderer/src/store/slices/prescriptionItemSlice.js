import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prescriptionItems: {},
};

export const prescriptionItemSlice = createSlice({
  name: "prescriptionItemSlice",
  initialState,
  reducers: {
    prescriptionItem: (state, action) => {
      state.prescriptionItems = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { prescriptionItem } = prescriptionItemSlice.actions;
export default prescriptionItemSlice.reducer;
