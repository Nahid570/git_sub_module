import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prescriptionSettingInfo: {}
};

export const prescriptionSettingSlice = createSlice({
  name: "prescriptionSettingSlice",
  initialState,
  reducers: {
    prescriptionSetting: (state, action) => {
      console.log("in active action: ", action);
      state.prescriptionSettingInfo = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { prescriptionSetting } = prescriptionSettingSlice.actions;
export default prescriptionSettingSlice.reducer;
