import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientSetting: {},
};

export const patientSettingSlice = createSlice({
  name: "patientSettingSlice",
  initialState,
  reducers: {
    patientPrintSetting: (state, action) => {
      state.patientSetting = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { patientPrintSetting } = patientSettingSlice.actions;
export default patientSettingSlice.reducer;
