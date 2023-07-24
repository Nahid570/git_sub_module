import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prescriptionInfo: {
    header: {},
    footer: {},
    prescriptionItems: [],
    patientSettings: [],
    prescriptionSettings: []
  },
};

export const prescriptionSlice = createSlice({
  name: "prescriptionSlice",
  initialState,
  reducers: {
    prescriptionHeader: (state, action) => {
      state.prescriptionInfo.header = action.payload;
    },
    prescriptionFooter: (state, action) => {
      state.prescriptionInfo.footer = action.payload;
    },
    prescriptionItems: (state, action) => {
      state.prescriptionInfo.prescriptionItems = action.payload;
    },
    patientSettings: (state, action) => {
      state.prescriptionInfo.patientSettings = action.payload;
    },
    prescriptionSettings: (state, action) => {
      state.prescriptionInfo.prescriptionSettings = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { prescriptionHeader, prescriptionFooter, prescriptionItems, patientSettings, prescriptionSettings } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;
